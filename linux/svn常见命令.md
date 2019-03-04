### 安装 svn

ubuntu下载：`apt -get install svn`

CentOS下载：` yum install  svn`





### 常用命令

查看 svn 帮助

``` bash
svn help
```



将 svn 项目检出

``` bash
svn checkout (svn 项目地址) --username 用户名
```



svn 新建分支

``` bash
svn branch 分支名 (add / commit)
```



svn 合并分支

``` bash
svn merge 主干svn地址 分支svn地址
```



svn 解决冲突

``` bash
# 使用 beyond Compare 解决冲突
svn resolved
```



svn 打 tags

```bash
svn copy 主干svn地址 /tags/2017
```



将 svn 项目导出（用来上线部署）

``` bash
svn checkout (svn 项目地址)
```



svn 版本库里添加文件（文件夹）

``` bash
svn add (文件名 / 文件夹)
```



svn 检查文件修改记录

``` bash
svn changelist
```
