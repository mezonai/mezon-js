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

// Sets socket to non-blocking mode
void set_nonblocking(SOCKET sock) {
#ifdef _WIN32
  unsigned long mode = 1;
  ioctlsocket(sock, FIONBIO, &mode);
#else
  int flags = fcntl(sock, F_GETFL, 0);
  fcntl(sock, F_SETFL, flags | O_NONBLOCK);
#endif
}

napi_value Connect(napi_env env, napi_callback_info info) {
#ifdef _WIN32
  WSADATA wsa;
  WSAStartup(MAKEWORD(2, 2), &wsa);
#endif

  MezonInternalContext *ctx = new MezonInternalContext();
  ctx->env = env;
  ctx->connected = false;
  ctx->sock = socket(AF_INET, SOCK_STREAM, 0);

  struct sockaddr_in dest;
  memset(&dest, 0, sizeof(dest));
  dest.sin_family = AF_INET;
  dest.sin_port = htons(4433);
  inet_pton(AF_INET, "172.29.223.11", &dest.sin_addr);

  // Set non-blocking BEFORE connect to handle it consistently with mobile
  set_nonblocking(ctx->sock);

  int r = connect(ctx->sock, (struct sockaddr *)&dest, sizeof(dest));

  // In non-blocking mode, connect usually returns -1 with EINPROGRESS/WSAEWOULDBLOCK
  // The actual connection status will be checked in the first Poll() call.

  napi_value result;
  napi_create_object(env, &result);
  napi_wrap(
      env, result, ctx,
      [](napi_env env, void *data, void *hint) {
        MezonInternalContext *c = (MezonInternalContext *)data;
#ifdef _WIN32
        closesocket(c->sock);
#else
        close(c->sock);
#endif
        delete c;
      },
      nullptr, nullptr);

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

napi_value Send(napi_env env, napi_callback_info info) {
  size_t argc = 1;
  napi_value args[1];
  napi_value thisArg;
  napi_get_cb_info(env, info, &argc, args, &thisArg, nullptr);

  void *data;
  size_t len;
  napi_get_buffer_info(env, args[0], &data, &len);

  MezonInternalContext *ctx;
  napi_unwrap(env, thisArg, (void **)&ctx);

  // If we just connected, the first thing sent over Abridged TCP is 0xef
  // (This could also be moved to the Connect logic)

  send(ctx->sock, (const char *)data, (int)len, 0);
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