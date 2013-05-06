<?php
	$id = $_GET['id'];
?>
<div class = 'label' style = 'padding:0.15%'>Menu Items</div>
<div class = 'sub-tools'>
	<ul>
		<li><a onClick = 'showFoodForm()'>Add Food Item</a></li>
	</ul>
</div>

<div id = 'menu-items-msgbox'>

</div>	
	
<div id = 'menu-details-form'>
	Menu Details: <input type = 'text' id = 'txtbox-edit-menu-name' value = '' /><input class = 'button' type = 'button' value = 'Update' onClick = 'updateMenu(<?php echo $id  ?>)' />
</div>
<div class = 'pane' style = 'height:80%;width:100%'>	
	<?php
	require('../menu/add-files/connect-db.php'); 
		$sql = "SELECT menu_food.id,title,portion FROM food_items,menu_food WHERE menu_food.menu_ID = $id AND  menu_food.food_ID = food_items.id";
		$result = mysql_query($sql);
		echo mysql_error();
		$color1='#CEFFCD';
		$color2='FFFFFF';
		$count = 2;
		while($row = mysql_fetch_array($result))
		{
			$id = $row['id'];
			$title = $row['title'];
			$portion = $row['portion'];
			if($count%2==0)
			{
				$bgColor = '#CEFFCD';
			}else{
				$bgColor = '#FFFFFF';
			}
			echo 
				"
					<div id = 'food-item-$id' class = 'food-items' style = 'background:$bgColor'>
						<span id = 'food-item-name-$id'>$title</span><div class = 'food-button' onClick = 'deleteItem($id)'>Delete</div><div class = 'food-button' onClick = 'showEditForm($id);foodSelected=$id'>Edit</div>
					</div>
				";
			$count++;
		}
	require('../menu/add-files/close-db.php');
	?>
</div>