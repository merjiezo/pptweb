##当PPT遇到网络程序员，会怎么办？

>当然就诞生了 Web PPT 了！
***

目前还不支持图片显示，首先先需要引入三个核心文件：
>pptweb.css<br>
mjz.js<br>
ppt.js

![WEB PPT](https://github.com/merjiezo/pptweb/raw/master/page.gif)

一页ppt引入css: PPTpage<br>
暂时必须引入居中代码：center_block<br>
暂时书写了两个样式：h1  /  p


```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<link rel="stylesheet" href="css/pptweb.css">
	</head>
	<body style="background-color: #333;" onload="load()">
		<div class="moveDiv" id="move">
			<div class="PPTpage" style="background-color: #369;">
				<div class="center_block">
					<h1 class="">First Page</h1>
					<p class="">This is the first page of Web PPT</p>
				</div>
			</div>
	</body>
	<script src="js/mjz.js"></script>
	<script src="js/ppt.js"></script>
	<script>
		var num = document.querySelectorAll('.PPTpage').length;
		var pptWeb = new ppt(num, 1);
		var move = document.getElementById('move');
		move.style['width'] = num*100+'%';
		var p = 100/num;
		console.log(p);
		MjFn('.PPTpage').css('width', p+'%');
		function load() {
			pptWeb.addWord();
		}
	</script>
</html>
```