<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="../menu/css/admin-login.css">
</head>

<body>
<div class = 'overlay'>
	<div class = 'form'>
		<h1>Hospital Menu Management</h1>
		<hr/>
		<form method = 'POST' action = 'proc-login.php'>
			<?php
				if(isset($_GET['f']))
				{
					echo '<p>Incorrect login details</p>';
				}
				if(isSet($_GET['r']))
				{
					echo '<p> Forbidden from accessing this content </p>';
				}
			?>
			<h2>Name</h2>
			<input class = 'txtbox' type = 'text' name = 'username' value = '' />
			<h2>Password</h2>
			<input  class = 'txtbox' type = 'password' name  = 'password' value = '' />
			<br/>
			<input class = 'submit-button' type = 'submit' value = 'submit' />
		</form>
	</div>
</div>
</body>


</html>