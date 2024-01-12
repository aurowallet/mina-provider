import EventEmitter from 'eventemitter3';
export default class MessageChannel extends EventEmitter {
    _channelKey: string;
    constructor(channelKey: string);
    _registerEventListener(): void;
    send(action: string, data?: {}): {
        success: boolean;
        error: string;
    };
}
