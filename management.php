<!DOCTYPE HTML>

<html style="overflow-x: hidden">
	
	
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>Administration interface</title>
        
        <link href="management.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="management.js"></script>
        
    </head>
    
    
    <body onload="populateVersionsList()">
    	
    	<?PHP
           $handle = opendir("versions");
           
           // Skip . ..
           $entry = readdir($handle);
           $entry = readdir($handle);
           
           $versionsList = "";
           while (false !== ($entry = readdir($handle)))
           {
               $versionsList .= $entry . ":";
           }
           
           setcookie("versions_list", $versionsList);
    	?>
    	
    	<div id="versionsList"></div>
    	
    	<div class="buttonsBar">
	    	<a href="#" class="button" id="newVersion" onclick="createNewVersion()">New version</a>
	    	<a href="#" class="button" id="deleteVersion" onclick="removeVersion()">Delete version</a>
    	</div>
    	
    </body>
    
 
</html>
