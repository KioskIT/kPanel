<!DOCTYPE HTML>

<html>
    
    
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel - Screen management</title>
        
        <link href="../css/animations.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="../js/jquery-ui.js"></script>
        <script type="text/javascript" src="../js/toastr.js"></script>
        <link href="../css/kiosk_configuration.css" type="text/css" rel="stylesheet" />
        <link href="../css/toastr.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="../js/kiosk_configuration.js"></script>

    </head>
    
    <body onload="populateFields('<?PHP echo $_GET["ips"]; ?>', '<?PHP echo urlencode($_GET["names"]); ?>');">
        
        <div id="cover"></div>
        
        <div id="top_bar">
        </div>
               
        <img id="logo" src="" alt="Logo">
        
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
            
            <div class="property" id="version">
                <div class="label" id="version_label">Version</div>
                <select class="input" id="version_input">
                </select>
            </div>
            
            <div class="property" id="video_mode">
                <div class="label" id="video_mode_label">Video mode</div>
                <!--<input type="text" class="input" id="video_mode_input">-->
                <select class="input" id="video_mode_input">
                
                    <option value="CEA 1">CEA 1 (VGA   )</option>
                    <option value="CEA 2">CEA 2 (480p 60Hz  )</option>
                    <option value="CEA 3">CEA 3 (480p 60Hz H )</option>
                    <option value="CEA 4">CEA 4 (720p 60Hz  )</option>
                    <option value="CEA 5">CEA 5 (1080i 60Hz  )</option>
                    <option value="CEA 6">CEA 6 (480i 60Hz  )</option>
                    <option value="CEA 7">CEA 7 (480i 60Hz H )</option>
                    <option value="CEA 8">CEA 8 (240p 60Hz  )</option>
                    <option value="CEA 9">CEA 9 (240p 60Hz H )</option>
                    <option value="CEA 10">CEA 10 (480i 60Hz 4x )</option>
                    <option value="CEA 11">CEA 11 (480i 60Hz 4x H)</option>
                    <option value="CEA 12">CEA 12 (240p 60Hz 4x )</option>
                    <option value="CEA 13">CEA 13 (240p 60Hz 4x H)</option>
                    <option value="CEA 14">CEA 14 (480p 60Hz 2x )</option>
                    <option value="CEA 15">CEA 15 (480p 60Hz 2x H)</option>
                    <option value="CEA 16">CEA 16 (1080p 60Hz  )</option>
                    <option value="CEA 17">CEA 17 (576p 50Hz  )</option>
                    <option value="CEA 18">CEA 18 (576p 50Hz H )</option>
                    <option value="CEA 19">CEA 19 (720p 50Hz  )</option>
                    <option value="CEA 20">CEA 20 (1080i 50Hz  )</option>
                    <option value="CEA 21">CEA 21 (576i 50Hz  )</option>
                    <option value="CEA 22">CEA 22 (576i 50Hz H )</option>
                    <option value="CEA 23">CEA 23 (288p 50Hz  )</option>
                    <option value="CEA 24">CEA 24 (288p 50Hz H )</option>
                    <option value="CEA 25">CEA 25 (576i 50Hz 4x )</option>
                    <option value="CEA 26">CEA 26 (576i 50Hz 4x H)</option>
                    <option value="CEA 27">CEA 27 (288p 50Hz 4x )</option>
                    <option value="CEA 28">CEA 28 (288p 50Hz 4x H)</option>
                    <option value="CEA 29">CEA 29 (576p 50Hz 2x )</option>
                    <option value="CEA 30">CEA 30 (576p 50Hz 2x H)</option>
                    <option value="CEA 31">CEA 31 (1080p 50Hz  )</option>
                    <option value="CEA 32">CEA 32 (1080p 24Hz  )</option>
                    <option value="CEA 33">CEA 33 (1080p 25Hz  )</option>
                    <option value="CEA 34">CEA 34 (1080p 30Hz  )</option>
                    <option value="CEA 35">CEA 35 (480p 60Hz 4x )</option>
                    <option value="CEA 36">CEA 36 (480p 60Hz 4xH )</option>
                    <option value="CEA 37">CEA 37 (576p 50Hz 4x )</option>
                    <option value="CEA 38">CEA 38 (576p 50Hz 4x H)</option>
                    <option value="CEA 39">CEA 39 (1080i 50Hz reduced blanking)</option>
                    <option value="CEA 40">CEA 40 (1080i 100Hz  )</option>
                    <option value="CEA 41">CEA 41 (720p 100Hz  )</option>
                    <option value="CEA 42">CEA 42 (576p 100Hz  )</option>
                    <option value="CEA 43">CEA 43 (576p 100Hz H )</option>
                    <option value="CEA 44">CEA 44 (576i 100Hz  )</option>
                    <option value="CEA 45">CEA 45 (576i 100Hz H )</option>
                    <option value="CEA 46">CEA 46 (1080i 120Hz  )</option>
                    <option value="CEA 47">CEA 47 (720p 120Hz  )</option>
                    <option value="CEA 48">CEA 48 (480p 120Hz  )</option>
                    <option value="CEA 49">CEA 49 (480p 120Hz H )</option>
                    <option value="CEA 50">CEA 50 (480i 120Hz  )</option>
                    <option value="CEA 51">CEA 51 (480i 120Hz H )</option>
                    <option value="CEA 52">CEA 52 (576p 200Hz  )</option>
                    <option value="CEA 53">CEA 53 (576p 200Hz H )</option>
                    <option value="CEA 54">CEA 54 (576i 200Hz  )</option>
                    <option value="CEA 55">CEA 55 (576i 200Hz H )</option>
                    <option value="CEA 56">CEA 56 (480p 240Hz  )</option>
                    <option value="CEA 57">CEA 57 (480p 240Hz H )</option>
                    <option value="CEA 58">CEA 58 (480i 240Hz  )</option>
                    <option value="CEA 59">CEA 59 (480i 240Hz H )</option>


                    <option value="DMT 1">DMT 1 (640x350 85Hz  )</option>
                    <option value="DMT 2">DMT 2 (640x400 85Hz  )</option>
                    <option value="DMT 3">DMT 3 (720x400 85Hz  )</option>
                    <option value="DMT 4">DMT 4 (640x480 60Hz  )</option>
                    <option value="DMT 5">DMT 5 (640x480 72Hz  )</option>
                    <option value="DMT 6">DMT 6 (640x480 75Hz  )</option>
                    <option value="DMT 7">DMT 7 (640x480 85Hz  )</option>
                    <option value="DMT 8">DMT 8 (800x600 56Hz  )</option>
                    <option value="DMT 9">DMT 9 (800x600 60Hz  )</option>
                    <option value="DMT 10">DMT 10 (800x600 72Hz  )</option>
                    <option value="DMT 11">DMT 11 (800x600 75Hz  )</option>
                    <option value="DMT 12">DMT 12 (800x600 85Hz  )</option>
                    <option value="DMT 13">DMT 13 (800x600 120Hz  )</option>
                    <option value="DMT 14">DMT 14 (848x480 60Hz  )</option>
                    <option value="DMT 15">DMT 15 (1024x768 43Hz DO NOT USE)</option>
                    <option value="DMT 16">DMT 16 (1024x768 60Hz  )</option>
                    <option value="DMT 17">DMT 17 (1024x768 70Hz  )</option>
                    <option value="DMT 18">DMT 18 (1024x768 75Hz  )</option>
                    <option value="DMT 19">DMT 19 (1024x768 85Hz  )</option>
                    <option value="DMT 20">DMT 20 (1024x768 120Hz  )</option>
                    <option value="DMT 21">DMT 21 (1152x864 75Hz  )</option>
                    <option value="DMT 22">DMT 22 (1280x768 reduced blanking )</option>
                    <option value="DMT 23">DMT 23 (1280x768 60Hz  )</option>
                    <option value="DMT 24">DMT 24 (1280x768 75Hz  )</option>
                    <option value="DMT 25">DMT 25 (1280x768 85Hz  )</option>
                    <option value="DMT 26">DMT 26 (1280x768 120Hz reduced blanking)</option>
                    <option value="DMT 27">DMT 27 (1280x800 reduced blanking )</option>
                    <option value="DMT 28">DMT 28 (1280x800 60Hz  )</option>
                    <option value="DMT 29">DMT 29 (1280x800 75Hz  )</option>
                    <option value="DMT 30">DMT 30 (1280x800 85Hz  )</option>
                    <option value="DMT 31">DMT 31 (1280x800 120Hz reduced blanking)</option>
                    <option value="DMT 32">DMT 32 (1280x960 60Hz  )</option>
                    <option value="DMT 33">DMT 33 (1280x960 85Hz  )</option>
                    <option value="DMT 34">DMT 34 (1280x960 120Hz reduced blanking)</option>
                    <option value="DMT 35">DMT 35 (1280x1024 60Hz  )</option>
                    <option value="DMT 36">DMT 36 (1280x1024 75Hz  )</option>
                    <option value="DMT 37">DMT 37 (1280x1024 85Hz  )</option>
                    <option value="DMT 38">DMT 38 (1280x1024 120Hz reduced blanking)</option>
                    <option value="DMT 39">DMT 39 (1360x768 60Hz  )</option>
                    <option value="DMT 40">DMT 40 (1360x768 120Hz reduced blanking)</option>
                    <option value="DMT 41">DMT 41 (1400x1050 reduced blanking )</option>
                    <option value="DMT 42">DMT 42 (1400x1050 60Hz  )</option>
                    <option value="DMT 43">DMT 43 (1400x1050 75Hz  )</option>
                    <option value="DMT 44">DMT 44 (1400x1050 85Hz  )</option>
                    <option value="DMT 45">DMT 45 (1400x1050 120Hz reduced blanking)</option>
                    <option value="DMT 46">DMT 46 (1440x900 reduced blanking )</option>
                    <option value="DMT 47">DMT 47 (1440x900 60Hz  )</option>
                    <option value="DMT 48">DMT 48 (1440x900 75Hz  )</option>
                    <option value="DMT 49">DMT 49 (1440x900 85Hz  )</option>
                    <option value="DMT 50">DMT 50 (1440x900 120Hz reduced blanking)</option>
                    <option value="DMT 51">DMT 51 (1600x1200 60Hz  )</option>
                    <option value="DMT 52">DMT 52 (1600x1200 65Hz  )</option>
                    <option value="DMT 53">DMT 53 (1600x1200 70Hz  )</option>
                    <option value="DMT 54">DMT 54 (1600x1200 75Hz  )</option>
                    <option value="DMT 55">DMT 55 (1600x1200 85Hz  )</option>
                    <option value="DMT 56">DMT 56 (1600x1200 120Hz reduced blanking)</option>
                    <option value="DMT 57">DMT 57 (1680x1050 reduced blanking )</option>
                    <option value="DMT 58">DMT 58 (1680x1050 60Hz  )</option>
                    <option value="DMT 59">DMT 59 (1680x1050 75Hz  )</option>
                    <option value="DMT 60">DMT 60 (1680x1050 85Hz  )</option>
                    <option value="DMT 61">DMT 61 (1680x1050 120Hz reduced blanking)</option>
                    <option value="DMT 62">DMT 62 (1792x1344 60Hz  )</option>
                    <option value="DMT 63">DMT 63 (1792x1344 75Hz  )</option>
                    <option value="DMT 64">DMT 64 (1792x1344 120Hz reduced blanking)</option>
                    <option value="DMT 65">DMT 65 (1856x1392 60Hz  )</option>
                    <option value="DMT 66">DMT 66 (1856x1392 75Hz  )</option>
                    <option value="DMT 67">DMT 67 (1856x1392 120Hz reduced blanking)</option>
                    <option value="DMT 68">DMT 68 (1920x1200 reduced blanking )</option>
                    <option value="DMT 69">DMT 69 (1920x1200 60Hz  )</option>
                    <option value="DMT 70">DMT 70 (1920x1200 75Hz  )</option>
                    <option value="DMT 71">DMT 71 (1920x1200 85Hz  )</option>
                    <option value="DMT 72">DMT 72 (1920x1200 120Hz reduced blanking)</option>
                    <option value="DMT 73">DMT 73 (1920x1440 60Hz  )</option>
                    <option value="DMT 74">DMT 74 (1920x1440 75Hz  )</option>
                    <option value="DMT 75">DMT 75 (1920x1440 120Hz reduced blanking)</option>
                    <option value="DMT 76">DMT 76 (2560x1600 reduced blanking )</option>
                    <option value="DMT 77">DMT 77 (2560x1600 60Hz  )</option>
                    <option value="DMT 78">DMT 78 (2560x1600 75Hz  )</option>
                    <option value="DMT 79">DMT 79 (2560x1600 85Hz  )</option>
                    <option value="DMT 80">DMT 80 (2560x1600 120Hz reduced blanking)</option>
                    <option value="DMT 81">DMT 81 (1366x768 60Hz  )</option>
                    <option value="DMT 82">DMT 82 (1080p 60Hz  )</option>
                    <option value="DMT 83">DMT 83 (1600x900 reduced blanking )</option>
                    <option value="DMT 84">DMT 84 (2048x1152 reduced blanking )</option>
                    <option value="DMT 85">DMT 85 (720p 60Hz  )</option>
                    <option value="DMT 86">DMT 86 (1366x768 reduced blanking )</option>
                    
                </select>
            </div>
            
            <div class="property" id="sync_version">
                <div class="label" id="sync_version_label">Sync stream</div>
                <input type="text" class="input" id="sync_version_input">
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