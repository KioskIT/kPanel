<?php
require('../menu/add-files/connect-db.php'); 
	$sql = "Select id,title,menu_ID FROM food_items";
	$result = mysql_query($sql);
	while($row=mysql_fetch_array($result))
	{
		$menuID = $row['menu_ID'];
		$title = $row['title'];
		$foodID = $row['id'];
		
		$sql2= "INSERT INTO menu_food(menu_ID,food_ID) VALUES($menuID,$foodID)";
		$result2 = mysql_query($sql2);
		echo mysql_error();
	}
require('../menu/add-files/close-db.php'); 
?>