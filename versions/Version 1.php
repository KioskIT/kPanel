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

			<input type="hidden" name="collection" value="survey_Version 1">

			<div style="position:absolute; top:195px; left:355px; width:300px; z-index:2147483646; font-family:arial; font-size:95%; color:rgb(0, 0, 0); animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

				Sample text

			</div>

			<img alt="" src="https://localhost/kpanel/images/image_sample.png" style="position:absolute; top:384px; left:512px; width:400px; height:300px; z-index:2147483646; animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

			<iframe src="https://localhost/kpanel/images/video_sample.png" style="position:absolute; top:158px; left:268px; width:400px; height:300px; z-index:2147483646; animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

			</iframe>

			<iframe src="https://localhost/kpanel/images/video_sample.png" style="position:absolute; top:209px; left:87px; width:400px; height:300px; z-index:2147483646; animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

			</iframe>

			<a href="about:blank" style="position:absolute; top:384px; left:512px; width:300px; z-index:2147483646; font-family:arial; font-size:95%; color:rgb(0, 0, 0); animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

			Sample hyperlink

			</a>

			<div style="position:absolute; top:384px; left:512px; width:300px; z-index:2147483646; font-family:arial; font-size:95%; color:rgb(0, 0, 0); animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

				Sample text

			</div>

			<div style="position:absolute; top:384px; left:512px; width:300px; z-index:2147483646; font-family:arial; font-size:95%; color:rgb(0, 0, 0); animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

				Sample text

			</div>

			<img alt="" src="https://localhost/kpanel/images/image_sample.png" style="position:absolute; top:384px; left:512px; width:400px; height:300px; z-index:2147483646; animation:none 0 ; -o-animation:none 0 ; -moz-animation:none 0 ; -webkit-animation:none 0 ; ; ">

			</form>

			
		</div>

	</body>


</html>