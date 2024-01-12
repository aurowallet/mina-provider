import { v4 as randomUUID } from "uuid";
import { getSiteIcon } from "./utils";
var Messenger = /** @class */ (function () {
    function Messenger(channel) {
        this.channel = channel;
        this.registeredMessage = {};
        this.initListener();
    }
    Messenger.prototype.initListener = function () {
        var _this = this;
        this.channel.on('messageFromWallet', function (_a) {
            var error = _a.error, result = _a.result, id = _a.id;
            if (!error)
                _this.registeredMessage[id].resolve(result);
            else
                _this.registeredMessage[id].reject(error);
            delete _this.registeredMessage[id];
        });
    };
    Messenger.prototype.send = function (action, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var id = randomUUID();
        this.channel.send('messageFromWeb', {
            action: action,
            payload: {
                params: params,
                id: id,
                site: {
                    origin: window.location.origin,
                    webIcon: getSiteIcon(window)
                }
            }
        });
        return new Promise(function (resolve, reject) {
            _this.registeredMessage[id] = {
                resolve: resolve,
                reject: reject
            };
        });
    };
    return Messenger;
}());
export default Messenger;
