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

var client = new MezonClient(
  'tokenid',
  'host',
  'port',
  true,
  3000,
  'https://mmn-api.mezon',
  'https://zk-api.mezon'
);

/**
 * Enhanced token transfer function with all required steps
 */
async function transferTokensExample(senderId, receiverId, amount, note) {
  try {
    const keyPair = await client.getEphemeralKeyPair();

    const recipientAddress = await client.getAddress(receiverId);

    const nonce = await client.getCurrentNonce(senderId, 'pending');

    const session = client.sessionManager.getSession();

    const zkProofs = await client.getZkProofs({
      user_id: senderId,
      jwt: session.token,
      address: recipientAddress,
      ephemeral_public_key: keyPair.publicKey,
    });

    const tokenEvent = {
      sender_id: senderId,
      receiver_id: receiverId,
      amount: amount,
      note: note || 'Token transfer via SDK example',
      nonce: nonce,
      public_key: keyPair.publicKey,
      private_key: keyPair.privateKey,
      zk_proof: zkProofs.zkProof,
      zk_pub: zkProofs.zkPub,
      extra_attribute: JSON.stringify({
        timestamp: Date.now(),
        transaction_type: 'p2p_transfer',
        sdk_version: '1.0.0',
        example_app: true,
      }),
    };
    const result = await client.sendToken(tokenEvent);

    console.log('✅ Token transfer completed successfully!');

    return result;
  } catch (error) {
    console.error('❌ Token transfer failed:', error.message);
    throw error;
  }
}

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

    await transferTokensExample(
      'sender_user_id', // Replace with actual sender ID
      'receiver_user_id', // Replace with actual receiver ID
      '50000', // Amount in smallest unit
      'Payment for SDK example demo'
    );

    console.log('\n🎉 All examples completed successfully!');
  } catch (error) {
    console.error('💥 Main execution failed:', error.message);
    process.exit(1);
  }
}
