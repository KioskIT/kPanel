<?php
	$id = $_GET['id'];
	require('../menu/add-files/connect-db.php'); 
	$sql = "select name,timestamp FROM menus WHERE id = $id";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$name = $row['name'];
	$timestamp = $row['timestamp'];
	echo "
			<div class = 'menu-name' style = 'font-size:1.5em'>$name</div>
			<div class = 'menu-timestamp'>$timestamp</div>
		";
	$sql = "UPDATE active_menus SET menu_ID = NULL WHERE menu_ID = $id";
	$result = mysql_query($sql);
	require('../menu/add-files/close-db.php');
?>