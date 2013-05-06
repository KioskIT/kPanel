<?php
require('../menu/add-files/connect-db.php');
	$name = $_GET['name'];
	$timestamp = time();
	$sql = "INSERT INTO menus(name,timestamp)VALUES('$name',$timestamp)";
	mysql_query($sql) or die ('We have a problem creating your menu.Please try again later');
	echo 'We have successfully create your new menu';
require('../menu/add-files/close-db.php'); 
?>