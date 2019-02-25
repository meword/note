### java、web、net常用框架

+ SSH(struts + spring + hibernate)
+ MVC4





### ASP.NET 发展历程

> .net 的网站为：xxxx.aspx

+ asp 时代，简单的输送 html 从 server 到用户面前。出现了很多暴库漏洞。如：明小子
+ 无法局部化操作页面。面向过程的开发语言，解释型的 VBScript 或 JScript 语言，让性能无法完全发挥
+ 扩展性由于其基础架构的不足而受限，虽然有COM元件(C盘 systeam32 里面的 dll 就是 COM 元件)可用，但开发一些特殊（如文件上传）时， 没有来自内置的支持，需要寻求第三方控件商的控件
+ 一场革命式的拖控件时代，按钮事件直接操作服务器后台的数据，异步的操作区域、丰富的控件完整功能、强大的社区。缺点：样式很挫、每个页面都要有form
+ 同时可以开发 PC 软件、Web、编译型语言





#### MVC

- 视图(View)：用户界面
- 控制器(Controller)：业务逻辑(路由管理)
- 模型(Model)：数据保存





#### .net 多层架构

1. 表现层 User Interface layer（Web Components）
   + UI：User Interface layer
   + 现在所有的前端开发都在基于`Web Components(组件)`。包括：三大马车
2. 业务逻辑层 BLL（Business Logic Layer）
   + 封装后台代码，暴露给真实用户的接口都放在业务逻辑层
3. 数据访问层工厂类 DALFactory（Data access layer Factory）
   + 高内聚低耦合、反射接口
4. 数据访问接口层 IDAL（Interface Data access layer）
   + 大型架构都会有这一层，这一层啥都不干，就是定义接口 
5. 数据访问接口层 DLL（Data access layer）
   + 用来实现接口
6. 数据访问 SqlServer 封装层（SQL Server Data access layer）
   + 数据库的接口
7. 数据库集群





---

### JavaWeb 发展历程

> jsp 的网站为：xxx.jsp

+ jsp 指令元素(import)，jsp 动作元素(jsp: forward)
+ jsp 内置对象（session、request、response）
+ javabean 对象，可重用组件化思想
+ el 表达式和 jstl 标签`<x:if>`
+ 页面结构相当复杂，无前后端分离的概念 





#### JavaWeb 多层架构

1. 表现层 User Interface layer（Web Components）
2. 路由层 Action（Business Logic Layer）
   + AOP => Spring(AOP)
   + AOP：面向切面编程
3. 业务处理层（Service）
   + struts.xml => DI(IoC) 
4. 持久化访问层 PO（Persistant object）
5. hibernate.cfg.xml
6. 数据库接口 DAO（Data Access Object）
7. 数据库集群





---

### Node

重点：

+ http模块：设置响应头