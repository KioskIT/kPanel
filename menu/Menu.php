<!DOCTYPE html>
<html>
	<head>
		<?php require('../menu/add-files/menu.php'); ?>
		<link rel="stylesheet" type="text/css" href="../menu/css/menu.css">
		<title>Menu</title>
		<script src="../menu/js/menu.js" type="text/javascript"></script>
	</head>
	<body onLoad = "<?php echo $iniCart ?>">
		<div id = 'tools'>
			<a class = 'button' href = 'main.php' >BACK</a>
			<a class = 'button' href = 'skip-meal.php?meal=<?php echo $meal ?>&redirect=true' >SKIP <?php echo strtoupper($mealName)?></a>
		</div>
		<div  id = 'categories' class = 'pane' style ='width:15%'>
			<div class = 'label'>Categories</div>
			<?php
				
				$activeMenuID = getActiveMenuID($cycle,$meal,$day);
				getCategories($activeMenuID);
			?>
		</div>
		<div class = 'pane' id = 'list-food'>
			<div class = 'label' style = 'padding:0.2%'>Food</div>	
		</div>
		<div class = 'pane' id = 'cart'>
			<div class = 'label' style = 'padding:0.2%'>Cart <i>(Click to Remove)</i></div>	
		</div>
		<div class = 'pane' id = 'footer' style = ''>
	
		</div>
		<div class = 'pane' id ='place-order'>
			<button style = 'height:100%;width:100%;font-weight:bold;font-size:2.5em;margin-bottom:1%' onClick = 'placeOrder(<?php echo $meal ?>)'>PLACE ORDER</button>
		</div>
	</body>
</html>
<?php require('../menu/add-files/close-db.php'); ?>	