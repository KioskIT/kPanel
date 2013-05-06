<?php
	$year = $_GET['y'];
	$month = $_GET['m'];
	$lastDay = date('t',strtotime("1-$month-$year"));
	echo "<option value ='1' selected>1</option>";
	for($i=2;$i<=$lastDay;$i++)
	{
		echo "<option value = '$i'>$i</option>";
	}
?>