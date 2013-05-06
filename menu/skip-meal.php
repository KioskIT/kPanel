<?php
	require('../menu/add-files/connect-db.php');
		session_start();
		$patientID  = $_SESSION['id'];
		$timestamp = time();
		$meal = $_GET['meal'];
		$redirect = $_GET['redirect'];
		$day = date('d',time());
		$month = date('m',time());
		$year = date('Y',time());
		$sql = "DELETE FROM orders WHERE patient_ID = $patientID  AND meal = $meal AND FROM_UNIXTIME(timestamp,'%d')=$day AND FROM_UNIXTIME(timestamp,'%m')=$month AND FROM_UNIXTIME(timestamp,'%Y')=$year";
		mysql_query($sql) or die(mysql_error());
		$sql = "INSERT INTO orders(patient_ID,food_ID,timestamp,meal) VALUES($patientID,0,$timestamp,$meal)";
		mysql_query($sql) or die('error');
	require('../menu/add-files/close-db.php');
	if($redirect == true)
	{
		header('location:main.php');
	}
?>