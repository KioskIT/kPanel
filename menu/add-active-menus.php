<?php
	require('../menu/add-files/connect-db.php'); 
		for($cycle=1;$cycle<=3;$cycle++)
		{
			for($day=1;$day<=7;$day++)
			{
				for($meal=2;$meal<=3;$meal++)
				{
					$sql = "INSERT INTO active_menus(cycle,day,meal) VALUES ($cycle,$day,$meal)";
					mysql_query($sql);
				}
			}
		}
	require('../menu/add-files/close-db.php'); 
?>