<?php
	require('../menu/add-files/connect-db.php');
	$patientID = $_GET['patientID'];
	$bed = $_GET['bed'];
	$sql = "SELECT name FROM patients WHERE patient_ID = $patientID";
	$result = mysql_query($sql) or die(mysql_error());
	$row = mysql_fetch_array($result);
	$name = $row['name'];
	session_start();
	$_SESSION['id']=$patientID;
	$_SESSION['name']=$name;
	$_SESSION['bed'] = $bed;
	header('location:main.php?bed='.$bed);
	require('../menu/add-files/connect-db.php');


?>