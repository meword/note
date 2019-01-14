## e2e测试

**什么是E2E：** E2E（End To End）即端对端测试，属于黑盒测试，通过编写测试用例，自动化模拟用户操作，确保组件间通信正常，程序流数据传递如预期。



**初始化package.json**

> npm init -y

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```





### 使用selenium-webdriver进行e2e测试

[参考地址](https://www.npmjs.com/package/selenium-webdriver)



> 安装selenium-webdriver

```bash
cnpm install selenium-webdriver -D
```



> 下载启动浏览器所需要的程序

[下载地址](https://www.npmjs.com/package/selenium-webdriver)，这里我们选择用谷歌进行测试



新建一个`test.spec.js`，将`test.spec.js`写入：

```javascript
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
	let driver = await new Builder().forBrowser('chrome').build();	// chrome为你使用的浏览器
    try {
        await driver.get('https://www.baidu.com/');	// 打开百度
        await driver.findElement(By.name('wd')).sendKeys('百度', Key.RETURN);	// 找到name为wd的，并输入百度，key.RETURN表示回车
        await driver.wait(until.titleIs('百度_百度搜索'), 1000);	// 等待搜索结束，检测页面的title是不是'百度_百度搜索'
    } finally {
  		await driver.quit();	// 退出浏览器
    }
})();
```



将下载好的启动程序放在同级目录



使用`node ./test.spec.js`运行脚本进行测试





### 使用Rize进行e2e测试

[参考地址](https://rize.js.org/zh-CN/#%E7%89%B9%E6%80%A7)

安装`rize`和`puppeteer`

```bash
cnpm install --save-dev puppeteer rize
```

新建`test.spec.js`，写入：

```javascript
const Rize = require('rize');

const rize = new Rize()

rize
  .goto('https://github.com/')	// 打开github
  .type('input.header-search-input', 'node')	// 找到input写入node
  .press('Enter')	// 回车
  .waitForNavigation()	// 等待跳转
  .assertSee('Node.js')	// 查看整个页面是否有Node.js
  .end()  // 别忘了调用 `end` 方法来退出浏览器！
```



使用`node ./test.spec.js`运行脚本进行测试