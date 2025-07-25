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
const results = [];

var client = new MezonClient("tokenid");
  client.login().then(async (e) => {
  console.log("authenticated.", e);

 
  const res = await client.sendToken({
    sender_id: "senderid",
    sender_name: "sendername",
    receiver_id: "receiverid",
    amount: 100000000,
    note: "chuyen tien"}
  );

}).catch(e => {
  console.log("error authenticating.", e);
});

