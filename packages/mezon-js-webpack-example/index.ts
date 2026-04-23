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

import { Client } from "mezon-js";

var useSSL = true; // Enable if server is run with an SSL certificate.
var client = new Client("defaultkey", "dev-mezon.nccsoft.vn", "8088", useSSL);

client
  .authenticateEmail("pocolomos@gmail.com", "xxxxxxxx")
  .then(async (session) => {
    console.log("session", session);

    const session2 = await client.connect(
      session.token || "",
      session.ws_url || "",
      true,
      true,
    );
    console.log("session 2", session2);

    client.onchannelmessage = function (event) {
      console.log("on channel message", event);
    };

    setTimeout(async () => {
      console.log("Socket State after 1s:");
      // client.listUserClansByUserId(session).then(message => {
      //  console.log("message activity", message);
      // });
      console.log(await client.joinClanChat(session, "2041858765849890816"));
      await client.writeChatMessage(
        session,
        "2041858765849890816",
        "2041858767636664320",
        2,
        true,
        { t: "OK" },
        [],
        [],
        [],
        false,
        false,
        "",
        0,
      );
      // client.listChannelDescs(session, 1000, 0, 1, "0", 1).then(message => {
      //  console.log("response ", message);
      // });
      // client.listChannelMessages(session, "2041858765849890816", "2041858767636664320").then(message => {
      //   console.log("muted", message);
      // });
    }, 1000);
  })
  .catch((e) => {
    console.log("got error", e);
  });
