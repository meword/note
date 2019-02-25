#### loader

**loaders in require：**

``` javascript
require('./loader!./dir/file.txt');

require('jade!./template.jade');

require('!style!css!less!bootstrap/less/bootstrap.less');
```



**loader in Configuration**

``` javascript
{
    module: {
        loaders: [
            { test: /\.jade$/, loader: 'jade' },
            // => "jade" loader is used for ".jade' files
            { test: /\.css/, loader: 'style!css' },
            // => "style" and "css" loader is used for ".css" files
            // Alternative syntax;
            { test: /\.css/, loader: ['style', 'css'] }
        ]
    }
}
```





#### 常见 Loaders 介绍

+ 样式：css-loader、sass-loader、less-loader
+ 脚本：babel-loader
+ 图片/字体：file-loader、url-loader





#### webpack使用优化

**使用别名**

``` javascript
{
    resolve: {
        alias: {
            moment: "moment/min/moment-with-locales.min.js"
        }
    }
}

// in a module
// the same as require('moment/min/moment-with-locales.min.js')
require('moment')
```



**忽略对已知模块的解析**

``` javascript
{
    module: {
        noParse: [/moment-with-locales/]
    }
}
```



**将模块暴露到全局**

> 使用 expose-loader

``` javascript
// configured via configuration
{
    module: {
        loaders: [
            {
                test: /jquery\.js$/,
                loader: "expose?$!expose?jQuery"
            }
        ]
    }
}

// explicit in the require statement
require('expose?$!expose?jQuery!jquery');
```

> 使用 ProvidePlugin

``` javascript
// configured via configuration
{
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
}

// in a module
$('#item')	// <= just works
// $ is automatically set to the exports of module "jquery"
```



**提取公共代码**

``` javascript
// configured via configuration
{
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // (the commons chunk name)
            filename: "[name].[hash:8].js",
            // (the filename of the commons chunk)
            minChunks: 3,
            // (Modules must be shared between 3 entries)
            chunks: ['jquery', 'underscore'],
            // (Only use these entries)
        })
    ]
}

// build vendor.xxxxx.js
```



**配置全局开关**

``` javascript
// configured via configuration
{
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: true
        })
    ]
}

// Constant.js
const Constant = {
    API_HOST: DEBUG ? 'http://10.13.129.245:8080' : ''
}
```



**单独打包CSS**

``` javascript
// configured via configuration
{
    plugins: [
        new ExtractTextPlugin("[name].[hash:8].css", {
            allChunks: true
        })
    ]
}
```





#### webpack2 新变化

+ 支持了 ES6 的 import，把 System、import 作为拆分点一个异步回调函数，想用 ES6 模块化需要安装 es2015-webpack
+ tree-shaking 优化模块一个 export ，没有用过的接口，会忽略暴露 export 给其他模块的声明
+ 在过去，由于环境的不同需要去处理不同环境下的结构配置，webpack2 利用 --env dev => "dev"
+ 在 loaders 的配置中使用了 resourcePath 来替代原来的 resource
+ UglifyJsPlugin 将不再把所有 loader 都切到代码压缩模式，LoaderOptionsPlugin 来提供这些选项
+ OccurrenceOrderPlugin 不再需要