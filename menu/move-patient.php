<?php
require('../menu/add-files/connect-db.php');
	session_start();
	$bed = $_SESSION['bed'];
	$id = $_SESSION['id'];
	$name = $_SESSION['name'];
	$newBedNumber =  $_GET['newBedNumber'];
	$sql = "UPDATE patients_beds SET patient_ID = $id WHERE bed_ID = $newBedNumber";
	mysql_query($sql) or die('there is a problem here');
	$sql = "UPDATE patients_beds SET patient_ID = NULL WHERE bed_ID = $bed";
	mysql_query($sql) or die('there is a problem here');
	unset($_SESSION['id']); 
	unset($_SESSION['name']); 
	unset($_SESSION['bed']);
	session_unset(); 
	session_destroy(); 
	echo "Patient, $name has been moved to bed number, $newBedNumber";
require('../menu/add-files/close-db.php');
?>