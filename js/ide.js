// Defaults

var DEFAULT_FONT = "arial";
var DEFAULT_FONT_SIZE = "95%";

var DEFAULT_IMAGE_WIDTH = 400;
var DEFAULT_IMAGE_HEIGHT = 300;

// --------

var canvas, properties;
var width, height;
var viewportWidth, viewportHeight;

var elements = [];

var selected = null;

function loadVersion()
{
    if (elements == null || elements.length == 0)
    {
        elements = [];
        
        // Default canvas settings
        width = 1024;
        height = 768;
        
        canvas.style.backgroundColor = "rgb(255, 255, 255)";
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.zoom = "100%";   
        canvas.style.position = "absolute";
        canvas.style.top = ((viewportHeight - height) / 2) + "px";
        canvas.style.left = ((viewportWidth - 150 - 300 - width) / 2 + 150) + "px";
        canvas.style.webkitUserSelect = "none";
            
        
        var cookies = document.cookie.split("; ");
        var version_name = "";
       
        for (var i = 0; i < cookies.length; ++i)
        {
            if (cookies[i].substr(0, cookies[i].indexOf("=")) == "selected_version")
            {
                version_name = cookies[i].substr(cookies[i].indexOf("=") + 1);
                break;
            }        
        }
        
        elements.push({
            type: "canvas",
            name: version_name,
            width: width,
            height: height,
            color: canvas.style.backgroundColor});   
    }
    else
    {
        var cookies = document.cookie.split("; ");
        var version_name = "";
       
        for (var i = 0; i < cookies.length; ++i)
        {
            if (cookies[i].substr(0, cookies[i].indexOf("=")) == "selected_version")
            {
                version_name = cookies[i].substr(cookies[i].indexOf("=") + 1);
                break;
            }        
        }
        
        elements[0].name = version_name;
        
        // Load existing settings
        width = parseInt(elements[0].width);
        height = parseInt(elements[0].height);
        
        canvas.style.backgroundColor = elements[0].color;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        
        canvas.style.zoom = "100%";   
        canvas.style.position = "absolute";
        canvas.style.top = ((viewportHeight - height) / 2) + "px";
        canvas.style.left = ((viewportWidth - 150 - 300 - width) / 2 + 150) + "px";
        canvas.style.webkitUserSelect = "none";
        
        for (var i = 1; i < elements.length; ++i)
        {
            if (elements[i].type == "text")
            {
                loadText(i);
            }
            else
            if (elements[i].type == "image")
            {
                loadImage(i);
            }
            else
            if (elements[i].type == "video")
            {
                loadVideo(i);
            }
            else
            if (elements[i].type == "button")
            {
                loadButton(i);
            }
            else
            if (elements[i].type == "hyperlink")
            {
                loadHyperlink(i);
            }
            else
            if (elements[i].type == "dropdown")
            {
                loadDropdown(i);
            }
            else
            if (elements[i].type == "gallery")
            {
                loadGallery(i);
            }
        }
    }
    
    _.observe(elements, function(new_array, old_array) {enableSave();});
    
    setInterval(function(){saveCanvas();}, 5000);
}

function initializeCanvas()
{
    canvas = document.getElementById("canvas");
    properties = document.getElementById("properties");
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    
    $.ajax(
            {
                type: "POST", 
                url: "load_version.php", 
                success: function(array){elements = $.parseJSON(array);loadVersion();}
            });

    $("#canvas").draggable();
}

function loadText(index)
{
    var text = document.createElement("div");
    text.style.fontFamily = elements[index].font;
    text.style.fontSize = elements[index].fontsize;
    text.style.color = elements[index].color;
    
    text.innerHTML = elements[index].content;
    
    text.style.position = "absolute";
    text.style.left = elements[index].left;
    text.style.top = elements[index].top;
    text.style.zIndex = elements[index].zIndex;
    text.style.webkitUserSelect = "none";
    
    canvas.appendChild(text);
    
    $(text).draggable({containment: "#canvas"});
    $(text).click(function() {textSelect(text, index);});
    $(text).bind("dragstart", function(event, ui) {textSelect(text, index);});
    $(text).bind("dragstop", function(event, ui) {textSelect(text, index);});    
}

function loadImage(index)
{
    var image = document.createElement("img");
    
    image.setAttribute("src", elements[index].src);
    image.style.position = "absolute";
    image.style.width = elements[index].width;
    image.style.height = elements[index].height;
    image.style.left = elements[index].left;
    image.style.top = elements[index].top;
    image.style.zIndex = elements[index].zIndex;
    image.style.webkitUserSelect = "none";
    
    canvas.appendChild(image);
    
    $(image).draggable({containment: "#canvas"});
    $(image).click(function() {imageSelect(image, index);});
    $(image).bind("dragstart", function(event, ui) {imageSelect(image, index);});
    $(image).bind("dragstop", function(event, ui) {imageSelect(image, index);});    
}

function loadVideo(index)
{
    var video = document.createElement("img");
    
    video.setAttribute("src", elements[index].src);
    
    video.style.position = "absolute";
    video.style.width = elements[index].width;
    video.style.height = elements[index].height;
    video.style.left = elements[index].left;
    video.style.top = elements[index].top;
    video.style.zIndex = elements[index].zIndex;
    video.style.webkitUserSelect = "none";
    
    canvas.appendChild(video);
    
    $(video).draggable({containment: "#canvas"});
    $(video).click(function() {videoSelect(video, index);});
    $(video).bind("dragstart", function(event, ui) {videoSelect(video, index);});
    $(video).bind("dragstop", function(event, ui) {videoSelect(video, index);});    
}

function loadButton(index)
{
    // Button disabled
}

function loadHyperlink(index)
{
    var a = document.createElement("a");
    a.style.fontFamily = elements[index].font;
    a.style.fontSize = elements[index].fontsize;
    a.style.color = elements[index].color;
    
    a.innerHTML = elements[index].content;
    a.setAttribute("href", elements[index].href);
    
    a.style.position = "absolute";
    a.style.left = elements[index].left;
    a.style.top = elements[index].top;
    a.style.zIndex = elements[index].zIndex;
    a.style.webkitUserSelect = "none";
    
    canvas.appendChild(a);
    
    $(a).draggable({containment: "#canvas"});
    $(a).click(function() {hyperlinkSelect(a, index);});
    $(a).bind("dragstart", function(event, ui) {hyperlinkSelect(a, index);});
    $(a).bind("dragstop", function(event, ui) {hyperlinkSelect(a, index);});    
}

function loadDropdown(index)
{    
    var dropdown = document.createElement("select");
    
    dropdown.style.position = "absolute";
    dropdown.style.left = elements[index].left;
    dropdown.style.top = elements[index].top;
    dropdown.style.zIndex = elements[index].zIndex;
    dropdown.style.fontFamily = elements[index].font;
    dropdown.style.fontSize = elements[index].fontsize;
    dropdown.style.webkitUserSelect = "none";
    
    for (var i = 0; i < elements[index].options.length; ++i)
    {        
        var option = document.createElement("option");
        option.setAttribute("value", elements[index].options[i]);
        option.innerHTML = elements[index].options[i];
        dropdown.appendChild(option);
    }
    
    canvas.appendChild(dropdown);
    
    $(dropdown).draggable({containment: "#canvas"});
    $(dropdown).click(function() {dropdownSelect(dropdown, index);});
    $(dropdown).bind("dragstart", function(event, ui) {dropdownSelect(dropdown, index);});
    $(dropdown).bind("dragstop", function(event, ui) {dropdownSelect(dropdown, index);});    
}

function loadGallery(index)
{   
    var gallery = document.createElement("div");

    gallery.id = "gallery" + index;
    gallery.style.position = "absolute";
    gallery.style.left = elements[index].left;
    gallery.style.top = elements[index].top;
    gallery.style.zIndex = elements[index].zIndex;
    gallery.style.width = elements[index].width;
    gallery.style.height = elements[index].height;
    gallery.style.webkitUserSelect = "none";
    
    for (var i = 0; i < elements[index].src.length; ++i)
    {
        var image = document.createElement("img");
        image.setAttribute("src", elements[index].src[i]);
        gallery.appendChild(image);
    }

    Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
    Galleria.run("#gallery" + index);
    
    canvas.appendChild(gallery);
      
    $(gallery).draggable({containment: "#canvas"});
    $(gallery).click(function() {gallerySelect(gallery, index);});
    $(gallery).bind("dragstart", function(event, ui) {gallerySelect(gallery, index);});
    $(gallery).bind("dragstop", function(event, ui) {gallerySelect(gallery, index);});    
}

function addText()
{
    var text = document.createElement("div");
    text.style.fontFamily = DEFAULT_FONT;
    text.style.fontSize = DEFAULT_FONT_SIZE;
    text.style.color = "#000000";
    
    text.innerHTML = "Sample text";
    
    text.style.position = "absolute";
    text.style.left = width / 2 + "px";
    text.style.top = height / 2 + "px";
    text.style.webkitUserSelect = "none";
    text.zIndex = "2147483646";
    
    canvas.appendChild(text);
    
    elements.push({
        type: "text",
        top: text.style.top,
        left: text.style.left,
        zIndex: text.style.zIndex,
        font: text.style.fontFamily,
        fontsize: text.style.fontSize,
        color: text.style.color,
        content: text.innerHTML});
        
    var index = elements.length - 1;
    
    $(text).draggable({containment: "#canvas"});
    $(text).click(function() {textSelect(text, index);});
    $(text).bind("dragstart", function(event, ui) {textSelect(text, index);});
    $(text).bind("dragstop", function(event, ui) {textSelect(text, index);});
}

function addImage()
{
    var image = document.createElement("img");
    
    image.setAttribute("src", "images/sample.png");
    image.style.position = "absolute";
    image.style.width = DEFAULT_IMAGE_WIDTH + "px";
    image.style.height = DEFAULT_IMAGE_HEIGHT + "px";
    image.style.left = width / 2 + "px";
    image.style.top = height / 2 + "px";
    image.style.webkitUserSelect = "none";
    image.style.zIndex = "2147483646";
    
    canvas.appendChild(image);
    
    elements.push({
        type: "image",
        width: image.style.width,
        height: image.style.height,
        top: image.style.top,
        left: image.style.left,
        zIndex: image.style.zIndex,
        src: image.src});
        
    var index = elements.length - 1;
    
    $(image).draggable({containment: "#canvas"});
    $(image).click(function() {imageSelect(image, index);});
    $(image).bind("dragstart", function(event, ui) {imageSelect(image, index);});
    $(image).bind("dragstop", function(event, ui) {imageSelect(image, index);});
}

function addVideo()
{
    var video = document.createElement("img");
    
    video.setAttribute("src", "images/video_sample.png");
    
    video.style.position = "absolute";
    video.style.width = DEFAULT_IMAGE_WIDTH + "px";
    video.style.height = DEFAULT_IMAGE_HEIGHT + "px";
    video.style.left = width / 2 + "px";
    video.style.top = height / 2 + "px";
    video.style.webkitUserSelect = "none";
    video.style.zIndex = "2147483646";
    
    canvas.appendChild(video);
    
    elements.push({
        type: "video",
        width: video.style.width,
        height: video.style.height,
        top: video.style.top,
        left: video.style.left,
        zIndex: video.style.zIndex,
        src: video.src});
    
    var index = elements.length - 1;
    
    $(video).draggable({containment: "#canvas"});
    $(video).click(function() {videoSelect(video, index);});
    $(video).bind("dragstart", function(event, ui) {videoSelect(video, index);});
    $(video).bind("dragstop", function(event, ui) {videoSelect(video, index);});
}

function addButton()
{
    // Button disabled    
}

function addHyperlink()
{
    var a = document.createElement("a");
    a.style.fontFamily = DEFAULT_FONT;
    a.style.fontSize = DEFAULT_FONT_SIZE;
    a.style.color = "#000000";
    
    a.innerHTML = "Sample hyperlink";
    a.setAttribute("href", "#");
    
    a.style.position = "absolute";
    a.style.left = width / 2 + "px";
    a.style.top = height / 2 + "px";
    a.style.webkitUserSelect = "none";
    a.style.zIndex = "2147483646";
    
    canvas.appendChild(a);
    
    elements.push({
        type: "hyperlink",
        top: a.style.top,
        left: a.style.left,
        zIndex: a.style.zIndex,
        font: a.style.fontFamily,
        fontsize: a.style.fontSize,
        color: a.style.color,
        content: a.innerHTML,
        href: a.href});
    
    var index = elements.length - 1;
    
    $(a).draggable({containment: "#canvas"});
    $(a).click(function() {hyperlinkSelect(a, index);});
    $(a).bind("dragstart", function(event, ui) {hyperlinkSelect(a, index);});
    $(a).bind("dragstop", function(event, ui) {hyperlinkSelect(a, index);});
}

function addDropdownMenu()
{
    var dropdown = document.createElement("select");
    
    dropdown.style.position = "absolute";
    dropdown.style.left = width / 2 + "px";
    dropdown.style.top = height / 2 + "px";
    dropdown.style.fontFamily = DEFAULT_FONT;
    dropdown.style.fontSize = DEFAULT_FONT_SIZE;
    dropdown.style.webkitUserSelect = "none";
    dropdown.style.zIndex = "2147483646";
    
    var option = document.createElement("option");
    option.setAttribute("value", "option1");
    option.innerHTML = "option1";
    dropdown.appendChild(option);
    
    option = document.createElement("option");
    option.setAttribute("value", "option2");
    option.innerHTML = "option2";
    dropdown.appendChild(option);
    
    option = document.createElement("option");
    option.setAttribute("value", "option3");
    option.innerHTML = "option3";
    dropdown.appendChild(option);
    
    canvas.appendChild(dropdown);
    
    elements.push({
        type: "dropdown",
        top: dropdown.style.top,
        left: dropdown.style.left,
        zIndex: dropdown.stylezIndex,
        font: dropdown.style.fontFamily,
        fontsize: dropdown.style.fontSize,
        options: ["option1", "option2", "option3"]});
    
    var index = elements.length - 1;
    
    $(dropdown).draggable({containment: "#canvas"});
    $(dropdown).click(function() {dropdownSelect(dropdown, index);});
    $(dropdown).bind("dragstart", function(event, ui) {dropdownSelect(dropdown, index);});
    $(dropdown).bind("dragstop", function(event, ui) {dropdownSelect(dropdown, index);});
}

function addGallery()
{    
    var gallery = document.createElement("div");

    gallery.id = "gallery";
    gallery.style.position = "absolute";
    gallery.style.left = width / 2 + "px";
    gallery.style.top = height / 2 + "px";
    gallery.style.width = DEFAULT_IMAGE_WIDTH + "px";
    gallery.style.height = DEFAULT_IMAGE_HEIGHT + "px";
    gallery.style.webkitUserSelect = "none";
    gallery.style.zIndex = "2147483646";
             
    var image = document.createElement("img");
    image.setAttribute("src", "images/sample.png");  
    gallery.appendChild(image);
    
    image = document.createElement("img");
    image.setAttribute("src", "images/sample.png");  
    gallery.appendChild(image);
    
    image = document.createElement("img");
    image.setAttribute("src", "images/sample.png");  
    gallery.appendChild(image);
    
    Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
    Galleria.run("#gallery");
    
    canvas.appendChild(gallery);
    
    elements.push({
        type: "gallery",
        width: gallery.style.width,
        height: gallery.style.height,
        top: gallery.style.top,
        left: gallery.style.left,
        zIndex: gallery.style.zIndex,
        src: ["images/sample.png", "images/sample.png", "images/sample.png"]});
    
    var index = elements.length - 1;
      
    $(gallery).draggable({containment: "#canvas"});
    $(gallery).click(function() {gallerySelect(gallery, index);});
    $(gallery).bind("dragstart", function(event, ui) {gallerySelect(gallery, index);});
    $(gallery).bind("dragstop", function(event, ui) {gallerySelect(gallery, index);});
}

function zoomIn()
{
    if (parseInt(canvas.style.zoom) < 400)
    {
        canvas.style.zoom = (parseInt(canvas.style.zoom) + 10) + "%";
    }   
}

function zoomOut()
{
    if (parseInt(canvas.style.zoom) > 0)
    {
        canvas.style.zoom = (parseInt(canvas.style.zoom) - 10) + "%";
        
    }   
}

function textSelect(text, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = text.style.left;
    elements[index].top = text.style.top;
    
    selected = text;
    text.style.border = "2px solid grey";
            
    // Title
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = "Text item";
    properties.appendChild(title);
    
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    // Content
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Content";
    form.appendChild(label);
    
    var content = document.createElement("textarea");
    content.type = "text";
    content.className = "properties_input";
    content.id = "content";
    content.value = text.innerHTML;
    $(content).change(function() 
        {
            $(text).text($(content).val()).html(function(index, old) 
                { 
                    return old.replace(/\n/g, '<br />') 
                });
            elements[index].content = text.innerHTML;
        });
    form.appendChild(content);
    
    // Font family
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Font";
    form.appendChild(label);
    
    var font = document.createElement("input");
    font.type = "text";
    font.className = "properties_input";
    font.id = "font";
    font.value = text.style.fontFamily;
    $(font).change(function() {elements[index].font = text.style.fontFamily = font.value;});
    form.appendChild(font);
    
    // Font size
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Font size";
    form.appendChild(label);
    
    var fontsize = document.createElement("input");
    fontsize.type = "text";
    fontsize.className = "properties_input";
    fontsize.id = "fontsize";
    fontsize.value = text.style.fontSize;
    $(fontsize).change(function() {elements[index].fontsize = text.style.fontSize = fontsize.value;});
    form.appendChild(fontsize);
    
    // Color
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Color";
    form.appendChild(label);
    
    var color = document.createElement("input");
    color.type = "text";
    color.className = "properties_input";
    color.id = "color";
    color.value = text.style.color;
    $(color).change(function() {elements[index].color = text.style.color = color.value;});
    form.appendChild(color);
    
    // X coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "X";
    form.appendChild(label);
    
    var x = document.createElement("input");
    x.type = "text";
    x.className = "properties_input";
    x.id = "x";
    x.value = parseInt(text.style.left, 10);
    $(x).change(function() {elements[index].left = text.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
    form.appendChild(x);
    
    // Y coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Y";
    form.appendChild(label);
    
    var y = document.createElement("input");
    y.type = "text";
    y.className = "properties_input";
    y.id = "y";
    y.value = parseInt(text.style.top, 10);
    $(y).change(function() {elements[index].top = text.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
    form.appendChild(y);
    
    // Z coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Depth level";
    form.appendChild(label);
    
    var z = document.createElement("input");
    z.type = "text";
    z.className = "properties_input";
    z.id = "z";
    z.value = parseInt(text.style.zIndex, 10);
    $(z).change(function() {elements[index].zIndex = text.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Apply button    
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    form.appendChild(apply);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {elements.splice(index, 1); canvas.removeChild(text); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function imageSelect(image, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = image.style.left;
    elements[index].top = image.style.top;
    
    selected = image;
    image.style.border = "2px solid grey";
        
    // Title
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = "Image item";
    properties.appendChild(title);
    
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    // Src
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Source";
    form.appendChild(label);
    
    var source = document.createElement("input");
    source.type = "text";
    source.className = "properties_input";
    source.id = "content";
    source.value = image.src;
    $(source).change(function() {elements[index].src = image.src = source.value;});
    form.appendChild(source);
    
    // X coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "X";
    form.appendChild(label);
    
    var x = document.createElement("input");
    x.type = "text";
    x.className = "properties_input";
    x.id = "x";
    x.value = parseInt(image.style.left, 10);
    $(x).change(function() {elements[index].left = image.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
    form.appendChild(x);
    
    // Y coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Y";
    form.appendChild(label);
    
    var y = document.createElement("input");
    y.type = "text";
    y.className = "properties_input";
    y.id = "y";
    y.value = parseInt(image.style.top, 10);
    $(y).change(function() {elements[index].top = image.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
    form.appendChild(y);
    
    // Width
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Width";
    form.appendChild(label);
    
    var w = document.createElement("input");
    w.type = "text";
    w.className = "properties_input";
    w.id = "w";
    w.value = parseInt(image.style.width, 10);
    $(w).change(function() {elements[index].width = image.style.width = Math.min(parseInt(w.value, 10), width) + "px";});
    form.appendChild(w);
    
    // Height
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Height";
    form.appendChild(label);
    
    var h = document.createElement("input");
    h.type = "text";
    h.className = "properties_input";
    h.id = "h";
    h.value = parseInt(image.style.height, 10);
    $(h).change(function() {elements[index].height = image.style.height = Math.min(parseInt(h.value, 10), height) + "px";});
    form.appendChild(h);
    
    // Z coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Depth level";
    form.appendChild(label);
    
    var z = document.createElement("input");
    z.type = "text";
    z.className = "properties_input";
    z.id = "z";
    z.value = parseInt(image.style.zIndex, 10);
    $(z).change(function() {elements[index].zIndex = image.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Apply button    
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    form.appendChild(apply);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {elements.splice(index, 1); canvas.removeChild(image); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function videoSelect(video, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = video.style.left;
    elements[index].top = video.style.top;
    
    selected = video;
    video.style.border = "2px solid grey";
    
    // Title
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = "Video item";
    properties.appendChild(title);
    
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    // Src
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Source";
    form.appendChild(label);
    
    var source = document.createElement("input");
    source.type = "text";
    source.className = "properties_input";
    source.id = "content";
    source.value = video.src;
    $(source).change(function() {elements[index].src = video.src = source.value;});
    form.appendChild(source);
    
    // X coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "X";
    form.appendChild(label);
    
    var x = document.createElement("input");
    x.type = "text";
    x.className = "properties_input";
    x.id = "x";
    x.value = parseInt(video.style.left, 10);
    $(x).change(function() {elements[index].left = video.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
    form.appendChild(x);
    
    // Y coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Y";
    form.appendChild(label);
    
    var y = document.createElement("input");
    y.type = "text";
    y.className = "properties_input";
    y.id = "y";
    y.value = parseInt(video.style.top, 10);
    $(y).change(function() {elements[index].top = video.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
    form.appendChild(y);
    
    // Width
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Width";
    form.appendChild(label);
    
    var w = document.createElement("input");
    w.type = "text";
    w.className = "properties_input";
    w.id = "w";
    w.value = parseInt(video.style.width, 10);
    $(w).change(function() {elements[index].width = video.style.width = Math.min(parseInt(w.value, 10), width) + "px";});
    form.appendChild(w);
    
    // Height
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Height";
    form.appendChild(label);
    
    var h = document.createElement("input");
    h.type = "text";
    h.className = "properties_input";
    h.id = "h";
    h.value = parseInt(video.style.height, 10);
    $(h).change(function() {elements[index].height = video.style.height = Math.min(parseInt(h.value, 10), height) + "px";});
    form.appendChild(h);
    
    // Z coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Depth level";
    form.appendChild(label);
    
    var z = document.createElement("input");
    z.type = "text";
    z.className = "properties_input";
    z.id = "z";
    z.value = parseInt(video.style.zIndex, 10);
    $(z).change(function() {elements[index].zIndex = video.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Apply button    
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    form.appendChild(apply);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {elements.splice(index, 1); canvas.removeChild(video); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function buttonSelect(button)
{
    deselect();
    
    // TODO
}

function hyperlinkSelect(a, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = a.style.left;
    elements[index].top = a.style.top;
    
    selected = a;
    a.style.border = "2px solid grey";
        
    // Title
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = "Hyperlink item";
    properties.appendChild(title);
    
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    // Font family
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Font";
    form.appendChild(label);
    
    var font = document.createElement("input");
    font.type = "text";
    font.className = "properties_input";
    font.id = "font";
    font.value = a.style.fontFamily;
    $(font).change(function() {elements[index].font = a.style.fontFamily = font.value;});
    form.appendChild(font);
    
    // Font size
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Font size";
    form.appendChild(label);
    
    var fontsize = document.createElement("input");
    fontsize.type = "text";
    fontsize.className = "properties_input";
    fontsize.id = "fontsize";
    fontsize.value = a.style.fontSize;
    $(fontsize).change(function() {elements[index].fontsize = a.style.fontSize = fontsize.value;});
    form.appendChild(fontsize);
    
    // Content
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Content";
    form.appendChild(label);
    
    var content = document.createElement("input");
    content.type = "text";
    content.className = "properties_input";
    content.id = "content";
    content.value = a.innerHTML;
    $(content).change(function() {elements[index].innerHTML = a.innerHTML = content.value;});
    form.appendChild(content);
    
    // Href
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Hypertext reference";
    form.appendChild(label);
    
    var href = document.createElement("input");
    href.type = "text";
    href.className = "properties_input";
    href.id = "content";
    href.value = a.href;
    $(href).change(function() {elements[index].href = a.href = href.value;});
    form.appendChild(href);
    
    // Color
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Color";
    form.appendChild(label);
    
    var color = document.createElement("input");
    color.type = "text";
    color.className = "properties_input";
    color.id = "color";
    color.value = a.style.color;
    $(color).change(function() {elements[index].color = a.style.color = color.value;});
    form.appendChild(color);
    
    // X coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "X";
    form.appendChild(label);
    
    var x = document.createElement("input");
    x.type = "text";
    x.className = "properties_input";
    x.id = "x";
    x.value = parseInt(a.style.left, 10);
    $(x).change(function() {elements[index].left = a.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
    form.appendChild(x);
    
    // Y coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Y";
    form.appendChild(label);
    
    var y = document.createElement("input");
    y.type = "text";
    y.className = "properties_input";
    y.id = "y";
    y.value = parseInt(a.style.top, 10);
    $(y).change(function() {elements[index].top = a.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
    form.appendChild(y);
    
    // Z coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Depth level";
    form.appendChild(label);
    
    var z = document.createElement("input");
    z.type = "text";
    z.className = "properties_input";
    z.id = "z";
    z.value = parseInt(a.style.zIndex, 10);
    $(z).change(function() {elements[index].zIndex = a.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Apply button    
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    form.appendChild(apply);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {elements.splice(index, 1); canvas.removeChild(a); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function dropdownSelect(dropdown, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = dropdown.style.left;
    elements[index].top = dropdown.style.top;
    
    selected = dropdown;
    dropdown.style.border = "2px solid grey";
        
    // Title
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = "Dropdown menu item";
    properties.appendChild(title);
    
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    // Options
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Options";
    form.appendChild(label);
    
    var options = document.createElement("input");
    options.type = "text";
    options.className = "properties_input";
    options.id = "options";
    for (var i = 0; i < elements[index].options.length - 1; ++i)
    {
        options.value += elements[index].options[i] + "<>";
    }
    options.value += elements[index].options[elements[index].options.length - 1];
    $(options).change(function() 
        {
            elements[index].options.splice(0, elements[index].options.length);
            
            elements[index].options = options.value.split("<>");
            
            while (dropdown.childNodes.length > 0)
            {
                dropdown.removeChild(dropdown.lastChild);
            }
            
            for (var i = 0; i < elements[index].options.length; ++i)
            {    
                var option = document.createElement("option");
                option.setAttribute("value", i);
                option.innerHTML = elements[index].options[i];
                dropdown.appendChild(option);
            }
        });
    form.appendChild(options);
    
    // X coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "X";
    form.appendChild(label);
    
    var x = document.createElement("input");
    x.type = "text";
    x.className = "properties_input";
    x.id = "x";
    x.value = parseInt(dropdown.style.left, 10);
    $(x).change(function() {elements[index].left = dropdown.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
    form.appendChild(x);
    
    // Y coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Y";
    form.appendChild(label);
    
    var y = document.createElement("input");
    y.type = "text";
    y.className = "properties_input";
    y.id = "y";
    y.value = parseInt(dropdown.style.top, 10);
    $(y).change(function() {elements[index].top = dropdown.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
    form.appendChild(y);
    
    // Z coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Depth level";
    form.appendChild(label);
    
    var z = document.createElement("input");
    z.type = "text";
    z.className = "properties_input";
    z.id = "z";
    z.value = parseInt(dropdown.style.zIndex, 10);
    $(z).change(function() {elements[index].zIndex = dropdown.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Apply button    
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    form.appendChild(apply);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {elements.splice(index, 1); canvas.removeChild(dropdown); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function gallerySelect(gallery, index)
{
    deselect();
    
    selected = gallery;
    gallery.style.border = "2px solid grey";
    
    // Update coords by dragging
    elements[index].left = gallery.style.left;
    elements[index].top = gallery.style.top;
        
    // Title
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = "Gallery item";
    properties.appendChild(title);
    
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    // Src
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Images";
    form.appendChild(label);
    
    var source = document.createElement("input");
    source.type = "text";
    source.className = "properties_input";
    source.id = "source";
    
    for (var i = 0; i < elements[index].src.length - 1; ++i)
    {
        source.value += elements[index].src[i] + "<>";
    }
    
    source.value += elements[index].src[elements[index].src.length - 1];
    
    $(source).change(function() 
        {
            elements[index].src.splice(0, elements[index].src.length);
            
            elements[index].src = source.value.split("<>");

            refreshGallery(gallery, index);            
        });
    form.appendChild(source);
    
    // X coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "X";
    form.appendChild(label);
    
    var x = document.createElement("input");
    x.type = "text";
    x.className = "properties_input";
    x.id = "x";
    x.value = parseInt(gallery.style.left, 10);
    $(x).change(function() {elements[index].left = gallery.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
    form.appendChild(x);
    
    // Y coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Y";
    form.appendChild(label);
    
    var y = document.createElement("input");
    y.type = "text";
    y.className = "properties_input";
    y.id = "y";
    y.value = parseInt(gallery.style.top, 10);
    $(y).change(function() {elements[index].top = gallery.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
    form.appendChild(y);
    
    // Width
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Width";
    form.appendChild(label);
    
    var w = document.createElement("input");
    w.type = "text";
    w.className = "properties_input";
    w.id = "w";
    w.value = parseInt(gallery.style.width, 10);
    $(w).change(function() {elements[index].width = gallery.style.width = Math.min(parseInt(w.value, 10), width) + "px";refreshGallery(gallery, index);});
    form.appendChild(w);
    
    // Height
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Height";
    form.appendChild(label);
    
    var h = document.createElement("input");
    h.type = "text";
    h.className = "properties_input";
    h.id = "h";
    h.value = parseInt(gallery.style.height, 10);
    $(h).change(function() {elements[index].height = gallery.style.height = Math.min(parseInt(h.value, 10), height) + "px";refreshGallery(gallery, index);});
    form.appendChild(h);
    
    // Z coord
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Depth level";
    form.appendChild(label);
    
    var z = document.createElement("input");
    z.type = "text";
    z.className = "properties_input";
    z.id = "z";
    z.value = parseInt(gallery.style.zIndex, 10);
    $(z).change(function() {elements[index].zIndex = gallery.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Apply button    
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    form.appendChild(apply);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {elements.splice(index, 1); canvas.removeChild(gallery); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function refreshGallery(gallery, index)
{
    // Remove old gallery
    canvas.removeChild(gallery);

    // Create new gallery with updated parameters
    gallery = document.createElement("div");

    gallery.id = "gallery";
    gallery.style.position = "absolute";
    gallery.style.left = elements[index].left;
    gallery.style.top = elements[index].top;
    gallery.style.width = elements[index].width;
    gallery.style.height = elements[index].height;
    gallery.style.webkitUserSelect = "none";
    
    for (var i = 0; i < elements[index].src.length; ++i)
    {    
        var image = document.createElement("img");
        image.setAttribute("src", elements[index].src[i]);
        gallery.appendChild(image);
    }
    
    Galleria.run("#gallery");
    
    canvas.appendChild(gallery);
         
    $(gallery).draggable({containment: "#canvas"});
    $(gallery).click(function() {gallerySelect(gallery, index);});
    $(gallery).bind("dragstart", function(event, ui) {gallerySelect(gallery, index);});
    $(gallery).bind("dragstop", function(event, ui) {gallerySelect(gallery, index);});
    
    gallerySelect(gallery, index);
}

function canvasSelect()
{
    deselect();
    
    // Title
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = "Canvas";
    properties.appendChild(title);
    
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    // Width
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Width";
    form.appendChild(label);
    
    var w = document.createElement("input");
    w.type = "text";
    w.className = "properties_input";
    w.id = "w";
    w.value = parseInt(width, 10);
    $(w).change(function() {width = parseInt(w.value, 10); elements[0].width = canvas.style.width = parseInt(w.value, 10) + "px";});
    form.appendChild(w);
    
    // Height
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Height";
    form.appendChild(label);
    
    var h = document.createElement("input");
    h.type = "text";
    h.className = "properties_input";
    h.id = "h";
    h.value = parseInt(height, 10);
    $(h).change(function() {height = parseInt(h.value, 10); elements[0].height = canvas.style.height = parseInt(h.value, 10) + "px";});
    form.appendChild(h);
       
    // Color
    label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Color";
    form.appendChild(label);
    
    var color = document.createElement("input");
    color.type = "text";
    color.className = "properties_input";
    color.id = "color";
    color.value = canvas.style.backgroundColor;
    $(color).change(function() {elements[0].color = canvas.style.backgroundColor = color.value;});
    form.appendChild(color);
    
    // Apply button    
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    form.appendChild(apply);
    
    properties.appendChild(form);
}

function deselect()
{
    if (selected != null)
    {
        selected.style.border = "0px";    
    }
    
    while (properties.childNodes.length > 2)
    {
        properties.removeChild(properties.lastChild);
    }
}

function saveCanvas()
{
    if (document.getElementById("saveButton").className == "saveButton")
    {
        document.getElementById("saveButton").innerHTML = "Saving..";
        
        document.cookie = "elements = " + JSON.stringify(elements);
        $.ajax(
            {
                type: "POST", 
                url: "save_version.php", 
                success: function(message){disableSave();}
            });
    }
}

function disableSave()
{
    document.getElementById("saveButton").className = "disabledSaveButton";
    document.getElementById("saveButton").innerHTML = "Saved";
}

function enableSave()
{
    document.getElementById("compileButton").className = "compileButton";
    document.getElementById("compileButton").innerHTML = "Compile";
    
    document.getElementById("saveButton").className = "saveButton";    
    document.getElementById("saveButton").innerHTML = "Save";
}

function goBack()
{
    document.location = "contentmanagement.php"
}
