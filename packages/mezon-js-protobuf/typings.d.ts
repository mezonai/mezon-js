declare module "js-native" {
  interface NativeClient {
    send(data: any): void;
    poll(): any;
    close(): void;
  }
  export function connect(host: string, port: number): NativeClient;
  const native: {
    connect: typeof connect;
  };
  export default native;
}
