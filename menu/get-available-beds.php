<?php
require('../menu/add-files/connect-db.php');
	$currentBed = $_GET['currentBed'];
	$sql = "SELECT bed_no,floor FROM patients_beds,beds WHERE patients_beds.bed_id = beds.bed_no AND bed_no != $currentBed AND patient_id IS NULL";
	$result = mysql_query($sql);
	$error = mysql_error();
	echo "<option value = 'selected'>Available Beds</option>";
	while($row = mysql_fetch_array($result))
	{
		$bedNo = $row['bed_no'];
		$floor = $row['floor'];
		echo "<option value = '$bedNo'>Bed: $bedNo Floor:$floor </option>";
	}
require('../menu/add-files/close-db.php');
?>