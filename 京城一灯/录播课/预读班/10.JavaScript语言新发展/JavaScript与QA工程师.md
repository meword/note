注释：
```javascript
QA工程师：测试工程师
```

## 单元测试

> 单元测试是指对软件中的最小可测试单元进行检查和验证



目的：单元测试能够让开发者明确知道代码结果



原则：单一职责、接口抽象、层次分离



断言库：保证最小单元是否正常运行监测方法(面向切面编程)



**测试风格：测试驱动开发(Test-Driven Development, TDD)、(Behavior Driven Development, BDD)行为驱动开发均是敏捷开发方法论。
TDD关注所有的功能是否被实现(每一个功能都必须有对应的测试用例)，suite配合test利用assert("tobi" == user.name);
BDD关注整体行为是否符合整体预期，编写的每一行代码都有目的提供一个全面的测试用例集。expect/should,describe配合it利用自然语言expect(1).toEqual(fn())执行**

***

### 单元测试框架

> 初学建议使用继承TDD和BDD的库

+ better-assert(TDD断言库)
+ should.jd(BDD断言库)
+ expect.js(BDD断言库)
+ chai.js(TDD、BDD双模断言库)
+ Jasmine.js(BDD断言库)

### 单元测试运行流程

> 每一个测试用例组通过describe进行设置

+ before(项目流程发起之前)
+ beforeEach(每个遍历一遍)
+ it(对测试用例的应用)
+ after(完成)
+ afterEach(每一个结束)

1. before单个测试用例(it)之前
2. beforeEach每一个测试用例开始前
3. it定义测试用例并利用断言库（设置chai入：expect(x).to.equal(true)）
4. 异步mocha
5. 以上专业术语叫做mock

***

### 自动化单元测试

+ karma自动化runner集成phantomJS无刷新
+ npm install -g karma
+ npm install karma-cli --save-dev
+ npm install karma-chrome-launcher --save-dev
+ npm install karma-phantomjs-launcher --save-dev
+ npm install karma-mocha --save-dev




## 性能测试



## 安全测试



## 功能测试

