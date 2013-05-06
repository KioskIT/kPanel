<?php
require('../menu/add-files/connect-db.php');
	$sql = 'SELECT id,name FROM admins WHERE username = \'' . mysql_real_escape_string($_POST['username']) . '\' AND password  = \'' . mysql_real_escape_string(md5($_POST['password'])) . '\'';
	$result = mysql_query($sql);
	echo mysql_error();
	if(mysql_num_rows($result)!=0)
	{
		
		$row = mysql_fetch_array($result);
		session_start();
		$_SESSION['id'] = $row['id'];
		$_SESSION['name'] = $row['name'];
		header('location:admin-main.php');
	}else{
		header('location:login.php?f');
	}
require('../menu/add-files/close-db.php');


?>