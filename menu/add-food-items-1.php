<?php
		$dbhost = 'localhost'; 
		$dbusername = 'arif'; 
		$dbpasswd = 'GuyFawkes69'; 
		$database_name = 'menu'; 
		$connection = mysql_connect("$dbhost","$dbusername","$dbpasswd") 
		or die ('Couldn\'t connect to server.'); 
		$db = mysql_select_db("$database_name", $connection) 
		or die('Couldn\'t select database.');
		$day = '';
		$type = '';
		$cycle = 1;
		$lastDay = 1;
		$lastMeal = 2;
		$lastDay = 0;
		$menuID = 1;
		$timestamp = time();
		

		
		$sql = "truncate food_items;";
		mysql_query($sql);
		echo mysql_error();
		$sql = "truncate menus;";
		mysql_query($sql);
		echo mysql_error();
		
		$sql = "INSERT INTO menus(cycle,day,meal,timestamp) VALUES (1,1,2,$timestamp)";
		echo $sql;
		mysql_query($sql);
		echo mysql_error();
$handle = @fopen("menu-week-1.csv", "r");
if ($handle) {
    while (($buffer = fgets($handle, 4096)) !== false) {
		$timestamp = time();
		$items = explode('|',$buffer);
		switch($items[0])
		{
		case 'Mon Lunch':
			$day = 1;
			$meal = 2;
		break;
		case 'Mon Dinner':
			$day = 1;
			$meal = 3;		
		break;
		case 'Tues Lunch':
			$day = 2;
			$meal = 2;
		break;
		case 'Tues Dinner':
			$day = 2;
			$meal = 3;		
		break;
		case 'Wed Lunch':
			$day = 3;
			$meal = 2;
		break;
		case 'Wed Dinner':
			$day = 3;
			$meal = 3;		
		break;
		case 'Thurs Lunch':
			$day = 4;
			$meal = 2;
		break;
		case 'Thurs Dinner':
			$day = 4;
			$meal = 3;		
		break;
		case 'Friday Lunch':
			$day = 5;
			$meal = 2;
		break;
		case 'Friday Dinner':
			$day = 5;
			$meal = 3;		
		break;
		case 'Sat Lunch':
			$day = 6;
			$meal = 2;
		break;
		case 'Sat Dinner':
			$day = 6;
			$meal = 3;		
		break;
		case 'Sun Lunch':
			$day = 7;
			$meal = 2;
		break;
		case 'Sun Dinner':
			$day = 7;
			$meal = 3;		
		break;
		
		}
		echo "<br/>Day:$day<br/>Meal$meal<br/>";
			if($meal != $lastMeal && $day != $lastDay)
			{
				$lastMeal = $meal;
				$lastDay = $day;
				$sql = "INSERT INTO menus(cycle,day,meal,timestamp) VALUES ($cycle,$day,$meal,$timestamp)";
				echo '<br/>'.$sql . '<br/>';
				$result = mysql_query($sql);
				$menuID = mysql_insert_id();
				echo mysql_error();
			}
			
			$title = trim($items[1]);
			$portion=$items[2];
			$calories = lookForTwoValues($items[3]);
			$minCalories = $calories[0];
			$maxCalories = $calories[1];

			$joules = lookForTwoValues($items[4]);
			$minJoules = $joules[0];
			$maxJoules = $joules[1];	

			$protein = lookForTwoValues($items[4]);
			$minProtein = $protein[0];
			$maxProtein = $protein[1];	
			if($items[1] != '')
			{
				$sql = "INSERT INTO food_items(title,portion,min_calories,max_calories,min_kJoules,max_kJoules,min_protein,max_protein,timestamp,menu_ID)VALUES('$title','$portion',$minCalories,$maxCalories,$minJoules,$maxJoules,$minProtein,$maxProtein,$timestamp,$menuID)";
				$sql1 = $sql . '<br/>' . '<br/>';
				echo $sql1;
				mysql_query($sql);
				echo mysql_error() . '<br/>' . '<br/>';
			}
    }

    if (!feof($handle)) {
        echo "Error: unexpected fgets() fail\n";
    }
    fclose($handle);
}

mysql_close($connection);


function lookForTwoValues($string)
{
	$pos = strpos($string, '-');
	if ($pos != false) {
		$values = explode('-',$string);
		return array($values[0],$values[1]);
	} else {
		return array($string,0.0);
	}
}
?>