const mezonNative = require('./build/Release/mezon_native.node');

class MezonClient {
    constructor() {
        this.onMessageCallback = null;
        this.instance = null;
        this.pollingInterval = null;

        // Initialize the connection
        this.instance = mezonNative.connect();

        // Start the polling loop (Consistent with Mobile)
        this.startPolling();
    }

    startPolling() {
        // Poll every 20ms for incoming data frames
        this.pollingInterval = setInterval(() => {
            if (!this.instance) return;

            const data = mezonNative.poll.call(this.instance);
            if (data) {
                this._handleIncoming(data);
            }
        }, 20);
    }

    /**
     * Sends raw bytes over the single TCP connection.
     * @param {Buffer|string} data - The data to send.
     */
    sendBytes(data) {
        if (!this.instance) {
            console.error("No native instance found.");
            return;
        }
        const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);

        // Raw TCP send - no streamId, no fin flag needed here
        mezonNative.send.call(this.instance, buffer);
    }

    /**
     * Sends a message. Since there is no streamId, we rely on the 
     * JSON payload to tell the server what this is.
     */
    async sendMessage(message) {
        this.sendBytes(JSON.stringify(message));
    }

    _handleIncoming(data) {
        try {
            this.onMessageCallback(data);
        } catch (e) {
            console.error("Failed to parse incoming TCP data:", e);
        }
    }

    async listChannelMessages(session, channelId, lastMsgId) {
        const payload = {
            route: "listChannelMessages",
            type: "request",
            session,
            channelId,
            lastMsgId
        };

        this.sendBytes(JSON.stringify(payload));
    }

    onChannelMessage(callback) {
        this.onMessageCallback = callback;
    }

    stop() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
        // Native cleanup happens via N-API finalizer (napi_wrap)
        this.instance = null;
    }
}

module.exports = MezonClient;