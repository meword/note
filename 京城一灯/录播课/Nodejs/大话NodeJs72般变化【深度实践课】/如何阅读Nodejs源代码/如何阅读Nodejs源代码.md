#### 如何开始

``` bash
git clone git@github.com:nodejs/node.git
cd node
./configure && make
make install
make test 
```



#### 源文件分三类

+ 纯 JavaScript 写的核心模块
+ 带 NativeBinding 的 JavaScript 核心模块
+ C++ 文件