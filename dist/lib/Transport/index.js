"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("core-js/es6/promise");
var Domo = require("ryuu-client");
var request = require("request");
var utils_1 = require("../utils");
var errors_1 = require("../errors");
var Transport = /** @class */ (function () {
    function Transport(manifest) {
        this.get = function (options) { return request(options); };
        this.manifest = manifest;
        this.client = this.getLastLogin();
        this.domainPromise = this.getDomoDomain();
    }
    Transport.prototype.getManifest = function () {
        return this.manifest;
    };
    Transport.prototype.getDomoClient = function () {
        return this.client;
    };
    Transport.prototype.getDomainPromise = function () {
        return this.domainPromise;
    };
    Transport.prototype.getLastLogin = function () {
        var recentLogin = utils_1.getMostRecentLogin();
        return new Domo(recentLogin.instance, recentLogin.sid, recentLogin.devtoken);
    };
    Transport.prototype.getDomoDomain = function () {
        var _this = this;
        var uuid = Domo.createUUID();
        var j = request.jar();
        var auth = "SID=\"" + this.client.sid + "\"";
        var cookie = request.cookie(auth);
        j.setCookie(cookie, this.client.server);
        var options = {
            url: this.client.server + "/api/content/v1/mobile/environment",
            headers: this.client.getAuthHeader(),
        };
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error)
                    reject("https://" + uuid + ".domoapps." + _this.getEnv());
                resolve("https://" + uuid + "." + JSON.parse(body).domoappsDomain);
            });
        });
    };
    Transport.prototype.isValidRequest = function (url) {
        var domoPattern = /^\/domo\/(users|avatars|.*)\/v\d/;
        var dataPattern = /^\/data\/v\d\/.+/;
        var dqlPattern = /^\/dql\/v\d\/.+/;
        return (domoPattern.test(url)
            || dataPattern.test(url)
            || dqlPattern.test(url));
    };
    Transport.prototype.build = function (req) {
        var _this = this;
        if (!this.isValidRequest(req.url)) {
            var err = new Error('url provided is not a valid domo app endpoint');
            return Promise.reject(err);
        }
        var api;
        return this.domainPromise
            .then(function (domain) {
            api = "" + domain + req.url;
            return _this.createContext();
        })
            .then(function (context) {
            var jar = request.jar();
            var referer = (req.headers.referer.indexOf('?') >= 0)
                ? (req.headers.referer + "&context=" + context.id)
                : (req.headers.referer + "?userId=27&customer=dev&locale=en-US&platform=desktop&context=" + context.id);
            var headers = __assign({}, _this.client.getAuthHeader(), { referer: referer, accept: req.headers.accept, 'content-type': req.headers['content-type'] || req.headers['Content-Type'] || 'application/json' });
            var options = {
                jar: jar,
                headers: headers,
                url: api,
                method: req.method,
                body: JSON.stringify(req.body),
            };
            return options;
        })
            .catch(function (err) {
            throw new errors_1.DomoException(err, req.url);
        });
    };
    Transport.prototype.createContext = function () {
        var options = {
            method: 'POST',
            url: this.client.server + "/domoapps/apps/v2/contexts",
            json: { designId: this.manifest.id, mapping: this.manifest.mapping },
            headers: this.client.getAuthHeader(),
        };
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                var ok = 200;
                if (error)
                    reject(error);
                if (response.statusCode !== ok)
                    reject(response);
                resolve(body[0]);
            });
        });
    };
    Transport.prototype.getEnv = function () {
        var regexp = /([-_\w]+)\.(.*)/;
        var int = 2;
        return this.client.instance.match(regexp)[int];
    };
    return Transport;
}());
exports.default = Transport;
//# sourceMappingURL=index.js.map