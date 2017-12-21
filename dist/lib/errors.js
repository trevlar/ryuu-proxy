"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DomoException = /** @class */ (function (_super) {
    __extends(DomoException, _super);
    function DomoException(err, url) {
        var _this = this;
        var message = '' +
            'Ensure the app has been published at least once (manifest.json should have an Id) ' +
            'and you\'re working with an active session by running: `domo login`';
        _this = _super.call(this, message) || this;
        _this.error = (err.body)
            ? (err.body.message)
            : (err.message);
        _this.name = 'DomoException';
        _this.proxy = message;
        _this.statusCode = err.statusCode;
        _this.url = url;
        return _this;
    }
    return DomoException;
}(Error));
exports.DomoException = DomoException;
//# sourceMappingURL=errors.js.map