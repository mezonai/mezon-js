# mezon-p2p-chat-sdk

SDK chat P2P cho mezon-js.

# Version SDK Example using to demo 
` pip install p2p-chat-sdk `
# Frontend (Client) use SDK

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
<img width="767" height="775" alt="Screenshot 2025-12-15 132741" src="https://github.com/user-attachments/assets/3019ca86-de5f-49b7-a05a-3895c754029d" />

