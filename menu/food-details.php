<?php
	require('../menu/add-files/connect-db.php');
	$id = $_GET['id']; 
	$sql = "SELECT title,portion,min_calories,max_calories,category FROM food_items WHERE id = $id LIMIT 1";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	echo $row['title'] . ',' . $row['portion'] . ',' . $row['min_calories'] . ',' . $row['max_calories'] . ',' . $row['category'];
	require('../menu/add-files/close-db.php');
?>