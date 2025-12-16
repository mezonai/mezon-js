# mezon-p2p-chat-sdk

SDK chat P2P cho mezon-js.

# Version SDK Example using to demo 
` pip install p2p-chat-sdk `
# Frontend (Client) use SDK

## 1: Import

``` 
import { P2PClient, P2PSocket, P2PMessage } from 'p2p-chat-sdk';
```

## 2: Create P2PClient:
```
const p2p_client = await P2PClient.authenticate({ id_token: idToken, user_id: userId, username });
```
## 3: Connect Socket:
```
  const p2p_socket = new P2PSocket(p2p_client.getClient(), p2p_client.getSession());
  await p2p_socket.connect();
```
## 4: Listen Message:
```
p2p_socket.setChannelMessageHandler((msg: P2PMessage) => {
console.log('New message:', msg);
});

```

## 5: Start DM

```
const channel = await p2p_client.createDM(peerId);
await p2p_socket.joinDMChannel(channel.channel_id);

```

## 6: Send Message:

```
await p2p_socket.sendDM(channelId, { t: inputMsg });
```
<img width="767" height="775" alt="Screenshot 2025-12-15 132741" src="https://github.com/user-attachments/assets/3019ca86-de5f-49b7-a05a-3895c754029d" />

