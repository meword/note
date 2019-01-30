## CSS3开发常备核心技能

+ 早期的双飞翼布局 + CSS Hack
+ 基于移动端的PX与REM转换兼容方案
+ 弹性盒模型与Reset的选择
+ 自制的ICON-FONT与常用字体排版
+ CSS代码检测与团队项目规范
+ CSS绘制特殊图形 高级技巧
+ BFC IFC GFC FFC


### 双飞翼布局

+ position
+ float
+ 负边距
+ 等高
+ 盒子模型
+ 清除浮动

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        :root {
            --leftBg: red;
            --middleBg: yellow;
            --rightBg: blue;
        }

        .container {
            overflow: hidden;
        }

        .left, .middle, .right {
            float: left;
            padding-bottom: 9999px;
            margin-bottom: -9999px;
        }

        .left {
            width: 150px;
            margin-left: -100%;
            background-color: var(--leftBg);
        }
        
        .middle {
            width: 100%;
            background-color: var(--middleBg);
        }

        .inner {
            margin: 0 200px 0 150px;
        }

        .right {
            width: 200px;
            margin-left: -200px;
            background-color: var(--rightBg);
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="middle">
            <div class="inner"><br>中</div>
        </div>
        <div class="left">左</div>
        <div class="right">右</div>
    </div>
</body>
</html>
```








### 基于移动端的PX与REM

+ different size、different DPR
+ 目前的设计稿一般是 640、750、1125，一般要先均分成100分，(兼容vh，vm) 750 / 10 = 75px。div宽是240px * 120px，css的书写改为 3.2rem * 1.6rem。配合响应式修改html根的大小。
+ 字体不建议使用rem的，data-dpr属性动态设置字体大小。屏幕变大放更多的文字，或者屏幕更小放更少的文字
+ 神奇的padding/margin-top等比例缩放间距








### 弹性盒模型与Reset的选择

+ flex模型
+ *的杀伤力太大！！
+ Reset.css重置Normalize.css，修复：Neat.css
+ html {box-sizing: border-box;}<br>*, *:before, *:after{box-sizing: inherit;}








### ICON-FONT与常用字体排版

+ no-image时代，不超过纯色为2的图像
+ 宋体非宋体，黑体非黑体，Windows下的宋体叫做中易宋体SimSun，Mac是华文宋体STSong。Windows下黑体叫中易黑体SimHei，Mac是华文黑体STHeiti
+ 不要只写中文字体名，保证西文字体在中文字体前面。Mac->Linux->Windows
+ 切记不要直接使用设计师PSD的设计font-family，关键时刻再去启动font-face(typo.css、Entry.scs、Type.css)
+ font-family:sans-serif;系统默认，字体多个单词组成加引号








### CSS规范

**CSS HINT**

1. 不要使用多个class选择元素，如a.foo.boo，这在ie6及以下不能正确解析
2. 移除空的css规则，如a{}
3. 正确的使用显示属性，如display:inline不要和width、height、float、margin、padding同时使用，display:inline-block不要和float同时使用等
4. 避免过多的浮动，当浮动次数超过十次时，会显示警告
5. 避免使用过多的字号，当字号声明超过十种时，显示警告
6. 避免使用过多的web字体，当使用超过五次时，显示警告
7. 避免使用id作为样式选择器
8. 标题元素只定义一次
9. 使用width: 100%时要小心
10. 属性值为0时不要写单位
11. 各浏览器专属的css属性要有规范
12. 避免使用看起来像正则表达式的css3选择器
13. 遵守盒模型规则








### BFC

````tex
Box: CSS布局的基本单位
Box是CSS布局的对象和基本单位，直观点来说，就是一个页面是由很多个Box组成的。元素的类型和display属性，决定了这个Box的类型，不同类型的Box，会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染

block-level box：display 属性为 block、list-item、table 的元素，会生成 block-level box。并且参与 block fomatting content;

inline-level box：display 属性为 inline、inline-block、inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；

Formatting context 是 W3C CSS2.1 规范中的一个概念。他是页面中的一块渲染区域，并且有一套渲染规则，他决定了其子元素将如何定位，以及和其他元素的关系和相互作用，最常见的 formatting context 由 Block formatting context（简称BFC） 和 inline formatting context （简称IFC）
````



#### 哪些元素会生成BFC？

+ 根元素
+ float 属性不为 none
+ position 为 absolute 或 fixed
+ display 为 inline-block，table-cell，table-caption，flex，inline-flex
+ overflow 不为 visibile



#### BFC 布局规则

1. 每个元素的margin box的左边，与包含块 border box 的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此
2. BFC 的区域不会与 float box 重叠
3. 两个BFC之间不重叠，互相是独立的
4. 计算BFC的高度时，浮动元素也参与计算



#### 常见问题

1. 内部元素浮动导致外部容器失去高度
   解决方案：外部容器触发 BFC 来清除浮动
   原理：计算BFC的高度时，浮动元素也参与计算
2. 垂直 margin 重叠：Box垂直方向的距离有margin决定的，属于同一个 BFC 的两个相邻的 Box 的margin会发生重叠
   解决方案：对其中一个 Box 包裹一层容器，并触发该容器生成一个 BFC，那么两个 Box 便不属于同一个 BFC，就不会发生 垂直 margin 重叠
   原理：两个BFC之间不重叠，互相是独立的



### 总结

+ BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此
+ IFC（inline Formatting Contexts）直译为 "内联格式化上下文"，IFC 的 line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的 padding/margin 影响）
+ FFC（Flex Formatting Contexts）直译为 "自适应格式化上下文"，display 值为 flex 或者 inline-flex 的元素将会生成自适应容器（flex container）
+ GFC（GridLayout Formatting Contexts）直译为 "网格布局格式化上下文"，当为一个元素设置 display 为grid 的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid defintion rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间



## CSS矩阵

### transform的原理

> transform: matrix(a,b,c,d,e,f) ;
>
> 无论是旋转还是拉伸什么的，本质上都是应用 matrix() 方法实现的（修改 matrix() 方法固定几个值），只是类似于 transform: rotate 这种表现形式，我们更容易理解，记忆和上手



### transform-origin

> 通过 transfor-origin 属性进行设置的时候，矩阵相关计算也随之发生改变。实际图形效果上就是，旋转拉伸的中心点变了



### 矩阵调试地址

> http://www.css88.com/tool/css3Preview/Transform-Matrix.html<br>
http://f2e.name/case/css3/tools.html


### 矩阵工具

> CSS-Matrix3d: https://github.com/Zhangdroid/CSS-Matrix3d


### matrix3D矩阵

> 调试地址：http://ds-overdesign.com/transform/matrix3d.html












