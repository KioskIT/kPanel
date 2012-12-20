<!DOCTYPE HTML>

<html style="overflow-x: hidden">
	
	
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel - Content management</title>
        
        <link href="css/contentmanagement.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/contentmanagement.js"></script>
        
    </head>
    
    
    <body onload="getVersions()">
    	
    	<div id="versionsList"></div>
    	
    	<div class="buttonsBar">
            <a href="#" class="button" id="newVersion" onclick="createNewVersion()">Create a new version</a>
            <a href="#" class="button" id="home" onclick="goHome()">Home</a>
    	</div>
    	
    </body>
    
 
</html>
