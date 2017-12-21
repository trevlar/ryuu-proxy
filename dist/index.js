"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transport_1 = require("./lib/Transport");
var Proxy = /** @class */ (function () {
    function Proxy(manifest) {
        var _this = this;
        this.express = function () { return function (req, res, next) {
            return _this.transport.build(req)
                .then(function (args) { return _this.transport.get(args).pipe(res); })
                .catch(function (err) {
                if (err.name === 'DomoException')
                    res.status(err.statusCode).json(err);
                else
                    next();
            });
        }; };
        this.stream = function (req) {
            return _this.transport.build(req)
                .then(_this.transport.get);
        };
        this.transport = new Transport_1.default(manifest);
    }
    return Proxy;
}());
exports.Proxy = Proxy;
//# sourceMappingURL=index.js.map