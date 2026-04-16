#define NAPI_CPP_EXCEPTIONS
#include <errno.h>
#include <node_api.h>
#include <cstdio>
#include <cstdlib>
#include <cstring>

#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")
#else
#include <arpa/inet.h>
#include <fcntl.h>
#include <netdb.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <unistd.h>
typedef int SOCKET;
#define INVALID_SOCKET -1
#define SOCKET_ERROR -1
#endif

typedef struct {
  napi_env env;
  SOCKET sock;
  bool connected;
} MezonInternalContext;

void set_nonblocking(int sock) {
#ifdef _WIN32
  unsigned long mode = 1;
  ioctlsocket(sock, FIONBIO, &mode);
#else
  int flags = fcntl(sock, F_GETFL, 0);
  fcntl(sock, F_SETFL, flags | O_NONBLOCK);
#endif
}


napi_value Send(napi_env env, napi_callback_info info) {
  napi_value jsthis;
  size_t argc = 1;
  napi_value args[1];
  napi_get_cb_info(env, info, &argc, args, &jsthis, nullptr);

  MezonInternalContext *ctx;

  napi_unwrap(env, jsthis, (void **)&ctx);

  void *data;
  size_t length;
  napi_get_buffer_info(env, args[0], &data, &length);

  int bytes_sent = send(ctx->sock, (const char *)data, (int)length, 0);

  napi_value result;
  napi_create_int32(env, bytes_sent, &result);
  return result;
}

napi_value Connect(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  if (argc < 2) {
    napi_throw_type_error(env, nullptr, "Expects (host, port)");
    return nullptr;
  }

  char host[256];
  size_t host_len;
  napi_get_value_string_utf8(env, args[0], host, sizeof(host), &host_len);

  int32_t port;
  napi_get_value_int32(env, args[1], &port);
  char port_str[16];
  snprintf(port_str, sizeof(port_str), "%d", port);

#ifdef _WIN32
  WSADATA wsa;
  if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
    napi_throw_error(env, nullptr, "WSAStartup failed");
    return nullptr;
  }
#endif

  // DNS Resolution Setup
  struct addrinfo hints, *res;
  memset(&hints, 0, sizeof(hints));
  hints.ai_family = AF_INET;  // IPv4
  hints.ai_socktype = SOCK_STREAM;

  if (getaddrinfo(host, port_str, &hints, &res) != 0) {
    napi_throw_error(env, nullptr, "DNS resolution failed for host");
    return nullptr;
  }

  MezonInternalContext *ctx = new MezonInternalContext();
  ctx->env = env;
  ctx->connected = false;
  ctx->sock = socket(res->ai_family, res->ai_socktype, res->ai_protocol);

  if (ctx->sock < 0) {
    freeaddrinfo(res);
    delete ctx;
    napi_throw_error(env, nullptr, "Failed to create socket");
    return nullptr;
  }

  set_nonblocking(ctx->sock);

  // Initial non-blocking connect
  connect(ctx->sock, res->ai_addr, res->ai_addrlen);

  freeaddrinfo(res);  // Clean up DNS results

  napi_value result;
  napi_create_object(env, &result);
  napi_wrap(
      env, result, ctx,
      [](napi_env env, void *data, void *hint) {
        MezonInternalContext *c = (MezonInternalContext *)data;
        if (c->sock >= 0) {
#ifdef _WIN32
          closesocket(c->sock);
#else
          close(c->sock);
#endif
        }
        delete c;
      },
      nullptr, nullptr);
  napi_value send_fn;
  napi_create_function(env, "send", NAPI_AUTO_LENGTH, Send, nullptr, &send_fn);

  napi_status status = napi_set_named_property(env, result, "send", send_fn);

  if (status != napi_ok) {
    napi_throw_error(env, nullptr, "Failed to attach send method");
  }

  return result;
}

// Consistent with Mobile nativePoll()
napi_value Poll(napi_env env, napi_callback_info info) {
  napi_value thisArg;
  napi_get_cb_info(env, info, nullptr, nullptr, &thisArg, nullptr);

  MezonInternalContext *ctx;
  napi_unwrap(env, thisArg, (void **)&ctx);

  if (ctx->sock == INVALID_SOCKET) {
    return nullptr;
  }

  char buffer[16384];  // Sufficient for MTProto/Abridged frames
  int nread = recv(ctx->sock, buffer, sizeof(buffer), 0);

  if (nread > 0) {
    // Data received: send the magic tag 0xef if this is the very first byte
    // Or process the Abridged frame
    napi_value result;
    napi_create_buffer_copy(env, nread, buffer, nullptr, &result);
    return result;
  } else if (nread == 0) {
    // Connection closed by server
    napi_throw_error(env, nullptr, "CONNECTION_CLOSED");
    return nullptr;
  } else {
#ifdef _WIN32
    int err = WSAGetLastError();
    if (err != WSAEWOULDBLOCK) { /* Handle actual error */
    }
#else
    if (errno != EAGAIN && errno != EWOULDBLOCK) { /* Handle actual error */
    }
#endif
  }

  // No data available right now
  return nullptr;
}

napi_value Init(napi_env env, napi_value exports) {
  napi_property_descriptor desc[] = {{"connect", nullptr, Connect, nullptr, nullptr, nullptr, napi_default, nullptr},
                                     {"poll", nullptr, Poll, nullptr, nullptr, nullptr, napi_default, nullptr},
                                     {"send", nullptr, Send, nullptr, nullptr, nullptr, napi_default, nullptr}};
  napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
  return exports;
}

NAPI_MODULE(mezon_native, Init)