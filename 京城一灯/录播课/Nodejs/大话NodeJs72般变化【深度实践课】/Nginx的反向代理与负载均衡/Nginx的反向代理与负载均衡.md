### 课程概要

+ 什么是反响代理与负载均衡
+ Nginx负载均衡的实现
+ HTTP Upstream 模块
+ 其它负载均衡的方法 



#### 什么是反向代理？

我们有时候，用自己的计算机 A 想访问国外的某个网站 B，但是访问不了，此时，有一台中间服务器 C 可以访问国外的网站 B，那么，我们可以用自己的电脑访问服务器 C，通过 C 来访问 B 这个网站。那么这个时候，服务器 C 称为代理服务器，这种访问方式叫做正向代理。正向代理有一个特点，就是我们明确知道要访问哪个网站。再如，当我们有一个服务器集中，并且服务器集群中的每台服务器的内容一样的时候，同样我们要直接从个人电脑访问到服务器集中的服务器的时候无法访问，且此时第三方服务器能访问集群，这个时候，我们通过第三方服务器访问服务器集群的内容，但是此时我们并不知道是哪一台服务器提供的内容，此时的代理方式成为反向代理。



#### 什么是负载均衡？

当一台服务器的单位时间内访问量越大的时候，服务器的压力会越大。当一台服务器压力大得超过自身的承受能力的时候，服务器就会崩溃。为了避免服务器崩溃，让用户有更好地体验，我们通常通过负载均衡的方法来分担服务器的压力。那么什么是负载均衡呢？是这样，我们可以建立很多很多个服务器，这些服务器组成一个服务器集群，然后当用户访问我们网站的时候，先访问一个中间服务器，再让这个中间服务器在服务器集群中选择一个压力较小的服务器，然后将该访问请求引入该选择的服务器。这样，用户的每次访问，都会保证服务器集群中的每个服务器压力趋于平衡，分担了服务器压力，避免了服务器崩溃的情况



#### Nginx负载均衡的实现

Nginx 是一款可以通过反向代理实现负载均衡的服务器，使用 Nginx 服务实现负载均衡的时候，用户的访问受限会访问到 Nginx 服务器，然后 Nginx 服务器在从服务器集群表中选择压力较小的服务器，然后将该访问请求引向该服务器。若服务器集群中的某个服务器崩溃，那么从待选服务器列表中将该服务器删除，也就是说一个服务器假如崩溃了，那么 Nginx 就肯定不会讲访问请求引入该服务器了



#### HTTP Upstream 模块

 ##### 什么是 HTTP Upstream 模块？

Upstream 模块是 Nginx 服务器的一个重要模块。Upstream 模块实现在轮询和客户端 ip 之间实现后端的负载均衡。常用的指令有 ip_hash 指令、server 指令和 upstream指令等。



##### ip_hash 指令

在负载均衡系统中，加入用户在某台服务器上登录，那么如果该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的一个压力较小的服务器，那么此时如果将已经登录服务器A的用户再定位到其他服务器，显然不妥，故而，我们可以采用ip_hash指令解决这个问题，如果客户端请求已经访问了服务器A并登录，那么第二次请求的时候，会将该请求通过哈希算法自动定位到该后端服务器中



##### server 指令

server 指令主要用于指定服务器的名称和参数



##### upstream 指令及相关变量

upstream 指令主要是用于设置一组可以在 proxy_pass 和 fastcgi_pass 指令中使用的代理服务器，默认负载均衡方式为轮询





### 部署NodeJS上线步骤

1. 打开 https://brew.sh/index_zh-cn.html

2. brew search nginx        brew install nginx

3. brew info nginx

4. nginx -v 查看 nginx 信息

5. 使用 nginx 命令启动 nginx

   - 备注：如果你安装过 Jenkins 的话这里失效
   - sudo launchctl unload /Library/LaunchDaemons/org.jenkins-cj.plist
   - systemctl start jenkin

6. nginx常用命令

   - 关闭 nginx 为 nginx -s stop 命令
   - 重启 nginx 为 nginx -s reload 命令
   - 测试 nginx.conf 文件是否有效
     - nginx -t	(默认测试 nginx.conf  文件)
     - nginx -c xxx.conf

7. 打开 Nginx 具体安装目录，查看配置文件

   - cd  /usr/local/etc/nginx/

   - cat nginx.conf

     ``` bash
     # 表示注释
     # user 表示哪个用户能用
     worker_processes  cpu的核数(标准或者二倍)
     #error_log	nginx的日志
     http {
         #gzip	on; (将#号去掉就能开启gzip)
         server {
             listen	监听的端口
             #charset	语言
             #access_log	日志
             #error_page	node控制出错的
         }
     }
     ```

8. 验证配置文件 nginx -t -c 自己的配置文件地址

9. 拷贝配置文件至 Node 项目目录 重新修改

10. 服务端的 nginx 地址 /usr/local/nginx/sbin/





#### 简单的实现反向代理与负载均衡

``` conf
worker_processes 4;
events {
    worker_connections 1024;
}
http{
    upstream firsttest {
        ip_hash;
        server 192.168.0.21 weight=2;
        server 192.168.0.31;
    }
    server {
        listen 8080;
        location / {
            proxy_pass http://firsttest;
        }
    }
}
```

> weight表示权重值。比例划分





#### 负载均衡实现方式小结

下面我们简单总结一下负载均衡不同实现方式的优缺点：假如使用硬件的方式实现负载均衡，那么中间的转发机构就是硬件，这个时候运行的效率非常高，但是对应的成本也非常高。如果我们才用软件的方式来实现负载均衡，那么中间的转发机构就是软件，这个时候，运行效率不如硬件，但是成本相对来说低很多。而使用 Nginx 服务器实现负载均衡，那么就是通过软件的方式来实现负载均衡，并且 Nginx 本身支持高并发等。故而使用 Nginx 服务器实现负载均衡，能大大节约企业的成本，并且由于 Nginx 是服务器软件，其执行效率也是非常高