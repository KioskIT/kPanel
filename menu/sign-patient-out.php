<?php
	 session_start(); 
	 $bed = $_SESSION['bed'];
	 unset($_SESSION['id']); 
	 unset($_SESSION['name']); 
	 unset($_SESSION['bed']);
	 session_unset(); 
	 session_destroy(); 
	require('../menu/add-files/connect-db.php');
		$sql = "UPDATE patients_beds SET patient_id = NULL WHERE bed_id = $bed";
		mysql_query($sql) or die(mysql_error() . $sql);
	require('../menu/add-files/close-db.php');
	 header('location:frontpage.php?bed='.$bed);
?>