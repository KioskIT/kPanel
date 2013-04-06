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

			
		</div>

	</body>


</html>