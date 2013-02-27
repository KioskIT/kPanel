<!DOCTYPE HTML>

<html>
    
        
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel - Version editor</title>
        
        <link href="css/animations.css" type="text/css" rel="stylesheet" />        
        <link href="css/ide.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/underscore.js"></script>
        <script type="text/javascript" src="js/json2.js"></script>
        <script type="text/javascript" src="js/underscore.observable.js"></script>
        <script type="text/javascript" src="galleria/galleria-1.2.8.js"></script>
        <script type="text/javascript" src="js/ide.js"></script>
        <script type="text/javascript" src="js/JSONtoHTML.js"></script>
        
    </head>
    
    
    <body onload="initializeCanvas()">
        
        <div id="canvas"></div>
       
        <div id="toolbar">
            <p class="title">Items toolbar</p>
            <div class="toolbarItem" title="Add text" onclick="addText()"><img src="images/text_icon.png"></img></div>
            <div class="toolbarItem" title="Add image" onclick="addImage()"><img src="images/image_icon.png"></div>
            <div class="toolbarItem" title="Add video" onclick="addVideo()"><img src="images/video_icon.png"></div>
            <div class="disabledToolbarItem" title="Add button" onclick="addButton()"><img src="images/button_icon.png"></div>
            <div class="toolbarItem" title="Add hyperlink" onclick="addHyperlink()"><img src="images/hyperlink_icon.png"></div>    
            <div class="toolbarItem" title="Add dropdown menu" onclick="addDropdownMenu()"><img src="images/dropdown_icon.png"></div>
            <div class="toolbarItem" title="Add gallery" onclick="addGallery()"><img src="images/gallery_icon.png"></div>
            <div class="spacer"></div>
            <div class="toolbarItem" title="Zoom in" onclick="zoomIn()"><img src="images/zoom_in_icon.png"></div>
            <div class="toolbarItem" title="Zoom out" onclick="zoomOut()"><img src="images/zoom_out_icon.png"></div>
            <div class="toolbarItem" title="Configure canvas" onclick="canvasSelect()"><img src="images/canvas_icon.png"></div>
            <div class="spacer"></div>
            <div id="saveButton" class="saveButton" onclick="saveCanvas()">Save</div>
            <div class="closeButton" onclick="goBack()">Close</div>
            <div id="compileButton" class="compileButton" onclick="compile()">Compile</div>
        </div>
       
        <div id="properties">
            <p class="title">Properties</p>
        </div>
        
    </body>
    
    
</html>


