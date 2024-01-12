import MessageChannel from "./lib/messageChannel";
interface response {
    error: Error;
    result: unknown;
}
export default class Messenger {
    registeredMessage: {
        [key: string]: {
            resolve: (res: response) => void;
            reject: (res: response) => void;
        };
    };
    channel: MessageChannel;
    constructor(channel: MessageChannel);
    initListener(): void;
    send(action: string, params?: {}): Promise<{
        result: unknown;
        error: Error;
    }>;
}
export {};
