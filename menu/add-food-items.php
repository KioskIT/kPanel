<?php
require('../menu/add-files/connect-db.php'); 
	$menuID = $_GET['menuID'];
	$title=$_GET['title'];
	$portion = $_GET['portion'];
	$minCalories = $_GET['minCalories'];
	$maxCalories = $_GET['maxCalories'];
	$category = $_GET['category'];
	$sql = "INSERT INTO food_items(title,portion,min_calories,max_calories,category) VALUES ('$title',$portion,$minCalories,$maxCalories,$category)";
	echo $sql;
	mysql_query($sql) or die('There is a problem here 1');
	
	$foodID = mysql_insert_id();
	$sql = "INSERT INTO menu_food(menu_ID,food_ID) VALUES ($menuID,$foodID)";
	mysql_query($sql) or die ('There is a problem here 2');
	echo 'We have succcessfully added the new food';
require('../menu/add-files/close-db.php'); 
?>