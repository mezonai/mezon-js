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

const { MezonClient } = require("mezon-sdk");

var client = new MezonClient("736f556c6f764f685162756e53387651");

client.authenticate().then(async (e) => {
  console.log("authenticated.", e);
}).catch(e => {
  console.log("error authenticating.", e);
});

client.onMessage = (msg) => {
  const text = msg.content.t;
  if (text && text.toLowerCase().startsWith("*daily")) {
    const message = {"t":"✅ Daily saved."}
    const ref = {
      message_id: '',
      message_ref_id: msg.message_id,
      ref_type: 0,
      message_sender_id: msg.sender_id,
      message_sender_username: msg.username,
      mesages_sender_avatar: msg.avatar,
      message_sender_clan_nick: msg.clan_nick,
      message_sender_display_name: msg.display_name,
      content: JSON.stringify(msg.content),
      has_attachment: false
    }
    
    client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, message, undefined, undefined, Array(ref))
  }
}
