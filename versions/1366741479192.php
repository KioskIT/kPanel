<!DOCTYPE HTML>

<html>


	<head>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<title>kioskIt</title>

		<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>

		<script type="text/javascript" src="js/query_announcements.js"></script>

		<script type="text/javascript" src="../galleria/galleria-1.2.8.js"></script>

		<link href="css/animations.css" type="text/css" rel="stylesheet" />

		<link href="css/global.css" type="text/css" rel="stylesheet" />

	</head>

	<body>

		<script type="text/javascript">var server_ip = "https://<?PHP echo $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"]; ?>";</script>

		<div id="tickertape" onclick="hideAnnouncement('tickertape')"></div>

		<div id="modalmessage" onclick="hideAnnouncement('modalmessage')"></div>

		<div id="container" style="position:relative; color:rgb(255, 255, 255); margin-left:auto; margin-right:auto; width:1024px; ;">

			<form action="../tools/submit_survey.php">

			<input type="hidden" name="collection" value="survey_1366741479192">

			<div style="position:absolute; top:83px; left:375px; width:300px; z-index:2147483646; font-family:arial; font-size:500%; color:rgb(0, 0, 0); animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

				AMAZING title

			</div>

			<div style="position:absolute; top:348px; left:409px; width:300px; z-index:2147483646; font-family:arial; font-size:95%; color:rgb(0, 0, 0); animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

				<div>Question 1?</div>

				<input type="text" name="Question 1?">

			</div>

			<input type="submit" value="Sample submit button" style="position:absolute; top:492px; left:447px; height:; width:200px; z-index:2147483646; font-family:arial; font-size:95%; color:rgb(0, 0, 0); animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

			</form>

			
		</div>

	</body>


</html>