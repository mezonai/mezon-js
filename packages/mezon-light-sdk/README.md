# Mezon-Light-SDK

Lightweight SDK for mezon chat.

# Version SDK Example using to demo 
`npm install mezon-light-sdk`

# Frontend (Client) use SDK

## 1: Import

``` 
import { LightClient, LightSocket, ChannelMessage } from 'mezon-light-sdk';
```

## 2: Create LightClient:
```
const light_client = await LightClient.authenticate({ id_token, user_id, username, serverkey });
```

## 3: After login, the LightClient object loses its state due to page reloads or tab closures; only its raw data can be persisted, so a mechanism is required to reconstruct the object when chat functionality is needed.

```
const light_client =  LightClient.initClient({
  token: '',
  refresh_token: '',
  api_url: '',
  user_id: '',
  serverkey: ''
});
```
The input is retrieved from localStorage.

## 4. Before establishing the socket connection, always check whether the token has expired and refresh it if necessary.
```
const isExpired = await light_client.isSessionExpired()
if(isExpried) {
   await light_client.refreshSession()
}
```
After that, the raw data of object light_client is stored in localStorage.

## 5: Connect Socket:
```
  const light_socket = new LightSocket(light_client.getClient(), light_client.getSession());
  await light_socket.connect();
```

## 6: Listen Message:
```
light_socket.setChannelMessageHandler((msg: ChannelMessage) => {
console.log('New message:', msg);
});

```

## 7: Start DM

```
const channel = await light_client.createDM(peerId);
await light_socket.joinDMChannel(channel.channel_id);

```

## 8: Send Message:

```
await light_socket.sendDM(channelId, { t: inputMsg }, attachments);
```
```
"attachments": [
  {
    "filename": "image.png",
    "size": 42439,
    "url": "https://cdn.mezon.ai/1940048388468772864/2001579269796401152.png",
    "filetype": "image/png",
    "width": 716,
    "height": 522,
    "thumbnail": "L56kYZxcRKW9sxabokoho,WGW7oa"
  }
]
```
<img width="767" height="775" alt="Screenshot 2025-12-15 132741" src="https://github.com/user-attachments/assets/3019ca86-de5f-49b7-a05a-3895c754029d" />

