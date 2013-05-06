<?php
$id = $_GET['id'];
$menuName = $_GET['menuName'];
require('../menu/add-files/connect-db.php'); 
	$sql  = "UPDATE menus SET name = '$menuName' WHERE id = $id";
	mysql_query($sql) or die('Try updating it later');
	echo 'We have successfuly update the menu\'s details';
require('../menu/add-files/close-db.php'); 
?>