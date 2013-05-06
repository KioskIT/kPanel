<?php

		$dbhost = 'localhost'; 
		$dbusername = 'arif'; 
		$dbpasswd = 'GuyFawkes69'; 
		$database_name = 'menu'; 
		$connection = mysql_connect("$dbhost","$dbusername","$dbpasswd") 
		or die ('Couldn\'t connect to server.'); 
		$db = mysql_select_db("$database_name", $connection) 
		or die('Couldn\'t select database.');
?>