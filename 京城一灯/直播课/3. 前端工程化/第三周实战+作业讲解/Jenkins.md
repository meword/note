# Jenkins

官网：https://jenkins.io/

## Linux、windows mac基础环境

要求java运行环境

建议安装Oracle官方的

`https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html`

## 安装（CentOS）

```shell
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
# 或 https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum install jenkins
```

* 添加Jenkins官方仓库
* 导入公钥
* 安装

确认：

检查/usr/lib/jenkins/jenkins.war是否存在

如果下载很慢就改成http协议

## 服务管理（Linux）

```shell
systemctl start jenkins
systemctl stop jenkins
systemctl status jenkins
```

### 配置：

配置文件：/etc/sysconfig/jenkins

```
# 修改默认端口
JENKINS_PORT="8001"
JENKINS_AJP_PORT="8009" # 选填
```

### Mac OS 下管理服务

用 launchctl 命令

## 第一次访问：

* 管你要密码怎么办？

可以在`/var/lib/jenkins/secrets/initialAdminPassword`中找到

* 等待初始化

* 安装建议插件

* 创建管理员账号（**一定要记住你设置的管理员用户名和口令！！**）

* 登陆之后出现主界面意味着安装成功！

## 持续集成node

安装插件：

[NodeJS Plugin](http://wiki.jenkins-ci.org/display/JENKINS/NodeJS+Plugin)

[Publish Over SSH](https://plugins.jenkins.io/publish-over-ssh)

GitHub Integration Plugin

配置远程

### 确认 服务器环境是不是完整的：

* git （centos mini安装需要手动 yum）
* svn (根据需要选择)
* node.js （必要的环境）

## 使用jenkins之前要做的事情

1. 必须要有github、svn或私有git服务器
2. 完整的项目
   1. test 
   2. 接口测试
   3. 其它的测试内容
3. CI 可以装在本机，或专用的CI服务器
4. 项目代码要提交到 github、svn等服务器上
5. 保证代码在开发机上是正常的
   1. bug
   2. 运行环境（引用的包要写入package.json）
   3. 手动模拟jenkins的流程（测试、构建、发布），可以封装成脚本
6. 保证jenkins环境一切正常
7. 发布服务器上也要存在基础的运行环境（不包括项目本身引用的包）
8. 必要的静态资源服务器
9. 配置Jenkins的自动化处理流程



## Jenkins 系统配置

 主页--> 系统管理--> 系统设置

* **Publish over SSH**项目











