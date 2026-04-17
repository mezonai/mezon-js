
global.window = global;
global.navigator = { userAgent: 'node' };

const { Client } = require("mezon-js");
const AbridgedTcpAdapter = require("mezon-js-protobuf/abridged_tcp_adapter").default;

// Now you can instantiate it
const adapter = new AbridgedTcpAdapter();

var useSSL = true; // Enable if server is run with an SSL certificate.
var client = new Client("defaultkey", "dev-mezon.nccsoft.vn", "8088", useSSL, adapter);

client.authenticateEmail("pocolomos@gmail.com", "xxxxxx").then(async session => {
  const session2 = await client.connect(session, true, true);
  console.log("session 2", session);
  client.onchannelmessage = function(event) {
    console.log("on channel message", event);
  }

  setTimeout(async () => {
    console.log("Socket State after 1s:"); 
    console.log(await client.joinClanChat(session, "2041858765849890816"));
    await client.writeChatMessage(session, "2041858765849890816", "2041858767636664320", 2, true, {t:"OK"}, [], [], [], false, false, "", 0);
    client.listChannelDescs(session, 1000, 0, 1, "2041858765849890816", 1).then(message => {
     console.log("response ", message);
    });
  }, 1000);
}).catch(e => {
  console.log("got error", e);
});