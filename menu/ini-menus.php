<div class = 'label'>Inactive Menus</div>
<?php
	$sql = "SELECT menu_ID FROM active_menus WHERE menu_ID IS NOT NULL";
	$result = mysql_query($sql);
	if(mysql_num_rows($result)==0)
	{
		$condition = '';
	}else{
		$condition = 'WHERE';
		$count = 0;
		while($row = mysql_fetch_array($result))
		{
			if($count == 0)
			{
				$condition	= $condition . ' id !=' . $row['menu_ID'];
				$count = -1;
			}else{
				$condition	= $condition . ' AND id !=' . $row['menu_ID'];
			}
		}
	}
					
	$sql = "SELECT id,name,timestamp  FROM menus $condition ORDER BY timestamp DESC";

	$result = mysql_query($sql);
	echo mysql_error();
	while($row = mysql_fetch_array($result))
	{
		$id = $row['id'];
		$name = $row['name'];
		$timestamp = date('d M Y',$row['timestamp']);
		echo 
			"
				<div id = '$id' class = 'menu-button' draggable='true' ondragstart='drag(event)' onClick = 'getFoodItems($id);menuSelected=$id'>
					<div class = 'menu-name' id = 'menu-name-$id' style = 'font-size:1.5em'>$name</div>
					<div class = 'menu-timestamp'>$timestamp</div>
				</div>
			";
	}
?>
<div id = 'bin' style = 'position:absolute;height:10%;bottom:0;background:red;width:100%;display:none;color:white;text-align:center;font-weight:bold;font-size:1.5em'  ondrop="dropBin(event,this)" ondragover="allowDropForBin(event)" ondragEnter ='this.style.background="black"' ondragLeave='this.style.background="red"'>
	Drop Menu Here to Delete
</div>