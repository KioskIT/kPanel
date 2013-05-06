<?php
require('../menu/add-files/connect-db.php');
$token = $_GET['token'];
$sql = "SELECT id FROM tokens WHERE token = $token";
$result = mysql_query($sql) or die($sql);
if(mysql_num_rows($result)!=0){
	echo 'true';
}else{
	echo 'false';
}
require('../menu/add-files/close-db.php');

?>