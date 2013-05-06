<?php
	require('../menu/add-files/connect-db.php'); 
	$id = $_GET['id'];
	$sql = "DELETE FROM menus WHERE id = $id";
	mysql_query($sql);
	//check if it is active
	$sql = "SELECT id FROM active_menus WHERE menu_ID = $id";
	$result = mysql_query($sql);
	if(mysql_num_rows($result) != 0)
	{
		$sql = "UPDATE active_menus SET menu_ID = NULL WHERE menu_ID = $id";
		mysql_query($sql);
	} 
	require('../menu/add-files/close-db.php'); 
?>