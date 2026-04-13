const MezonClient = require('./MezonClient');

console.log("1. Script started...");

const client = new MezonClient();

client.onChannelMessage((msg) => {
    console.log("TCP Message Received:", msg);
});

async function main() {
    console.log("2. Entering main function...");

    try {
        console.log("Sending protocol handshake (0xef)...");
        client.sendBytes(Buffer.from([0xef]));

        await new Promise(resolve => setTimeout(resolve, 500));

        console.log("Attempting to send application data...");

        const myData = JSON.stringify({
            route: "greet",
            type: "request",
            text: "Hello Server"
        });

        client.sendBytes(myData);

    } catch (err) {
        console.error("Error in main loop:", err);
    }
}

main();

setInterval(() => {
    console.log("Status: Client is polling...");
}, 10000);