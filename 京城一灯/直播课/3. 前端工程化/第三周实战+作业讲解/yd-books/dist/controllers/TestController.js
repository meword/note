"use strict";

class TestController {
  actionIndex() {
    return async (ctx, next) => {
      ctx.body = {
        data: "TestController"
      };
    };
  }

}

module.exports = TestController;