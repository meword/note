'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var _ = _interopDefault(require('lodash'));

// const {
//     join
// } = require("path");
// const _ = require("lodash");
let config = {
    "viewDir": path.join(__dirname, "..", "views"),
    "staticDir": path.join(__dirname, "..", "assets"),
};
{
    const prodConfig = {
        cacheMode:"memory",
        port: 8081
    };
    config = _.extend(config, prodConfig);
}
module.exports = config;
//Map
