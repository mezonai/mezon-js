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
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('datatest.csv')
  .pipe(csv(['Email', 'Token']))
  .on('data', (data) => {
    const username = data.Email.split('@')[0]
    results.push({'username': username})
  })
  .on('end', () => {
    console.log(results);
  });

var client = new MezonClient("4b6e5665484a4e503757787231536569");
  client.authenticate().then(async (e) => {
  console.log("authenticated.", e);

  var interval = 1000;
  results.forEach(function (el, index) {
    setTimeout(async function () {
      console.log(el);

      const res = await client.sendToken({
        sender_id: "",
        sender_name: "KOMU",
        receiver_id: el.username,
        amount: 200000,
        note: "NCCPLUS ho tro thang 3"}
      );
      
    }, index * interval);
  });
}).catch(e => {
  console.log("error authenticating.", e);
});

