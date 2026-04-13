/**
 * Copyright 2021 The Mezon Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Client} from "mezon-js";
import {WebSocketAdapterPb} from "mezon-js-protobuf"

var useSSL = true; // Enable if server is run with an SSL certificate.
var clientgw = new Client("defaultkey", "dev-mezon.nccsoft.vn", "8088", useSSL);
var client = new Client("defaultkey", "dev-mezon.nccsoft.vn", "7305", useSSL);

clientgw.authenticateEmail("pocolomos@gmail.com", "C0nandoiner123$").then(async session => {
  //console.log(await client.listFriends(session));
  // await client.createMessage2Inbox(session, {
  //     channel_id: "2036294894909132800",
  //     clan_id: "1840654648084533248",
  //     content: '{}',
  //     message_id: "1840654648084533248",
  //     attachments: [{filename: "1", filetype: "type"}],
  //   })
  //console.log(await client.listChannelMessages(session, "1840654648084533248", "2033820240361558016"))
  //console.log(await client.addRolesChannelDesc(session, {channel_id:"2033852459587211264", role_ids:["2033789539817885696"]}))
  //console.log(await client.registFCMDeviceToken(session, "CJ5Pa7rnNzHb4ZY", "", "desktop"))
  //console.log(await client.listThreadDescs(session, "1970392095180984320", 100, 0, "1970392095105486848", "0", 1))
  //console.log(await client.listChannelDescs(session, 1000, 0, 1, "0", 2))
  //await client.markAsRead(session, {channel_id: "1775791967452532736", clan_id: "1775732550744936448"})
  
  //await client.listChannelMessages(session, "1775732550744936448", "1838507688770670592")
  //console.log(await client.sessionRefresh(session))
  const socket = client.createSocket(useSSL, "dev-mezon-sock.nccsoft.vn", "4433", true, new WebSocketAdapterPb());
  //const socket = client.createSocket(false, "172.16.11.90", "7349", true, new WebSocketAdapterPb());
  const session2 = await socket.connect(session, true, "desktop");
  console.log("session", session2);
  
  socket.onchannelmessage = function(event) {
    console.log("on channel message", event);
  }

  console.log(await socket.joinClanChat("1840654648084533248"));
  console.log('join chat', await socket.joinChat("1840654648084533248", "1840654648105504768", 1, false));  
  console.log('join chat', await socket.joinChat("1840654648084533248", "1840654719526113280", 1, false));
  
  await client.listChannelDescs(session, 1000, 0, 1, "1775732550744936448", 1)
  console.log("data socket", await socket.listDataSocket({api_name: "ListClanBadgeCount"}))
  console.log("data socket", await socket.listDataSocket(
    {
      api_name: "ListChannelBadgeCount", 
      list_channel_badge_count_req: {
        clan_id: "0",
      }
    }
  ));
  
  console.log("data socket", await socket.writeChatMessage("1840654648084533248", "1840654648105504768", 2, false, {t:'OK'}));
  console.log("data socket", await socket.writeChatMessage("1840654648084533248", "1840654719526113280", 2, false, {t:'OK'}));
  console.log("data socket", await socket.writeMessageTyping("1840654648084533248", "1840654719526113280", 2, false, "Nguyen Tran Nhan"));
  console.log("data socket", await socket.writeMessageReaction("123", "1840654648084533248", "1840654719526113280", 2, false,
    "12312331", "emojiid", "enoji string", 1, "Nguyen Tran Nhan", false));
  console.log("data socket", await socket.writeLastSeenMessage("1775732550744936448", "1775791967452532736", 2, "1775791967452532736", 0, 0));
  const resp = await socket.writeEphemeralMessage(["1780188277182042112"], "1775732550744936448", "1775820446206267392", 2, false, {'t': 'Hello from Mezon JS Webpack Example with Protobuf!'});
  console.log('resp', resp);
}).catch(e => {
  console.log("error authenticating.", e);
});
