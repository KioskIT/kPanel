<?php
require('../menu/add-files/connect-db.php'); 
	$partialFoodName = $_GET['name'];
	$menuID  = $_GET['id'];
	$sql = "Select food_items.id,title FROM food_items,menu_food WHERE menu_food.food_ID = food_items.id AND title LIKE '%$partialFoodName%' AND menu_ID !=$menuID";;
	$result = mysql_query($sql);
	echo mysql_error();
	if(mysql_num_rows($result)!=0)
	{
		while($row=mysql_fetch_array($result))
		{
			$foodID = $row['id'];
			echo  "<div class = 'suggested-food-item'  onClick = 'addSuggestedFood(this,$menuID,$foodID)'>".$row['title'].'</div>';
		}
	}else{
		echo '';
	}
require('../menu/add-files/close-db.php'); 
?>