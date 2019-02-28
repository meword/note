#### 将import语法向下兼容

包名：babel-plugin-transform-es2015-modules-commonjs

作用：将导出语法向下兼容

in

``` javascript
export default 42;
```

out

``` javascript
Object.defineProperty(exports, "__esModule", {
	value: true
});
export.default = 42;
```





#### 编译后兼容systemjs

包名：@babel/plugin-transform-modules-systemjs

作用：将 systemjs语法 的 js 文件编译成兼容浏览器的 js 文件