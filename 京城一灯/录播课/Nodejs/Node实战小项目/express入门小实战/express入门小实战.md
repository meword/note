#### 全局安装 express 应用生成器

``` bash
npm install express-generator -g
```



#### 快速生成 express 项目

> cd 到需要生成 express 项目的目录下，然后执行命令

``` bash
express
```

当执行完命令后，就会生成一个 express 的基本目录结构，但是需要`npm install`下载相关的依赖

生成的目录结构如下：

````
appName/
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
````

+ bin：启动文件目录
+ public：资源目录
+ routes：管理层路由目录
+ views：视图层目录