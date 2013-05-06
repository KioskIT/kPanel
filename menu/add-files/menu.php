<?php
	$cycle = getCycle(1);
	$meal = $_GET['meal'];
	$day = 1;

	require('../menu/add-files/connect-db.php');
	
	function getCycle($day)
	{
		return (($day  / 8) % 3)+1;
	}
	
	function getMealTime($meal)
	{
		switch($meal)
		{
		case 2:
			return 'Lunch';
		case 3:
			return 'Dinner';
		}
	}
	function getActiveMenuID($cycle,$meal,$day)
	{
		$sql = "SELECT menu_ID FROM active_menus WHERE cycle = $cycle AND meal = $meal AND day = $day LIMIT 1";
		$result = mysql_query($sql);
		echo mysql_error();
		$row = mysql_fetch_array($result);
		return $row['menu_ID'];
	}

	
	function getCategories($activeMenuID)
	{
		//$sql = "SELECT category,name FROM food_items,categories WHERE menu_ID = $activeMenuID AND categories.id = category GROUP BY category ORDER BY name";
		$sql = "SELECT categories.id,categories.name FROM categories,food_items,menu_food WHERE categories.id=food_items.category AND menu_food.food_ID=food_items.id AND menu_ID = $activeMenuID GROUP BY category ORDER BY name";
		$result  = mysql_query($sql);
		echo mysql_error();
		while($row = mysql_fetch_array($result))
		{
 			$id = $row['id'];
			$category = $row['name'];
			echo "
					<button class = 'food-item' onClick = 'getFoodItems($activeMenuID,$id)'>
						$category
					</button>
				";			
		}
	}

	$mealName = getMealTime($meal);
	
	$orders = $_GET['orders'];

	function getCartFoodTitles($orders)
	{
		$foodIDs = explode(',',$orders);
		$titles = '';
		for($i=0;$i<count($foodIDs);$i++)
		{
			$id = $foodIDs[$i];
			$sql = "SELECT title FROM food_items WHERE id=$id";
			$result = mysql_query($sql);
			$row = mysql_fetch_array($result);
			$titles = $titles . $row['title'] . ',';
		}
		return rtrim($titles,',');
	}
	
	if(isSet($_GET['orders']) && $_GET['orders']!=null)
	{
		$titles = getCartFoodTitles($orders);
		$iniCart = "iniCart('$titles','$orders')";
	}
?>