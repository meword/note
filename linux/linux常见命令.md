### linux 常见命令

#### 远程登录 ssh 命令

>  ssh 命令由 telnet 命令而来

``` bash
ssh 账号@(服务器地址 / 域名)
```







---

#### 用户操作

##### 切换用户 su 命令

> 在登录最高级别用户时可以随意切换用户，但是当用低级别用户切换高级别的时候需要密码

``` bash
su 切换的用户名
```



##### 查看当前还有谁登陆

> w：who 的简写

``` bash
w
```







----

#### 服务管理命令

> 各个内核的linux系统下，服务管理命令可能不同

``` bash
systemctl	# CentOS 7以上
```



##### 查看服务状态

``` bash
systemctl status 服务名
```



##### 开启服务

``` bash
systemctl start 服务名
```



##### 停止服务

``` bash
systemctl stop 服务名
```



重启服务

> 有些服务提供这个命令，有些服务不提供

``` javascript
systemctl restart 服务名
```







---

#### 资源管理命令

##### 监控资源实时状态

> top命令可以看到：当前的进程、内存占用状态、CPU占用状态、运行的任务数量、CPU使用率、运行时间 
>
>  top不是很好用，top只用来看当前实时的状态，并且列表显示的容量有限，必须去移动光标，操作不方便

``` bash
top
```



##### 当前系统进程状态

> 当输入命令后，就会出现键入命令那一刻系统的进程状态

进程列表：

+ USER：当前进程以什么身份启动的
+ PID：进程的ID（唯一的）
  + 使用`ps aux | grep`命令的时候，会查出多个进程，一般情况下，谁的 PID 小，谁就有可能是父进程
+ STAT：进程的状态
  + S：休眠状态
  + Z：僵尸状态，该进程的父进程已结束，但是该进程没有被系统及时的回收，占着资源却不工作

``` bash
ps aux # 查看所有的进程状态
ps aux | grep # 查看的进程
```



##### 杀掉进程

> kill 命令是向操作系统内核发一个命令，操作系统内核有 32 种信号
>
> kill 和 pkill 区别就是：一个是传 PID 一个是传进程名称

+ -9 —— 强制关闭一个进程

``` bash
kill PID	# 杀掉对应进程
kill -9 PID	# 强制杀掉进程

pkill 进程名称
```







---

#### 命令行下载命令

##### wget

> wget 基本上什么内核的linux系统都会有

``` bash
wget -c 下载链接	# -c：断点续传，当下载失败的时候，重新键入命令，就会在中断之前的下载进度继续下载
```



##### curl

``` bash
curl -c 下载链接	# -c：断点续传
```







---

#### 网络管理命令

> CentOS：网卡配置文件在`/etc/sysconfig/network-scripts/`
>
> 物理网卡配置文件是：`ifcfg-eth0`
>
> 网络不通有可能是`ONBOOT`这个选项没被设置为`yes`

##### ifconfig

``` bash
ifconfig
```



##### ip

> 常用来配置网络

``` bash
ip addr
```



##### route

> 诊断网络（查看网关）

``` bash
route
```



##### 关闭网卡

``` bash
ifdown eth0	# 关闭 eth0 这个网卡
```



##### 开启网卡

``` bash
ifup eth0	# 开启 eth0 这个网卡
```



##### 排查网络故障

> 假如我们本机想和百度的服务器通信的话，`tracerout`命令能列出我们中间经过了哪些路由，从而判断是哪里出现了问题
>
> 当然 tracerout 命令是受到限制的，因为有些路由不让追踪

``` bash
tracerout www.baidu.com
```



##### 系统端口占用情况

> ss 命令和 netstat 命令是差不多的，当没有 ss 命令时，可以尝试 netstat 命令

``` bash
# 列表信息中，带 : 的就是一个端口占用
ss -an	# a: 显示所有信息、n: 显示网络信息
ss -anp | grep :22	# p: 显示网络端口的进程

netstat	# 优先使用，一般都会有这个命令
```

