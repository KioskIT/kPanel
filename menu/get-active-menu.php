<?php
	function getActiveMenu($cycle,$day,$meal)
	{
		$sql = "SELECT menus.id,name,timestamp FROM menus,active_menus WHERE menus.id = active_menus.menu_ID AND cycle = $cycle AND meal = $meal AND day = $day";
		$result = mysql_query($sql);
		echo mysql_error();
		if(mysql_num_rows($result)!=0)
		{
			$row = mysql_fetch_array($result);
			$name = $row['name'];
			$id = $row['id'];
			$timestamp = date('d M Y',$row['timestamp']);	
			echo "
				<div id = '$id' class = 'menu-button' draggable='true' ondragstart='drag(event)' onClick = 'getFoodItems($id);menuSelected=$id'>
					<div class = 'menu-name' style = 'font-size:1.5em'>$name</div>
					<div class = 'menu-timestamp'>$timestamp</div>
				</div>
			";
	
		}
	}
	function getCycle($cycle,$meal)
	{
		for($i=1;$i<=7;$i++)
		{
			$day = getDay($i);
			echo 
				"
					<div class = 'box'  >
						<!--<div class = 'sub-header' >$day</div>-->
						<div class = 'box-content' ondrop='dropIn(event,$cycle,$i,$meal,this)' ondragover='allowDrop(event)' ondragover='allowDropForBin(event)' ondragEnter ='this.style.background=\"black\"' ondragLeave='this.style.background=\"white\"'>
				";
						getActiveMenu($cycle,$i,$meal);
			echo
				"
						</div>
					</div>
				";
		}
	}
	
	
	function getDay($i)
	{
		switch($i)
		{
			case 1:
				return 'Monday';
			break;
			case 2:
				return 'Tuesday';
			break;
			case 3:
				return 'Wednesday';
			break;
			case 4:
				return 'Thursday';
			break;
			case 5:
				return 'Friday';
			break;
			case 6:
				return 'Saturday';
			break;
			case 7:
				return 'Sunday';
			break;
		}
	}
	
	
?>