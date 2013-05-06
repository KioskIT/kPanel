<?php
	require('../menu/add-files/connect-db.php');
	$bed = $_GET['bed'];
	$sql = "SELECT patient_id FROM patients_beds WHERE bed_id = $bed LIMIT 1";
	$result = mysql_query($sql);
	echo mysql_error();
	$row = mysql_fetch_array($result);
	if($row['patient_id']!=null)
	{
		echo $row['patient_id'];
	}else{
		echo 'false';
	}
	require('../menu/add-files/close-db.php');
?>