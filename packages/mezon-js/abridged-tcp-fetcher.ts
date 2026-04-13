import native from 'js-native';

const pendingRequests = new Map<string, { resolve: Function; reject: Function }>();

// Initialize native connection
const client = native.connect();

// Immediate Abridged Handshake
client.send(Buffer.from([0xef]));

/**
 * The Polling Loop: Maps incoming TCP chunks back to Fetch Promises
 */
setInterval(() => {
    const data = client.poll(); // Returns Buffer or null
    if (!data) return;

    try {
        // We assume the server sends a JSON header or a wrapped frame 
        // that contains the 'nonce'. 
        // If your server sends raw Protobuf, the nonce must be in the custom 
        // TCP Abridged header you've designed.
        const responseString = data.toString();
        const parsed = JSON.parse(responseString);

        if (parsed.nonce && pendingRequests.has(parsed.nonce)) {
            const { resolve } = pendingRequests.get(parsed.nonce)!;
            
            // Convert the relevant part of 'data' to an ArrayBuffer 
            // for MezonApi's .arrayBuffer() call.
            // If the whole 'data' is the Protobuf payload:
            const response = new Response(data, {
                status: 200,
                headers: { 'Content-Type': 'application/x-protobuf' }
            });

            resolve(response);
            pendingRequests.delete(parsed.nonce);
        }
    } catch (e) {
        // If JSON parse fails, it might be a raw stream notification
        // Handle unsolicited push messages here
        console.log("Unsolicited Push or Fragmented Data:", data);
    }
}, 20); // 20ms for lower latency in Electron

/**
 * The Fetcher Strategy: Matches the W3C Fetch API signature
 */
export const abridgedTcpFetcher = (url: string, init?: any): Promise<Response> => {
    return new Promise((resolve, reject) => {
        const nonce = Math.random().toString(36).substring(7);
        
        // Prepare the payload. 
        // Note: url corresponds to 'urlPath' in MezonApi (e.g., /mezon.api.Mezon/ListChannels)
        const body = init?.body ? JSON.parse(init.body) : {};
        
        const requestPayload = JSON.stringify({
            ...body,
            route: url,
            nonce: nonce
        });

        // Set timeout
        const timeout = setTimeout(() => {
            if (pendingRequests.has(nonce)) {
                pendingRequests.delete(nonce);
                reject(new Error(`TCP Request Timeout: ${url}`));
            }
        }, 10000);

        pendingRequests.set(nonce, { 
            resolve: (res: Response) => {
                clearTimeout(timeout);
                resolve(res);
            }, 
            reject 
        });

        // Send to C++ native socket
        client.send(Buffer.from(requestPayload));
    });
};