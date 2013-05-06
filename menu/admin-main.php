<!DOCTYPE html>
<html>
	<head> 
		<?php 
			session_start(); 
			if(!isset($_SESSION['id']))
			{
				header('location:login.php?r');
			}
			
		?>
		<link rel="stylesheet" type="text/css" href="../menu/css/css.css">
		 <script src="../menu/js/js.js" type="text/javascript"></script>
		<?php require('../menu/add-files/connect-db.php'); require('../menu/get-active-menu.php');?>
	</head>
	<body>
		<div id = 'content'>
			<div class = 'tools' onDragOver = 'invalidDrop(event)'>
				<ul>
					<li><a onClick = 'showForm()'>Add Menus</a></li>
					<li><a  onClick='displayActiveMenus()'>Active Menus</a></li>
					<li><a href = 'logout.php'>Logout</a></li>
				</ul>
			</div>
			<div class = 'pane' id= 'menu-list' style = 'width:15%' ondrop="dropOut(event,1,1,3,this)" ondragover="allowDrop(event)">
			
				<?php require('../menu/ini-menus.php');?>

			</div>
			<div class = 'pane' id = 'active-menus' style = 'display:none;width:84.82%;overflow-y:hidden'>
				<div class = 'label' style='padding:0.2%'>Active Menus</div>
				<div class = 'cycle-pane' style = 'width:10%'>
					<div class = 'header'>Day</div>
					<div class = 'day-box'>
						Monday
					</div>
					<div class = 'day-box'>
						Tuesday
					</div>
					<div class = 'day-box'>
						Wednesday
					</div>
					<div class = 'day-box'>
						Thursday
					</div>
					<div class = 'day-box'>
						Friday
					</div>
					<div class = 'day-box'>
						Saturday
					</div>
					<div class = 'day-box'>
						Sunday
					</div>
				</div>
				
				<div class = 'cycle-pane'>
					<div class = 'header'>Cycle 1 Lunch</div>
					<?php
						getCycle(1,2);
					?>
				</div>
				
				<div class = 'cycle-pane'>
					<div class = 'header'>Cycle 1 Dinner</div>
					<?php
						getCycle(1,3);
					?>
				</div>

				<div class = 'cycle-pane'>
					<div class = 'header'>Cycle 2 Lunch</div>
					<?php
						getCycle(2,2);
					?>
				</div>
				
				<div class = 'cycle-pane'>
					<div class = 'header'>Cycle 2 Dinner</div>
					<?php
						getCycle(2,3);
					?>
				</div>
				
				<div class = 'cycle-pane'>
					<div class = 'header'>Cycle 3 Lunch</div>
					<?php
						getCycle(3,2);
					?>
				</div>
				
				<div class = 'cycle-pane'>
					<div class = 'header'>Cycle 3 Dinner</div>
					<?php
						getCycle(3,3);
					?>
				</div>
			</div>
			
			<div class = 'pane'id = 'menu-items' style = 'display:block;width:84.82%;overflow-y:hidden'>

			</div>
			<div class = 'pane' id = 'footer' onDragOver = 'invalidDrop(event)' style = 'height:10%;width:100%'>
			 
			</div>
		</div>
		<div class = 'overlay' id='create-menu-overlay' style = 'display:none'>
			<div class = 'form'>
				<h1>Create New Menu</h1>
				<hr/>
				<div class = 'msgbox' id = 'create-menu-msgbox' style = 'display:none'>
					
				</div>
				<h2>Name:</h2>
				<input id = 'create-menu-name' class = 'txtbox' type = 'text' value = '' />
				<br/>
				<br/>
				<button class = 'submit-button' onClick = 'closeForm()' >Close</button>
				<button class = 'submit-button' onclick = 'createMenu()' />Create Menu</button>		
			</div>
		</div>
		
		<div  class = 'overlay' id='create-food-overlay' style = 'display:none'>
			<div class = 'form'>
				
				<h1>Add New Food</h1>
				<hr/>
				<div class = 'msgbox' id = 'add-food-msgbox' style = 'display:none;'>
				
				</div>
				<h2>Name:</h2>
				<input id = 'food-name' class = 'txtbox' type = 'text' value = '' onKeyUp = 'getFoodSuggestions(menuSelected)' />
				<div id = 'add-food-suggestion'>
				
				</div>
				<h2>Portion:</h2>
				<input id = 'portion' class = 'num-txtbox' type = 'text' value = '' />
				<h2>Calories</h2>
				<input id = 'min-calories' class = 'num-txtbox' type = 'text' value = '' /> - <input id = 'max-calories' class = 'num-txtbox' type = 'text' value = '' />
				<h2> Category </h2>
				<select class = 'drop-down-box' id = 'category'>
					<?php
						$sql = "SELECT id,name FROM categories";
						$result = mysql_query($sql);
						while($row = mysql_fetch_array($result))
						{
							$id = $row['id'];
							$name = $row['name'];
							echo "<option value = '$id'>$name</option>";
							$count++;
						}
					?>
				</select>
				<br/>
				<br/>
				<button class = 'submit-button' onClick = 'closeFoodForm()' >Close</button>
				<button class = 'submit-button' onclick = 'addFood(menuSelected)' />Add Food</button>		
			</div>
		</div>

		<div  class = 'overlay' id='edit-food-overlay' style = 'display:none'>
			<div class = 'form'>
				<h1>Edit Food</h1>
				<hr/>
				<div class = 'msgbox' id = 'edit-food-msgbox' style = 'display:none'>
				
				</div>
				<h2>Name:</h2>
				<input id = 'edit-food-name' class = 'txtbox' type = 'text' value = '' onKeyUp = 'getFoodSuggestions(menuSelected)' />
				<h2>Portion:</h2>
				<input id = 'edit-portion' class = 'num-txtbox' type = 'text' value = '' />
				<h2>Calories</h2>
				<input id = 'edit-min-calories' class = 'num-txtbox' type = 'text' value = '' /> - <input id = 'edit-max-calories' class = 'num-txtbox' type = 'text' value = '' />
				<h2> Category </h2>
				<select class = 'drop-down-box' id = 'edit-category'>
					<?php
						$sql = "SELECT id,name FROM categories";
						$result = mysql_query($sql);
						while($row = mysql_fetch_array($result))
						{
							$id = $row['id'];
							$name = $row['name'];
							echo "<option value = '$id'> $name</option>";
						}
					?>
				</select>
				<br/>
				<br/>
				<button class = 'submit-button' onClick = 'closeEditForm()'>Close</button>
				<button class = 'submit-button' onClick = 'updateFood(foodSelected)' />Update</button>		
			</div>
		</div>		
	</body>
	<?php require('../menu/add-files/close-db.php'); ?>
</html>