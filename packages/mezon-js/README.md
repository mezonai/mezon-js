Mezon JavaScript client
========================

> JavaScript client for Mezon server written in TypeScript. For browser and React Native projects.

[Mezon](https://github.com/mezon/mezon) is an open-source server designed to power modern games and apps. Features include user accounts, chat, social, matchmaker, realtime multiplayer, and much [more](https://mezon.vn).

This client implements the full API and socket options with the server. It's written in TypeScript with minimal dependencies to be compatible with all modern browsers and React Native.

Full documentation is online - https://mezon.vn/docs/javascript-client-guide

## Getting Started

You'll need to setup the server and database before you can connect with the client. The simplest way is to use Docker but have a look at the [server documentation](https://github.com/mezon/mezon#getting-started) for other options.

1. Install and run the servers. Follow these [instructions](https://mezon.vn/docs/install-docker-quickstart).

2. Import the client into your project. It's [available on NPM](https://www.npmjs.com/package/mezon-js) and can be also be added to a project with Bower or other package managers.

    ```shell
    npm install mezon-js
    ```

    You'll now see the code in the "node_modules" folder and package listed in your "package.json".

    Optionally, if you would like to use the Protocol Buffers wire format with your sockets, you can import the adapter found in this package:

    ```shell
    npm install mezon-js-protobuf
    ```

3. Use the connection credentials to build a client object.

    ```js
    import {Client} from "mezon-js";

    var useSSL = false; // Enable if server is run with an SSL certificate.
    var client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);
    ```

## Usage

The client object has many methods to execute various features in the server or open realtime socket connections with the server.

### Authenticate

There's a variety of ways to [authenticate](https://mezon.vn/docs/authentication) with the server. Authentication can create a user if they don't already exist with those credentials. It's also easy to authenticate with a social profile from Google Play Games, Facebook, Game Center, etc.

```js
var email = "super@heroes.com";
var password = "batsignal";
const session = await client.authenticateEmail(email, password);
console.info(session);
```

### Sessions

When authenticated the server responds with an auth token (JWT) which contains useful properties and gets deserialized into a `Session` object.

```js
console.info(session.token); // raw JWT token
console.info(session.refreshToken); // refresh token
console.info(session.userId);
console.info(session.username);
console.info("Session has expired?", session.isexpired(Date.now() / 1000));
const expiresat = session.expires_at;
console.warn("Session will expire at", new Date(expiresat * 1000).toISOString());
```

It is recommended to store the auth token from the session and check at startup if it has expired. If the token has expired you must reauthenticate. The expiry time of the token can be changed as a setting in the server.

```js
// Assume we've stored the auth token in browser Web Storage.
const authtoken = window.localStorage.getItem("nkauthtoken");
const refreshtoken = window.localStorage.getItem("nkrefreshtoken");

let session = mezonjs.Session.restore(authtoken, refreshtoken);

// Check whether a session is close to expiry.

const unixTimeInFuture = Date.now() + 8.64e+7; // one day from now

if (session.isexpired(unixTimeInFuture / 1000)) {
    try
    {
        session = await client.sessionRefresh(session);
    }
    catch (e)
    {
        console.info("Session can no longer be refreshed. Must reauthenticate!");
    }
}
```

### Requests

The client includes lots of builtin APIs for various features of the game server. These can be accessed with the methods which return Promise objects. It can also call custom logic as RPC functions on the server. These can also be executed with a socket object.

All requests are sent with a session object which authorizes the client.

```js
const account = await client.getAccount(session);
console.info(account.user.id);
console.info(account.user.username);
console.info(account.wallet);
```

### Socket

The client can create one or more sockets with the server. Each socket can have it's own event listeners registered for responses received from the server.

```js
const secure = false; // Enable if server is run with an SSL certificate
const trace = false;
const socket = client.createSocket(secure, trace);
socket.ondisconnect = (evt) => {
    console.info("Disconnected", evt);
};

const session = await socket.connect(session);
// Socket is open.
```

If you are using the optional protocol buffer adapter, pass the adapter to the Socket object during construction:

```js
import {WebSocketAdapterPb} from "mezon-js-protobuf"

const secure = false; // Enable if server is run with an SSL certificate
const trace = false;
const socket = client.createSocket(secure, trace, new WebSocketAdapterPb());
```

There's many messages for chat, realtime, status events, notifications, etc. which can be sent or received from the socket.

```js
socket.onchannelmessage = (message) => {
    console.info("Message received from channel", message.channel_id);
    console.info("Received message", message);
};


// 1 = channel, 2 = Direct Message, 3 = Group
const type : number = 1;
const roomname = "mychannel";
const persistence : boolean = false;
const hidden : boolean = false;

const channel = await socket.joinChat(type, roomname, persistence, hidden);

const message = { "hello": "world" };
socket.writeChatMessage(channel.channel.id, message);
```

## Handling errors

For any errors in client requests, we return the original error objects from the Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

In order to capture the Mezon server response associated with the error, when you wrap your client requests in a `try...catch` statement you can invoke `await error.json()` on the `error` object in the catch block:

```js
try {
    const account = await client.getAccount(session);
    console.info(account.user.id);
    console.info(account.user.username);
    console.info(account.wallet);
} catch (error) {
    console.info("Inner Mezon error", await error.json());
}
```

## Contribute

The development roadmap is managed as GitHub issues and pull requests are welcome. If you're interested in enhancing the code please open an issue to discuss the changes or drop in and discuss it in the [community forum](https://forum.mezon.vn).

### Source Builds

Ensure you are using Node v18>.

The codebase is multi-package monorepo written in TypeScript and can be built with [esbuild](https://github.com/evanw/esbuild). All dependencies are managed with NPM.

To build from source, first install all workspace dependencies from the repository root with `npm install`.

Then to build a specific workspace, pass the `--workspace` flag to your build command, for example:

```shell
npm run build --workspace=mezon-js
```

### Run Tests

To run tests you will need to run the server and database. Most tests are written as integration tests which execute against the server. A quick approach we use with our test workflow is to use the Docker compose file described in the [documentation](https://mezon.vn/docs/install-docker-quickstart).

Tests are run against each workspace bundle; if you have made source code changes, you should `npm run build --workspace=<workspace>` prior to running tests.

```shell
docker-compose -f ./docker-compose.yml up
npm run test --workspace=mezon-js-test
```

### Protocol Buffer Web Socket Adapter

To update the generated Typescript required for using the protocol buffer adapter, `cd` into
`packages/mezon-js-protobuf` and run the following:

```shell
npx protoc \
--plugin="./node_modules/.bin/protoc-gen-ts_proto" \
--proto_path=$GOPATH/src/github.com/mezon/mezon-common \
--ts_proto_out=. \
--ts_proto_opt=snakeToCamel=false \
--ts_proto_opt=esModuleInterop=true \
$GOPATH/src/github.com/mezon/mezon-common/rtapi/realtime.proto \
$GOPATH/src/github.com/mezon/mezon-common/api/api.proto
```
```shell
npx protoc --plugin="./node_modules/.bin/protoc-gen-ts_proto.cmd" --proto_path=../../../mezon-common --ts_proto_out=./ --ts_proto_opt=snakeToCamel=false --ts_proto_opt=esModuleInterop=true ../../../mezon-common/rtapi/realtime.proto ../../../mezon-common/api/api.proto
```

```shell
npx protoc --plugin="./node_modules/.bin/protoc-gen-ts_proto.cmd" --proto_path=../mezon-common --ts_proto_out=. --ts_proto_opt=snakeToCamel=false --ts_proto_opt=esModuleInterop=true ../mezon-common/rtapi/realtime.proto ../mezon-common/api/api.proto
```

### Release Process

To release onto NPM if you have access to the "@mezon" organization you can use NPM.

```shell
npm run build --workspace=<workspace> && npm publish --access=public --workspace=<workspace>
```

### Generate Docs

API docs are generated with typedoc and deployed to GitHub pages.

To run typedoc:

```
npm install && npm run docs
```

### License

This project is licensed under the [Apache-2 License](https://github.com/nccasia/mezon-js/blob/master/LICENSE).
