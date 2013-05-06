<?php
	require('../menu/add-files/connect-db.php'); 
		$menuID = $_GET['menuID'];
		$foodID = $_GET['foodID'];
		$sql = "INSERT INTO menu_food(menu_ID,food_ID) VALUES ($menuID,$foodID)";
		mysql_query($sql);
		echo mysql_error();
	require('../menu/add-files/close-db.php');
?>