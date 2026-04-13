import { Client } from "mezon-js";

// Configuration
const useSSL = true;
const serverKey = "defaultkey";


const clientgw = new Client(serverKey, "dev-mezon.nccsoft.vn", "8088", useSSL);
const client = new Client(serverKey, "dev-mezon.nccsoft.vn", "7305", useSSL);

async function startApp() {
    try {
        console.log("Starting authentication...");

        const session = await clientgw.authenticateEmail("pocolomos@gmail.com", "C0nandoiner123$");
        console.log("Authenticated! Session token:", session.token);

        // Instead of manual socket creation, we use the client's internal socket/transport
        client.onChannelMessage = (event) => {
            console.log("On channel message:", event);
        };

        // Passing 'true' for appearOnline and 'desktop' as the device type
        const session2 = await client.connectSocket(session, true, "desktop");
        console.log("Socket connected, session valid:", !!session2);

        console.log("Joining Clan Chat...", await client.joinClanChat("1840654648084533248"));
        
        await Promise.all([
            client.joinChat("1840654648084533248", "1840654648105504768", 1, false),
            client.joinChat("1840654648084533248", "1840654719526113280", 1, false)
        ]);
        console.log("Joined channels successfully.");

        const channelDescs = await client.listChannelDescs(session, 1000, 0, 1, "1775732550744936448", 1);
        console.log("Channel descriptions loaded.");

        const badgeCount = await client.listDataSocket({
            api_name: "ListChannelBadgeCount", 
            list_channel_badge_count_req: { clan_id: "0" }
        });
        console.log("Badge count:", badgeCount);

        await client.writeChatMessage("1840654648084533248", "1840654648105504768", 2, false, { t: 'OK' });
        
        await client.writeMessageTyping("1840654648084533248", "1840654719526113280", 2, false, "Nguyen Tran Nhan");
        
        const resp = await client.writeEphemeralMessage(
            ["1780188277182042112"], 
            "1775732550744936448", 
            "1775820446206267392", 
            2, 
            false, 
            { t: 'Hello from Unified Mezon JS!' }
        );
        console.log('Ephemeral message response:', resp);

    } catch (error) {
        console.error("Mezon Error:", error);
    }
}

startApp();