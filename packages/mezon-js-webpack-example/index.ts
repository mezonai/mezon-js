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

import {Client, Session} from "mezon-js";
import {WebSocketAdapterPb} from "mezon-js-protobuf"

var useSSL = false; // Enable if server is run with an SSL certificate.
//var client = new Client("defaultkey", "dev-mezon.nccsoft.vn", "7305", useSSL);
var client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);

client.authenticateEmail("user1@ncc.asia", "Aa12345678").then(async session => {
  console.log("authenticated.", session);
  
  const socket = client.createSocket(false, true, new WebSocketAdapterPb());
  const session2 = await socket.connect(session, true);
  console.log("session", session2);

  socket.disconnect(true);  

  //const socket1 = client.createSocket(false, true, new WebSocketAdapterPb());
  const refreshsession  = await client.sessionRefresh(session);
  setTimeout(function() {
    console.log("World");
  }, 5000);
  const session3 = await socket.reconnect(refreshsession, true);
  
  console.log("session 3", session3);

}).catch(e => {
  console.log("error authenticating.");
});
