<?php
session_start();
$bed = $_SESSION['bed'];
$newFloor = $_GET['newFloor'];
require('../menu/add-files/connect-db.php');
	$sql = "UPDATE beds SET floor = $newFloor WHERE bed_no=$bed";
	mysql_query($sql) or die ('There is a problem here.Please try again later');
	echo 'Bed successfully moved to floor ' . $newFloor;
require('../menu/add-files/close-db.php');
?>