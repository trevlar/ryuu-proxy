"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Domo = require("ryuu-client");
var glob = require("glob");
var fs = require("fs-extra");
function getMostRecentLogin() {
    var home = Domo.getHomeDir();
    var logins = glob.sync(home + '/login/*.json');
    if (logins.length === 0)
        return {};
    var recent = logins.reduce(function (prev, next) {
        return fs.statSync(prev).mtime > fs.statSync(next).mtime ? prev : next;
    });
    return fs.readJsonSync(recent);
}
exports.getMostRecentLogin = getMostRecentLogin;
//# sourceMappingURL=index.js.map