## CSS

<br>

**去除公共样式**
```css
/*公共样式--开始*/
html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
    margin: 0;
    padding: 0;
}
*{box-sizing: border-box;}
html, body {
    min-height: 100%;
}

body {
    font-family: "Microsoft YaHei";
    font-size:14px;
    color:#333;
}
h1, h2, h3, h4, h5, h6{font-weight:normal;}
ul,ol {
    list-style: none;
}

img {
    border: none;
    vertical-align: middle;
}

a {
    text-decoration: none;
    color: #232323;
}

table {
    border-collapse: collapse;
    table-layout: fixed;
}

input, textarea {
    outline: none;
    border: none;
}

textarea {
    resize: none;
    overflow: auto;
}

.clearfix {
    zoom: 1;
}

.clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow:hidden;
}

.fl {
    float: left
}

.fr {
    float: right
}

.tl {
    text-align: left;
}

.tc {
    text-align: center
}

.tr {
    text-align: right;
}

.ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.inline{
    display: inline-block;
    *display: inline;
    *zoom: 1;
}

.dn {
	display: none;
}

._dn {
	display: none !important;
}
```

**自定义radio样式**

```css
/* 单选按钮 */
input.need-radio[type="radio"] {
  	display: none;
  	position: absolute;
	clip: rect(0, 0, 0, 0);
}

input.need-radio[type="radio"]+label::before {
    content: "\a0";
    /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 18px;
    height: 18px;
    margin-right: 5px;
    border-radius: 50%;
    background-image: url('未选中时图片路径');
}

input.need-radio[type="radio"]:checked+label::before {
    background-image: url('选中的图片路径');
}

使用：
<input class="need-radio" type="radio" id="id" name="" value="">
<label for="id">代充</label>
```

**自定义checkbox样式**

```css
input.need-checkbox {
    display: none;
}
input.need-checkbox[type="checkbox"]+label::before {
    content: "\a0";
    /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    width: 12px;
    height: 12px;
    background-image: url('未选中时图片路径');
}

input.need-checkbox[type="checkbox"]:checked+label::before {
    background-image: url('选中的图片路径');
}

input.need-checkbox[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
```

**自定义select样式**

```css
.custom-group {
	margin-bottom: 15px;
	.control-label {
		float: left;
		width: 110px;
		font-size: 14px;
		color: #333;
		text-align: right;
		padding-top: 10px;
	}
	.controls {
		margin-left: 120px;
		input[type=text]:focus, input[type=password]:focus {
			border-color: #5de9fe;
			-webkit-box-shadow: 0 0 3px 0 rgba(93,233,254,.75);
			box-shadow: 0 0 3px 0 rgba(93,233,254,.75);
			-webkit-transition: all .2s ease;
			-o-transition: all .2s ease;
			transition: all .2s ease;
		}

		select.select {
			cursor: pointer;
			border-radius: 3px;
			width: 300px;
			height: 40px;
			margin-bottom: 0;
			vertical-align: middle;
			-webkit-appearance: none;
			-moz-appearance: none;
			padding: 0 14px 0 6px;
			line-height: 15px;
			display: inline-block;
			border-color: #b8b8b8;
			color: #333;
			background: url('../images/icon/up_bottom.png') no-repeat 95% center;
			background: \9;
			background-color: #f9f9f9;
		}
		input[type="text"], input[type=password] {
			border-radius: 3px;
			width: 300px;
			height: 40px;
			padding: 0 14px 0 6px;
			border: 1px solid #b8b8b8;
			color: #333;
		}
		.text {
			display: inline-block;
			width: 300px;
			height: 40px;
			line-height: 40px;
			text-align: left;
			padding: 0 14px 0 6px;
			color: #333;
		}
	}
}
```

**css定义滚动条**

```css
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
.scroll-box::-webkit-scrollbar{
    width: 16px;
    height: 16px;
    border-radius: 10px;
    background-color: #f5f5f5;
}
/*定义滚动条的轨道，内阴影及圆角*/
.scroll-box::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #f5f5f5;
}
/*定义滑块，内阴影及圆角*/
.scroll-box::-webkit-scrollbar-thumb{
    opacity: 0.8;
    background: #D0021B;
    height: 20px;
    border-radius: 10px;
}
```