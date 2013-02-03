<!DOCTYPE HTML>

<html>
    
    
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel - Screen management</title>
        
        <script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="../js/jquery-ui.js"></script>
        <script type="text/javascript" src="../js/toastr.js"></script>
        <link href="../css/kiosk_configuration.css" type="text/css" rel="stylesheet" />
        <link href="../css/toastr.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="../js/kiosk_configuration.js"></script>

    </head>
    
    <body onload="populateFields('<?PHP echo $_GET["ips"]; ?>', '<?PHP echo $_GET["names"]; ?>');">
        
        <div id="cover"></div>
        
        <div id="top_bar">
        </div>
               
        <img id="logo" src=""></img>
        
        <div id="properties">
            
            <div class="property" id="name">
                <div class="label" id="name_label">Name</div>
                <input type="text" class="input" id="name_input">
            </div>
            
            <div class="property" id="description">
                <div class="label" id="description_label">Description</div>
                <input type="text" class="input" id="description_input">
            </div>
            
            <div class="property" id="category">
                <div class="label" id="category_label">Category</div>
                <input type="text" class="input" id="category_input">
            </div>
            
            <div class="property" id="video_mode">
                <div class="label" id="video_mode_label">Video mode</div>
                <input type="text" class="input" id="video_mode_input">
            </div>
            
            <div class="property" id="sync_stream">
                <div class="label" id="sync_stream_label">Sync stream</div>
                <input type="text" class="input" id="sync_stream_input">
            </div>
            
            <div class="property" id="ip">
                <div class="label" id="ip_label">IP</div>
                <input type="text" class="input" id="ip_input">
            </div>
            
            <div class="property" id="server_ip">
                <div class="label" id="server_ip_label">Server's IP</div>
                <input type="text" class="input" id="server_ip_input">
            </div>
            
        </div>               
               
        <div id="bottom_bar">
                <div class = "button" onclick = "applyChanges();">Apply changes</div>
                <div id = "ping_button" class = "button" onclick = "pingKiosks();">Ping kiosk</div>
                <div id = "reboot_button" class = "button" onclick = "rebootKiosks();">Reboot kiosk</div>
                <div class = "button" onclick = "goBack();">Back</div>
        </div>
        
    </body>
    
    
</html>