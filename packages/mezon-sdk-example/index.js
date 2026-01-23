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

const { MezonClient } = require('mezon-sdk');

var client = new MezonClient({
  botId: '1840651530236071936',
  token: 'HM__BUSOUu6OIXbn',
  host: 'dev-mezon.nccsoft.vn',
  port: '8088',
  mmnApiUrl: 'https://dev-mmn.nccsoft.vn/mmn-api/',
  zkApiUrl: 'https://dev-mmn.nccsoft.vn/zk-api/',
})

/**
 * Enhanced token transfer function with all required steps
 */

/**
 * Setup event listeners
 */
function setupEventListeners() {
  console.log('👂 Setting up event listeners...');

  client.onTokenSend((event) => {
    console.log('💰 Token transfer event detected:', {
      type: 'transfer',
      from: event.sender_id,
      to: event.receiver_id,
      amount: `${parseFloat(event.amount).toLocaleString()}₫`,
      note: event.note,
      timestamp: new Date().toISOString(),
    });
  });

  console.log('✅ Event listeners configured');
}

/**
 * Main execution
 */
async function main() {
  try {
    await client.login();

    setupEventListeners();


    // await client.sendToken({
    //     receiver_id: 'receiver_id',
    //     amount: 1 
    //   }
    // );

    console.log('\n🎉 All examples completed successfully!');
  } catch (error) {
    console.error('💥 Main execution failed:', error.message);
    process.exit(1);
  }
}

main()