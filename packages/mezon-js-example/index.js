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

const { Client } = require('mezon-js');

var client = new Client(
  'defaultkey',
	'172.16.11.90',
  '7350',
	false
);

function alwaysFalse() {
  return false;
}

const session = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOiI4NDZlZTU0Mi0yODMxLTRlZGItOTc1My04OGI2MzY5ZjJiYjgiLCJ1aWQiOjE3NzU3MzAxNjk4Nzc2MzA5NzYsInVzbiI6Im5ndXllbnRyYW4iLCJleHAiOjE3Njc1MDIzNjZ9.JZdLE4Nv4A-Er8rK4Qiyj9SYQynwzghojVcI0LHnAoI",
  refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOiIyMmNiOTFkYy1iMWNiLTQyYTItODhmZi02YWRlNDBkYTEzNTgiLCJ1aWQiOjE3NzU3MzAxNjk4Nzc2MzA5NzYsInVzbiI6Im5ndXllbnRyYW4iLCJleHAiOjE3Njc0OTc5NzV9.s7GgCBHZz_QBUBUflG--0chMUvgwlOW0Wb0OMunZ4Dw",
  isexpired: alwaysFalse 
}

async function runTest1() {
  try {
    console.log("Attempting to refresh session...");
    
    const session2 = await client.sessionRefresh(session);
    
    console.log("Session refreshed successfully:");
    console.log(session2);
  } catch (error) {
    console.error("Failed to refresh session:", error.message);
  }
}

async function runTest2() {
  try {
    console.log("Attempting to get list loged device ...");
    devices = await client.listLogedDevice(session)
    console.log(devices)
  } catch (error) {
    console.error("Failed to get list device:", error.message);
  }
}

runTest1();
runTest2();
