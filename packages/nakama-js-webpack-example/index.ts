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

import {Client} from "@heroiclabs/nakama-js";

var useSSL = false; // Enable if server is run with an SSL certificate.
var client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);

client.authenticateCustom("test_id").then(session => {
    console.log("authenticated.");
    var socket = client.createSocket(useSSL, false);

    socket.connect(session, true).then(session => {
        socket.joinChat("6e5e904c-b33d-4743-8829-3753fd50460b",
            "Room1",
            1,
            true,
            false
        ).then(response => {
          console.log(
            "You can now send message to channel id ",
            response
          );         
        });
        socket.writeChatMessage("00000000-0000-0000-0000-000000000000",
          "6e5e904c-b33d-4743-8829-3753fd50460b",
          { data: "Hello!" }
        ).then(response => {
          console.log("send message", response);
        });
    });
}).catch(e => {
    console.log("error authenticating.");
});
