# mezon-p2p-chat-sdk

SDK chat P2P cho mezon-js.

# Version SDK Example using to demo 
` pip install p2p-chat-sdk `
# Frontend (Client) use SDK

## 1: Import

``` 
import { LightClient, LightSocket, LightMessage } from 'p2p-chat-sdk';
```

## 2: Create LightClient:
```
const light_client = await LightClient.authenticate({ id_token, user_id, username, serverkey });
```
## 3.0 Sau phát login , object LightClient sẽ bị mất state bởi việc reload, tắt tab, chỉ có thể lưu raw data của nó, vậy cần 1 phương thức để tái tạo lại object lúc cần thực hiện chat.

```
const light_client =  LightClient.initClient({
  token: '',
  refresh_token: '',
  api_url: '',
  user_id: '',
  serverkey: ''
});
```

Input lấy từ localstorage mà ra.

## 3: Connect Socket:
```
  const light_socket = new LightSocket(light_client.getClient(), light_client.getSession());
  await light_socket.connect();
```
## 4: Listen Message:
```
light_socket.setChannelMessageHandler((msg: LightMessage) => {
console.log('New message:', msg);
});

```

## 5: Start DM

```
const channel = await light_client.createDM(peerId);
await light_socket.joinDMChannel(channel.channel_id);

```

## 6: Send Message:

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

