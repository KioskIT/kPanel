<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../menu/css/frontpage.css">
	</head>
	<script>
		function startSystem(bed)
		{
			var xmlhttp=createXMLHTTP();
			xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					response=xmlhttp.responseText;
					if(response!='false')
					{
						window.location.replace('ini-active-session.php?patientID='+response+'&bed='+bed);
					}else{
						window.location.replace('main.php?bed='+bed);
					}
				}
			}
			
			xmlhttp.open("GET","check-bed-status.php?bed="+bed+"&i=" + Math.random(),true);
			xmlhttp.send();
		}
		
		function createXMLHTTP()
		{
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			return xmlhttp;
		}
	</script>
	<body>
		<div id = 'content' onClick = 'startSystem(<?php echo $_GET['bed'] ?>)'>
			CLICK ANYWHERE
			<br/>
			ON
			<br/>
			THE SCREEN 
			<br/>
			TO
			<br/>
			START
		</div>
	</body>
</html>