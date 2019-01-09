## 测试的概念

>    一般的测试又分黑核和白核，很多传统的测试都是QA的，都是人工的去手点的手动测试



测试的核心概念

+   单元测试（本节内容）
+   性能测试
+   安全测试
+   功能测试（本节内容）



什么是单元呢？：

单元就是一个小单位，可以是一个函数，可以是一个组件，可以是一个你所期望的任何的东西，只要他足够的小，就是一个单元。对于前端来讲，可能是一个function、Object等等，单元只是一个功能唯一的小单元。



怎么去定义单元？：

一般就是根据业务，比如一个组件就是一个单元，或者一个帮助类就是一个单元



## 单元测试

单元测试的概念

+   目的：单元测试能够让开发者明确知道代码结果

+   原则：单一职责、接口抽象、层次分离

+   断言库：保证最小单元是否正常运行监测方法

+   测试风格：测试驱动开发(Test-Driven Development，TDD)、(Behavior Driven Development，BDD)行为驱动开发，均是敏捷开发方法论。


    TDD关注所有的功能是否被实现（每一个功能都必须有对应的测试用例）、suite配合test利用assert('tobi' == user.name);（测试驱动开发：先要将测试整出来，也就是测试先行 (国内较少使用)）



    BDD关注整体行为是否符合整体预期，编写的每一行代码都有目的提供一个全面的测试用例集。expect/should.describe 配合 it 利用自然语言 expect(1).toEqual(fn()) 执行结果。（测试后边再测，程序完成才测试）



单元测试的前提条件

+   断言库（让你能用有语义化的语法描述一段代码，比如：这应该是怎么样、传进这个参数得到的结果应该是什么）
+   集成测试框架（集成环境）



单元测试的特点

+   正确性：测试可以验证代码的正确性，在上线前做到心里有底
+   自动化：当然手工也可以测试，通过console可以打印出内部信息，但是这是一次性的事情，下次测试还需要从头来过，效率不能得到保证。通过编写测试用例。可以做到一次编写，多次运行
+   解释性：测试用例用于测试接口、模块的重要性，那么在测试用例中就会涉及如何使用这些API。其他开发人员如果要使用这些API，那阅读测试用例是一种很好地途径，有时比文档说明更清晰
+   驱动开发、指导设计：代码被测试的前提是代码本身的可测试性，那么要保证代码的可测试性，就需要在开发中注意API的设计，TDD将测试前移就是起到这么一个作用
+   保证重构：互联网行业产品迭代速度很快，迭代后必然存在代码重构的过程，那怎么才能保证重构后代码的质量呢？有测试用例做后盾，就可以大胆的进行重构



单元测试断言库

+   better-assert （TDD断言库）
+   should.js （BDD断言库）
+   expect.js （BDD断言库）
+   chai.js （TDD、BDD双模）（前端较多使用）
+   Jasmine.js （BDD断言库）（前端较多使用）（本节主讲）



单元测试集成环境

+   Node.js 本身集成 require("assert")
+   karma（本节主讲）（jasmine、phantomjs）
+   Intern 更是一个大而全的单元测试框架
+   QUnit 一个游离在jQuery左右的测试框架
+   Macaca 一套完整的自动化测试解决方案（国产神器来自阿里巴巴）





单元测试运行流程（生命周期）

![生命周期](..\..\images\test\1.png)





#### 串行和并行

```json
{
  "name": "Desktop",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
      "test1": "npm run dev && npm run prod",
      "test2": "npm run dev & npm run prod",
      "dev": "echo 1",
      "prod": "echo 2"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

在`package.json`中有一个`script`对象，对像内的属性可以通过`npm run`来执行，当然`npm`也有些自带的属性可以不用通过`npm run`来执行。（例：`npm install`、`npm uninstall`、`npm test`等）

`npm run`运行有分**串行**和**并行**

串行：串行也就是执行完了一条语句，再去执行下一条语句。比如对上面的`package.json`运行`npm run test1`，那么就会先运行`npm run dev`，等`npm run dev`执行完毕之后，再去执行`npm run prod`。假如串行之中某条语句报错了，那么将会终止语句的执行

并行：并行就是将所有语句同时执行。比如对上面的`package.json`运行`npm run test2`，那么`npm run dev`和`npm run prod`这两条语句就会同时执行。并行之中互不干涉，并不会因为某条语句报错而影响其他语句。



#### 寻找规则

```json
{
  "name": "Desktop",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
      "test": "karma init"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

当我们调用`npm run test`的时候，首先在当前文件夹的`node_modules`中的`.bin`文件夹里面寻找对应的文件执行，假如在当前文件夹的`node_modules`中的`.bin`文件夹里面没找到，那么会在全局中查找并执行，当在全局中也没找到的话，则报错

