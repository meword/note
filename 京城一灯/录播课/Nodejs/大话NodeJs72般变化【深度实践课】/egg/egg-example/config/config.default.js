'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1549872144603_292';

  // add your config here
  config.middleware = [];

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // add middleware robot
  config.middleware = [
    'robot'
  ];
  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };

  return config;
};