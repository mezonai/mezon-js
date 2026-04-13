export interface NativeClient {
    send(data: Buffer | Uint8Array): void;
    poll(): Buffer | null;
    close(): void;
}

export function connect(host: string, port: number): NativeClient;

declare const native: {
    connect: typeof connect;
};

export default native;