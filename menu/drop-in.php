<?php
	require('../menu/add-files/connect-db.php');
	$id = $_GET['id'];
	$cycle = $_GET['cycle'];
	$day = $_GET['day'];
	$meal = $_GET['meal'];
	
	
	//get Active Menu ID
		$sql = "SELECT id,menu_ID FROM active_menus WHERE cycle = $cycle AND day = $day AND meal = $meal";
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);
		$activeMenuID = $row['id'];
		$menuID = $row['menu_ID'];
	if($menuID == '')
	{
	//Get Name and Timestamp
			$sql = "SELECT name,timestamp FROM menus WHERE id = $id";
			$result = mysql_query($sql);
			$row = mysql_fetch_array($result);
			$name = $row['name'];
			$timestamp = date('d M Y',$row['timestamp']);
		
	//Check if menu is already active
			$sql = "SELECT id FROM active_menus WHERE menu_ID = $id LIMIT 1";
			$result = mysql_query($sql);
			
			if(mysql_num_rows($result)==0)
			{
				//Draw button
				$sql = "UPDATE active_menus SET menu_ID = $id WHERE id = $activeMenuID";
				mysql_query($sql);
				echo mysql_error();
			}else{
				$row = mysql_fetch_array($result);
				$oldID = $row['id'];
				$sql = "UPDATE  active_menus SET menu_ID = NULL WHERE id = $oldID";
				mysql_query($sql);
				
				$sql = "UPDATE active_menus SET menu_ID = $id WHERE id = $activeMenuID";
				mysql_query($sql);
			}
			
			//Draw button
				echo 
					"
						<div id = '$id' class = 'menu-button' draggable='true' ondragstart='drag(event)'>
							<div class = 'menu-name' style = 'font-size:1.5em'>$name</div>
							<div class = 'menu-timestamp'>$timestamp</div>
						</div>
					";	
	}else{
		echo 'false';
	}
	require('../menu/add-files/close-db.php'); 
?>