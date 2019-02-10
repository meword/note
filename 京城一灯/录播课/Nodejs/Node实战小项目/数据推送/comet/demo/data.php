<?php

	// 后台完成数据流
	/* header("Cache-Control:max-age=0");	// 后端输出无缓存

	$i = 0;
	while($i < 10) {
		$i++;
		sleep(1);
		$radom = rand(1, 999);
		echo $radom;
		echo '<br/>';
		ob_flush();	//将数据从php的buffer中释放出来
		flush();	//将释放出来的数据发送给浏览器
	} */


	// 后台普通返回
	header("Content-type:application/json;charset=utf-8");
	header("Cache-Control:max-age=0");	// 后端输出无缓存
	sleep(1);
	$res = array('success' => 'ok', 'text' => '我是测试的文本');
	echo json_encode($res);
	
?>