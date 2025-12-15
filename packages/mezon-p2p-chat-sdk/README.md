# mezon-p2p-chat-sdk

SDK chat P2P cho mezon-js.

# Version Example use demo 
` pip install p2p-chat-sdk `

## 1: Import

``` 
import { P2PClient, P2PSocket, P2PMessage } from 'p2p-chat-sdk';
```

## 2: Create Session:
```
const client = await P2PClient.authenticate({ id_token: idToken, user_id: userId, username });
setSession(client.getSession())
```
## 3: Connect Socket:
```
  const socket = new P2PSocket(client.getClient(), client.getSession());
  await socket.connect();
```
## 4: Listen Message:
```
socket.setChannelMessageHandler((msg: P2PMessage) => {
console.log('New message:', msg);
});

```

## 5: Start DM

```
const channel = await client.createDM(peerId);
await socket.joinDMChannel(channel.channel_id);

```

## 6: Send Message:

```
await socket.sendDM(channelId, { t: inputMsg });
```
