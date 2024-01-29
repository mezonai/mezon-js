/**
 * Copyright 2021 The Nakama Authors
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

import {Client} from "@mezon/mezon-js";

var useSSL = false; // Enable if server is run with an SSL certificate.
var client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);

client.authenticateEmail("user1@ncc.asia", "Aa12345678").then(session => {
    console.log("authenticated.");
    var socket = client.createSocket(useSSL, false);

    socket.connect(session, true).then(session => {
        socket.joinChat("c35f5457-5ad5-46a4-a6c1-d1b97eb14d85",
            "Room1",
            1,
            true,
            false
        ).then(response => {
          console.log(
            "You can now send message to channel id ",
            response
          );
          socket.writeChatMessage("093b8667-1ce3-4982-9140-790dfebcf3c9",
            "c35f5457-5ad5-46a4-a6c1-d1b97eb14d85",
            { data: "Hello!" }
          ).then(response => {
            console.log("send message", response);
          });      
        });        
    });
}).catch(e => {
    console.log("error authenticating.");
});
