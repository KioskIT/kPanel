<?php
require('../menu/add-files/connect-db.php');	
	$id = $_GET['foodID'];
	$menuID = $_GET['menuID'];
	$title=$_GET['title'];
	$portion = $_GET['portion'];
	$minCalories = $_GET['minCalories'];
	$maxCalories = $_GET['maxCalories'];
	$category = $_GET['category'];
	$sql = "UPDATE food_items SET title = '$title',portion=$portion,min_calories=$minCalories,max_calories=$maxCalories,category=$category WHERE id = $id";
	mysql_query($sql) or die('There is a problem updating the item. Please try again later.');
	echo "Successfully Updated";
require('../menu/add-files/close-db.php');
?>