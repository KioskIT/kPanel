<?php
	$orders =  $_GET['orders'];
	$meal = $_GET['meal'];
	$timestamp = time();
	session_start();
	$patientID = $_SESSION['id'];
	
	require('../menu/add-files/connect-db.php');
	if($orders =='')
	{
		echo 'Error1';
	}else{
		
		$orders = explode(',',$orders);
		$arrayLength = count($orders);
		$day = date('d',time());
		$month = date('m',time());
		$year = date('Y',time());
		$sql = "DELETE FROM orders WHERE patient_ID = $patientID  AND meal = $meal AND FROM_UNIXTIME(timestamp,'%d')=$day AND FROM_UNIXTIME(timestamp,'%m')=$month AND FROM_UNIXTIME(timestamp,'%Y')=$year";
		mysql_query($sql);
		echo mysql_error();		
		for($i=0;$i<$arrayLength;$i++)
		{
			$foodID = $orders[$i];
			$sql = "INSERT INTO orders(patient_ID,food_ID,timestamp,meal) VALUES ($patientID,$foodID,$timestamp,$meal)";
			mysql_query($sql) or die('Error2');
			echo mysql_error();
		}
		echo '<h1>Successfully place the orders</h1>';
	}
	require('../menu/add-files/close-db.php');

?>