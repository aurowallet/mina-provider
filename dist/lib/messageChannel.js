var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import EventEmitter from 'eventemitter3';
var MessageChannel = /** @class */ (function (_super) {
    __extends(MessageChannel, _super);
    function MessageChannel(channelKey) {
        var _this = _super.call(this) || this;
        if (!channelKey)
            throw 'No channel scope provided';
        _this._channelKey = channelKey;
        _this._registerEventListener();
        return _this;
    }
    MessageChannel.prototype._registerEventListener = function () {
        var _this = this;
        window.addEventListener('message', function (_a) {
            var _b = _a.data, _c = _b.isAuro, isAuro = _c === void 0 ? false : _c, message = _b.message, source = _b.source;
            if (!isAuro || (!message && !source))
                return;
            if (source === _this._channelKey)
                return;
            var action = message.action, data = message.data;
            _this.emit(action, data);
        });
    };
    MessageChannel.prototype.send = function (action, data) {
        if (data === void 0) { data = {}; }
        if (!action)
            return { success: false, error: 'Function requires action {string} parameter' };
        window.postMessage({
            message: {
                action: action,
                data: data
            },
            source: this._channelKey,
            isAuro: true
        }, '*');
    };
    return MessageChannel;
}(EventEmitter));
export default MessageChannel;
