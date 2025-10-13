# Mezon JavaScript Client

> JavaScript client for Mezon server written in TypeScript. For browser and React Native projects.

This client implements the full API for interacting with Mezon server. It's written in TypeScript with minimal dependencies to be compatible with all modern browsers and React Native.

Full documentation is online - https://mezon.ai/docs/javascript-client-guide

## Getting Started

You'll need access to an instance of the Mezon server before you can connect with the client.

1. Import the client into your project. It's [available on NPM](https://www.npmjs/package/mezon-sdk).

```shell
npm install mezon-sdk
```

You'll now see the code in the "node_modules" folder and package listed in your "package.json".

2. Use the connection credentials to build a client object.

```js
import { Client } from "mezon-sdk";
const client = new Client("apiKey");
```

## Usage

The client object has many method to execute various features in the server.

### Authenticate

To authenticate with the Mezon server you must provide an identifier for the user.

```js
const appId = "<AppId>";

client
  .authenticate(appId)
  .then((session) => {
    _session = session;
    console.info("Authenticated:", session);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Sessions

When authenticated the server responds with an auth token (JWT) which contains useful properties and gets deserialized into a `Session` object.

```js
console.info(session.token); // raw JWT token
console.info(session.refreshToken); // refresh token
console.info("Session has expired?", session.isexpired(Date.now() / 1000));
const expiresAt = session.expires_at;
console.warn(
  "Session will expire at:",
  new Date(expiresAt * 1000).toISOString()
);

### Requests

The client includes lots of builtin APIs for various features of the Mezon server. These can be accessed with the methods which return Promise objects.

Most requests are sent with a session object which authorizes the client.

```js
const flags = await client.getFlags(session);
console.info("Flags:", flags);
```

### Token Transfers

The mezon-sdk supports secure token transfers using the **Mezon Money Network (MMN)** with zero-knowledge proofs for enhanced privacy and security.

**Generate Ephemeral Key Pair**

```js
const keyPair = await client.getEphemeralKeyPair();
// Returns: { publicKey: string, privateKey: string }
```

**Get Recipient Wallet Address**

```js
const address = await client.getAddress(senderId);
// Returns: string (wallet address)
```

**Fetch Current Nonce**

```js
const nonce = await client.getCurrentNonce(senderId, "pending");
// Returns: number (transaction sequence)
```

**Generate Zero-Knowledge Proof**

```js
const session = client.login();
const zkProofs = await client.getZkProofs({
  user_id: senderId,
  jwt: session.token,
  address: address,
  ephemeral_public_key: keyPair.publicKey,
});
// Returns: { zkProof: string, zkPub: string }
```

**Execute Token Transfer**

```js
const sendTokenData: APISentTokenRequest = {
      sender_id: client.clientId,
      sender_name: BOT_NAME,
      receiver_id: receiver_id,
      amount: amount,
    }
const result = await client.sendToken(sendTokenData);
// Returns: { tx_hash: string, ok: boolean, error: string }
```

#### Setting Up the Client for Token Transfers

```js
import { MezonClient } from "mezon-sdk";

const client = new MezonClient({botId: BOT_ID, token: BOT_MEZON_TOKEN});

// Login to initialize session
await client.login();
```

## Contribute

The development roadmap is managed as GitHub issues and pull requests are welcome. If you're interested in enhancing the code please open an issue to discuss the changes or drop in and discuss it in the [community forum](https://forum.mezon.ai).

### Source Builds

Ensure you are using Node v18>.

The codebase is multi-package monorepo written in TypeScript and can be built with [esbuild](https://github.com/evanw/esbuild). All dependencies are managed with Yarn.

To build from source, install dependencies and build the `mezon-sdk` package:

```shell
npm install --workspace=mezon-sdk && npm run build --workspace=mezon-sdk
```

### Run Tests

To run tests you will need access to an instance of the Mezon server.

Tests are run against each workspace bundle; if you have made source code changes, you should `npm run build --workspace=<workspace>` prior to running tests.

```shell
npm run test --workspace=mezon-sdk-test
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

This project is licensed under the [Apache-2 License](https://github.com/mezon/mezon/blob/master/LICENSE).
