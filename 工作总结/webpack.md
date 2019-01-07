####  webpack配置scss loader

**安装包**
> cnpm i node-sass sass-loader -D

**在 webpack.config.js 中配置**
```javascript
{
    test: /\.scss$/,    //匹配的文件类型
    use: [{             //loader处理的顺序是该数组中从右到左的顺序
        loader: 'style-loader'//将 JS 字符串生成为 style 节点
    },{
        loader: 'css-loader'//将 CSS 转化成 CommonJS 模块
    },{
        loader: 'sass-loader'//将sass编译成css
    }]
}
```