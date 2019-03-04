"use strict";

var _path = require("path");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {extend} from "lodash-es";
let config = {
  "viewDir": (0, _path.join)(__dirname, "..", "views"),
  "staticDir": (0, _path.join)(__dirname, "..", "assets")
};

if (false) {
  console.log("xxxx");
}

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    baseURL: "http://localhost/basic/web/index.php?r=",
    cacheMode: false,
    port: 3000
  };
  config = _lodash2.default.extend(config, localConfig);
}

if (process.env.NODE_ENV == "production") {
  const prodConfig = {
    cacheMode: "memory",
    port: 8081
  };
  config = _lodash2.default.extend(config, prodConfig);
}

module.exports = config; //Map