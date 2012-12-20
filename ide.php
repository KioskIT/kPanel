<!DOCTYPE HTML>

<html>
    
        
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel - Version editor</title>
        
        <link href="css/ide.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/underscore.js"></script>
        <script type="text/javascript" src="js/json2.js"></script>
        <script type="text/javascript" src="js/underscore.observable.js"></script>
        <script type="text/javascript" src="galleria/galleria-1.2.8.js"></script>
        <script type="text/javascript" src="js/ide.js"></script>
        
    </head>
    
    
    <body onload="initializeCanvas()">
        
        <div id="canvas"></div>
       
        <div id="toolbar">
            <p class="title">Items toolbar</p>
            <div class="toolbarItem" onclick="addText()">Text</div>
            <div class="toolbarItem" onclick="addImage()">Image</div>
            <div class="toolbarItem" onclick="addVideo()">Video</div>
            <div class="disabledToolbarItem" onclick="addButton()">Button</div>
            <div class="toolbarItem" onclick="addHyperlink()">Hyperlink</div>    
            <div class="toolbarItem" onclick="addDropdownMenu()">Dropdown menu</div>
            <div class="toolbarItem" onclick="addGallery()">Gallery</div>
            <div class="spacer"></div>
            <div class="toolbarItem" onclick="zoomIn()">Zoom in</div>
            <div class="toolbarItem" onclick="zoomOut()">Zoom out</div>
            <div class="toolbarItem" onclick="canvasSelect()">Canvas</div>
            <div class="spacer"></div>
            <div id="saveButton" class="toolbarItem" onclick="saveCanvas()">Save</div>
        </div>
       
        <div id="properties">
            <p class="title">Properties</p>
        </div>
        
    </body>
    
    
</html>


