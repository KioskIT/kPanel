<!DOCTYPE HTML>

<html style="overflow-x: hidden">
	
	
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>Administration interface</title>
        
        <link href="management.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="jquery-ui.js"></script>
        <script type="text/javascript" src="management.js"></script>
        
    </head>
    
    
    <body onload="getVersions()">
    	
    	<div id="versionsList"></div>
    	
    	<div class="buttonsBar">
	    	<a href="#" class="button" id="newVersion" onclick="createNewVersion()">Create a new version</a>
    	</div>
    	
    </body>
    
 
</html>
