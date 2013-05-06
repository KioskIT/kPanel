<?php
	$id = $_GET['id'];
	require('../menu/add-files/connect-db.php');
		$sql = "SELECT * FROM orders WHERE patient_ID = $patient_ID AND";
	require('../menu/add-files/close-db.php');	

?>