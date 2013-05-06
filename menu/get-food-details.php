<?php
	$id = $_GET['id'];
	require('../menu/add-files/connect-db.php');
		$sql = "SELECT * FROM food_items WHERE id = $id LIMIT 1";
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);
		$portion = $row['portion'];
		$min_calories = $row['min_calories'];
		$max_calories= $row['max_calories'];
		$min_kJoules = $row['min_kJoules'];
		$max_kJoules = $row['max_kJoules'];
		$min_protein = $row['min_protein'];
		$max_protein = $row['max_protein'];
		echo"<ul id = 'details'>
				<li>Portion: $portion</li>
				<li>Calories: $min_calories</li>
				<li>Kilo Joules: $min_kJoules</li>
				<li>Protein: $min_protein</li>
			</ul>
			";
	require('../menu/add-files/close-db.php');	

?>