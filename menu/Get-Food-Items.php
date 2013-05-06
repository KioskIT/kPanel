<div class = 'label' style='padding:0.2%'>Food</div>	
<?php

	require('../menu/add-files/connect-db.php');
	function getFoodItems($activeMenuID,$category)
	{
		$orders = explode(',',$_GET['orders']);
		$sql = "SELECT food_items.id,title FROM food_items,menu_food WHERE menu_food.food_ID = food_items.id AND menu_ID = $activeMenuID AND category = $category";
		$result = mysql_query($sql);
		echo mysql_error();
		while($row = mysql_fetch_array($result))
		{
			$id = $row['id'];
			$title = $row['title'];
			if(in_array($id,$orders))
			{
				$border = '3px solid red';
			}else{
				$border = '3px solid black';
			}
			echo "
					<button class = 'food-item' id = 'food_$id'  onDblClick = 'removeAvailableFood($id);' onClick = 'addOrderedFood($id)' style = 'border:$border;float:left;width:30%;height:30%;margin-left:1%;word-wrap:break-word;'>
						<div id = 'food-item-title-$id'>$title</div>
					</button>
				";
		}
		
	}
	
	getFoodItems($_GET['menuID'],$_GET['category']);
	require('../menu/add-files/close-db.php');		
?>