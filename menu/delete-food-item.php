<?php
	require('../menu/add-files/connect-db.php'); 
		$id = $_GET['menuFoodID'];
		$sql = "DELETE FROM menu_food WHERE id = $id";
		echo $sql;
		mysql_query($sql) or die(mysql_error() . $sql);
		echo 'Successfully Deleted';
	require('../menu/add-files/close-db.php'); 	
?>