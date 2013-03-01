<!DOCTYPE HTML>

<html style="overflow-x: hidden">
	
	
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel - Content management</title>
        
        <link href="css/animations.css" type="text/css" rel="stylesheet" />
        <link href="css/contentmanagement.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/contentmanagement.js"></script>
        
    </head>
    
    
    <body onload="getVersions()">
    	
    	<div id="cover"></div>
    	
    	<div id="versionsList"></div>
    	
    	<div class="buttonsBar">
    	    
            <a href="#" class="button" id="newVersion" onclick="createNewVersion()">Create a new version</a>
            <a href="#" class="button" id="importVersion" onclick="showImportPopup()">Import version from zip</a>
            <a href="#" class="button" id="home" onclick="goHome()">Home</a>
            
    	</div>
    	
    	<div id = "popup_bg">

            <div id = "popup">
        
                <h1>Import version from zip</h1>
                
                <h2 id="uploading">Uploading..</h2>
               
                <div id="form">
                    
                    <h2>Note</h2>
                    
                    <h3>In order to successfully upload a version, the file must be a valid zip archive of the contents of the root folder of your version. The archive must contain an "index.php" file. Uploading a version with an already existing name will overwrite matching files.</h3>
                        
                    <input id="uploader" name="versionArchive" type="file" accept=".zip" />
                    
                    <div id="form_buttons_bar">
                    
                        <input class="form_button" type="button" onclick="importVersion()" value="Import version" />
                        <input class="form_button" type="button" onclick="hideImportPopup()" value="Cancel" />
                    
                    </div>
            
                </div>
                
            </div>
            
        </div>

    </body>
    
 
</html>
