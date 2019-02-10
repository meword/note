### [pm2](https://app.pm2.io/)

---

+ 获取 cpu 使用的情况`pm2 list`
+ 获取日志列表 `pm2 logs`
+ 显示 pm2 的监控`pm2 monit`
+ 停止所有的 pm2 运行  `pm2 stop all`





### 实用的命令

+ ps aux | grep node    (查看当前谁在使用node进程，找到对应的pid)
+ lsof -i tcp:8081      (查看端口是否有进程在使用)
+ kill -9 pid                (杀掉pid对应的进程)
+ ssh 用户名@地址(免密登录)
+ scp course-map.json root@IP地址:/路径      (传输指定文件到指定的服务器)
+ scp -r advance/ root@101.200.185.250:/opt/node-publish/www/static/
+ npm install --production        (安装生产环境依赖包)





### 主要掌握点

+ pm2
+ linux 命令
+ 负载均衡的实现