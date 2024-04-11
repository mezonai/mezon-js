Mezon JavaScript Protobuf adapter
========================

> Websocket adapter adding protocol buffer support to the [mezon-js](https://www.npmjs.com/package/@mezon/mezon-js) client.

[Mezon](https://github.com/heroiclabs/mezon) is an open-source server designed to power modern games and apps. Features include user accounts, chat, social, matchmaker, realtime multiplayer, and much [more](https://mezon.vn).


## Getting Started

1. Import the adapter into your project:

    ```shell
    yarn add "@mezon/mezon-js-protobuf"
    ```

2. Pass the Protobuf adapter to build the socket object.

    ```js
    import {Client} from "@mezon/mezon-js";
    import {WebSocketAdapterPb} from "@mezon/mezon-js-protobuf"

    const useSSL = false; // Enable if server is run with an SSL certificate.
    const client = new Client("defaultkey", "127.0.0.1", 7350, useSSL);

    const trace = false;
    const socket = client.createSocket(useSSL, trace, new WebSocketAdapterPb());
    ```

3. Use the WebSocket:

    ```js
    socket.ondisconnect = (evt) => {
        console.info("Disconnected", evt);
    };

    const session = await socket.connect(session);
    // Socket is open.
    ```

### License

This project is licensed under the [Apache-2 License](https://github.com/nccasia/mezon-js/blob/master/LICENSE).
