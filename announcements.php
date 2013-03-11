<!DOCTYPE HTML>

<html style="overflow-x:hidden">
     
     
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

        <title>Announcements</title>
        
        <link rel="stylesheet" type="text/css" href="css/animations.css" />        
        <link rel="stylesheet" type="text/css" href="css/announcements.css" />       
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script> 
        <script type="text/javascript" src="js/announcements.js"></script>
      
	</head>

    
    <body>
   
        <div id="top_bar">
                
            <div class="button" onclick="selectAll();">Select all</div>
            <div class="button" onclick="deselectAll();">Deselect all</div>
            <div class="button" onclick="deleteSelected();">Delete selected</div>

        </div>
   
        <div id="bottom_bar">
        
            <div class="button" onclick="showPopup();">Create announcement</div>           
            <div class="button" onclick="window.location = 'index.php';">Home</div>

        </div>
        
        <div id="announcements">
            <?PHP
                require("tools/get_announcements.php");
            ?>
        </div>  
       
        <div id = "popup_bg">

            <div id = "popup">

                <h1 id="popup_title">New announcement</h1>
               
                <div id="form">
                    
                    <h2>Type of Message</h2>
                    
                    <select id="type_selector" class="field" name="">
                        <option value="Ticker-Tape">Ticker-Tape</option>
                        <option value="Modal Message">Modal Message</option>
                    </select>                    
                    
                    <h2>Message</h2>
                    
                    <input id="message_box" class="field" type="text" />
                    
                    
                    <h2>Schedule</h2>
                    
                    <h3>From</h3>
                    
                    <input id="from_date" class="field" type="date" />
                    
                    <h3>To</h3>
                    
                    <input id="indefinitely" type="radio" name="type" value="0" checked onclick="hideToDate();"/>
                    <span class="radio_label">Indefinitely</span>
                    <input id="period" type="radio" name="type" value="1" onclick="showToDate();"/>
                    <span class="radio_label">Period</span> <br/>
                    
                    <input id="to_date" class="field" type="date" />
                    
                    
                    <h2>Colors</h2>
                
                    <div id="backcolor">

                        <h3 id="backcolor_label">Backcolor</h3>
                        <input type="color" id="backcolor_value" class="color" />
                        
                    </div>
                    
                    <div id="forecolor">
                    
                        <h3 id="forecolor_label">Forecolor</h3>                
                        <input type="color" id="forecolor_value" class="color" />
                    
                    </div>
                    
                    
                    <div id="form_buttons_bar">
                    
                        <input class="form_button" type="button" value="Add announcement" id="popup_submit_button" onClick="addAnnouncement();" />
                        <input class="form_button" type="button" value="Cancel" onclick="hidePopup();" />
                        
                    </div>
            
                </div>
                
            </div>
            
        </div>
        
    </body>
    
    
</html
