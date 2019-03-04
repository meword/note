"use strict";

const Index = require("../models/Index");

const {
  URLSearchParams
} = require("url");

class IndexController {
  constructor() {}

  actionIndex() {
    return async (ctx, next) => {
      // ctx.body = 'hello'
      const index = new Index();
      const result = await index.getData(); //SSR

      ctx.body = await ctx.render("books/pages/list", {
        data: result.data
      });
    };
  }

  actionAdd() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("books/pages/add");
    };
  }

  actionSave() {
    return async (ctx, next) => {
      const index = new Index();
      const params = new URLSearchParams();
      params.append("Books[name]", "测试");
      params.append("Books[author]", "测试111");
      const result = await index.saveData({
        params
      });
      ctx.body = result;
    };
  }

}

module.exports = IndexController;