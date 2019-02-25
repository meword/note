##PHP

### 初识php

````
php（外文名：PHP：Hypertext Preprocessor，中文名：“超文本预处理器”）是一种通用开源脚本语言。语法吸收了C语言、Java和Perl的特点，利于学习，使用广泛，主要适用于Web开发领域。PHP独特的语法混合了C、Java、Perl以及PHP自创的语法。他可以比CGI或者Perl更快速地执行动态网页。用PHP做出的动态页面与其他的编程语言相比，PHP是将程序嵌入到HTML（标准通用标记语言下的一个应用）文档中去执行，执行效率比完全生成HTML标记的CGI要高许多；PHP还可以执行编译后代码，编译可以达到加密和优化代码运行，使代码运行更快
````



### php导入文件

````php
require_once('xx.php');	// 导入有错就终止程序
include_once('xx.php');	// 导入有错也不会终止程序
````



### php使用session

````php
// 使用之前必须先开启session，每个文件必须独立开启一次
session_start();

// 设置session参数
$_SESSION['views'] = 1;
````





#### php获取请求参数

````php
// get
$_GET['key']

// post
$_POST['key']
    
// 通用
$_REQUEST['key']
````



