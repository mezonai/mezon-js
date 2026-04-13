import native from '@mezon/js-native';

const pendingRequests = new Map<string, { resolve: Function; reject: Function }>();

const client = native.connect();

setInterval(() => {
    const data = client.poll();
    if (data) {
        try {
            const parsed = JSON.parse(data.toString());
            if (parsed.nonce && pendingRequests.has(parsed.nonce)) {
                const { resolve } = pendingRequests.get(parsed.nonce)!;
                
                // Create a standard Web Response object
                const response = new Response(data, {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
                
                resolve(response);
                pendingRequests.delete(parsed.nonce);
            }
        } catch (e) {
            console.error("TCP Frame Parse Error:", e);
        }
    }
}, 20);

export const abridgedTcpFetcher: any = (input: string, init?: any): Promise<Response> => {
    return new Promise((resolve, reject) => {
        const nonce = Math.random().toString(36).substring(7);
        const body = init?.body ? JSON.parse(init.body) : {};

        const payload = JSON.stringify({
            ...body,
            route: input,
            nonce: nonce
        });

        pendingRequests.set(nonce, { resolve, reject });

        // Send raw bytes via the C++ send() method
        client.send(Buffer.from(payload));

        setTimeout(() => {
            if (pendingRequests.has(nonce)) {
                pendingRequests.delete(nonce);
                reject(new Error(`Timeout: ${input}`));
            }
        }, 5000);
    });
};