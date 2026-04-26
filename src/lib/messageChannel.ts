import EventEmitter from 'eventemitter3';

const ALLOWED_CHANNEL_SOURCES: Record<string, string[]> = {
    webhook: ['mina-contentscript', 'AuroApp'],
    'mina-contentscript': ['webhook'],
    AuroApp: ['webhook']
};

export default class MessageChannel extends EventEmitter {
    _channelKey: string;
    _messageListener: (event: MessageEvent) => void;
    constructor(channelKey: string) {
        super();

        if(!channelKey)
            throw 'No channel scope provided';

        this._channelKey = channelKey;
        this._messageListener = this._handleMessage.bind(this);
        this._registerEventListener();
    }

    _registerEventListener() {
        window.addEventListener('message', this._messageListener);
    }

    _handleMessage({ source: eventSource, data: payload }: MessageEvent) {
        if(eventSource !== window && eventSource !== null)
            return;

        if(!payload || typeof payload !== 'object')
            return;

        const {
            isAuro = false,
            message,
            source: messageSource
        } = payload as {
            isAuro?: boolean;
            message?: {
                action?: string;
                data?: unknown;
            };
            source?: string;
        };

        if(!isAuro || !message || !messageSource)
            return;

        if(messageSource === this._channelKey)
            return;

        const allowedSources = ALLOWED_CHANNEL_SOURCES[this._channelKey];
        if(allowedSources && allowedSources.indexOf(messageSource) === -1)
            return;

        const {
            action,
            data
        } = message;

        if(typeof action !== 'string' || !action)
            return;

        this.emit(action, data);
    }

    destroy() {
        window.removeEventListener('message', this._messageListener);
        this.removeAllListeners();
    }

    send(action:string, data = {}) {
        if(!action)
            return { success: false, error: 'Function requires action {string} parameter' };

        window.postMessage({
            message: {
                action,
                data
            },
            source: this._channelKey,
            isAuro: true
        }, '*');
    }
}

