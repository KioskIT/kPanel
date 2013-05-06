<?php
	require('../menu/add-files/connect-db.php');
		$name = $_POST['name'];
		$bed = $_POST['bed'];
		echo $bed;
		$dob =strtotime( $_POST['year'] . '-'.$_POST['month'] .'-'. $_POST['day'] );
		$timestamp = time();
		$sql = "INSERT INTO patients(name,dob,bed_no,checkin_date) VALUES ('$name',$dob,1,$timestamp) ";
		mysql_query($sql);
		$id = mysql_insert_id();
		$sql = "UPDATE patients_beds SET patient_id = $id WHERE bed_id = $bed";
		mysql_query($sql) or die(mysql_error());
		require('../menu/add-files/close-db.php');
		session_start();
		$_SESSION['id'] = $id;
		$_SESSION['name'] = $name;
		$_SESSION['bed'] = $bed;

		header('location:main.php');
	require('../menu/add-files/close-db.php');
?>