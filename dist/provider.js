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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import MessageChannel from "./lib/messageChannel";
import Messenger from "./messager";
import EventEmitter from "eventemitter3";
import { DAppActions } from "./constant";
var MinaProvider = /** @class */ (function (_super) {
    __extends(MinaProvider, _super);
    function MinaProvider() {
        var _this = _super.call(this) || this;
        _this.isAuro = true;
        _this.channel = new MessageChannel("webhook");
        _this.messenger = new Messenger(_this.channel);
        _this.initEvents();
        return _this;
    }
    MinaProvider.prototype.request = function (_a) {
        var method = _a.method, params = _a.params;
        return this.messenger.send(method, params);
    };
    MinaProvider.prototype.sendTransaction = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_sendTransaction,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.signMessage = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_signMessage, params: args })];
            });
        });
    };
    MinaProvider.prototype.verifyMessage = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_verifyMessage,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.requestAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_requestAccounts })];
            });
        });
    };
    MinaProvider.prototype.getAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_accounts })];
            });
        });
    };
    MinaProvider.prototype.requestNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_requestNetwork })];
            });
        });
    };
    MinaProvider.prototype.sendPayment = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_sendPayment, params: args })];
            });
        });
    };
    MinaProvider.prototype.sendStakeDelegation = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_sendStakeDelegation,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.signFields = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_signFields, params: args })];
            });
        });
    };
    MinaProvider.prototype.verifyFields = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_verifyFields,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.signJsonMessage = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_sign_JsonMessage,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.verifyJsonMessage = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_verify_JsonMessage,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.switchChain = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_switchChain, params: args })];
            });
        });
    };
    MinaProvider.prototype.addChain = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({ method: DAppActions.mina_addChain, params: args })];
            });
        });
    };
    MinaProvider.prototype.createNullifier = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_createNullifier,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.fetchAccount = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: DAppActions.mina_fetchAccount,
                        params: args,
                    })];
            });
        });
    };
    MinaProvider.prototype.initEvents = function () {
        this.channel.on("chainChanged", this.onChainChanged.bind(this));
        this.channel.on("networkChanged", this.onNetworkChanged.bind(this));
        this.channel.on("accountsChanged", this.emitAccountsChanged.bind(this));
    };
    MinaProvider.prototype.onChainChanged = function (chainInfo) {
        var _a;
        if (chainInfo.chainId !== ((_a = this.chainInfo) === null || _a === void 0 ? void 0 : _a.chainId)) {
            this.chainInfo = chainInfo;
            this.emit("chainChanged", chainInfo);
        }
    };
    MinaProvider.prototype.onNetworkChanged = function (network) {
        this.emit("networkChanged", network);
    };
    MinaProvider.prototype.emitAccountsChanged = function (accounts) {
        this.emit("accountsChanged", accounts);
    };
    return MinaProvider;
}(EventEmitter));
export default MinaProvider;
