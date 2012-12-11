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

function initalizeCanvas()
{
    canvas = document.getElementById("canvas");
    properties = document.getElementById("properties");
        
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    width = 1024;
    height = 768;
 
    canvas.style.zoom = "100%";   
    canvas.style.position = "absolute";
    canvas.style.top = ((viewportHeight - height) / 2) + "px";
    canvas.style.left = ((viewportWidth - 150 - 300 - width) / 2 + 150) + "px";
    canvas.style.webkitUserSelect = "none";
    
    $("#canvas").draggable();
}

function select(index)
{    
}

function deselect()
{
    
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
    
    $(text).draggable({containment: "#canvas"});
    $(text).click(function() {textSelect(text);});
    $(text).bind("dragstart", function(event, ui) {textSelect(text);});
    
    canvas.appendChild(text);
    
    elements.push({
        width: text.style.width,
        height: text.style.height,
        top: text.style.top,
        left: text.style.left,
        font: text.style.fontFamily,
        fontsize: text.style.fontSize,
        content: text.innerHTML});
}

function addImage()
{
    var image = document.createElement("img");
    
    image.setAttribute("src", "sample.png");
    image.style.position = "absolute";
    image.style.width = DEFAULT_IMAGE_WIDTH + "px";
    image.style.height = DEFAULT_IMAGE_HEIGHT + "px";
    image.style.left = width / 2 + "px";
    image.style.top = height / 2 + "px";
    image.style.webkitUserSelect = "none";
    
    $(image).draggable({containment: "#canvas"});
    $(image).click(function() {imageSelect(image);});
    $(image).bind("dragstart", function(event, ui) {imageSelect(image);});
    
    canvas.appendChild(image);
    
    elements.push({
        width: image.style.width,
        height: image.style.height,
        top: image.style.top,
        left: image.style.left,
        src: image.src});
}

function addVideo()
{
    var video = document.createElement("img");
    
    video.setAttribute("src", "video_sample.png");
    
    video.style.position = "absolute";
    video.style.width = DEFAULT_IMAGE_WIDTH + "px";
    video.style.height = DEFAULT_IMAGE_HEIGHT + "px";
    video.style.left = width / 2 + "px";
    video.style.top = height / 2 + "px";
    video.style.webkitUserSelect = "none";
    
    $(video).draggable({containment: "#canvas"});
    $(video).click(function() {videoSelect(video);});
    $(video).bind("dragstart", function(event, ui) {videoSelect(video);});
    
    canvas.appendChild(video);
    
    elements.push({
        width: video.style.width,
        height: video.style.height,
        top: video.style.top,
        left: video.style.left,
        src: video.src});
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
    
    $(a).draggable({containment: "#canvas"});
    $(a).click(function() {hyperlinkSelect(a);});
    $(a).bind("dragstart", function(event, ui) {hyperlinkSelect(a);});
    
    canvas.appendChild(a);
    
    elements.push({
        width: a.style.width,
        height: a.style.height,
        top: a.style.top,
        left: a.style.left,
        font: a.style.fontFamily,
        fontsize: a.style.fontSize,
        content: a.innerHTML,
        href: a.href});
}

function addDropdownMenu()
{
    var dropdown = document.createElement("select");
    
    dropdown.style.position = "absolute";
    dropdown.style.left = width / 2 + "px";
    dropdown.style.top = height / 2 + "px";
    dropdown.style.webkitUserSelect = "none";
    
    $(dropdown).draggable({containment: "#canvas"});
    $(dropdown).click(function() {dropdownSelect(dropdown);});
    $(dropdown).bind("dragstart", function(event, ui) {dropdownSelect(dropdown);});
    
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
        top: dropdown.style.top,
        left: dropdown.style.left,
        options: ["option1", "option2", "option3"]});
}

function addGallery()
{
    // Function not working for some reason
    
    var gallery = document.createElement("div");

    gallery.id = "gallery";
    gallery.style.position = "absolute";
    gallery.style.left = width / 2 + "px";
    gallery.style.top = height / 2 + "px";
    gallery.style.width = DEFAULT_IMAGE_WIDTH + "px";
    gallery.style.height = DEFAULT_IMAGE_HEIGHT + "px";
    gallery.style.webkitUserSelect = "none";
             
    var image = document.createElement("img");
    image.setAttribute("src", "sample.png");  
    gallery.appendChild(image);
    
    image = document.createElement("img");
    image.setAttribute("src", "sample.png");  
    gallery.appendChild(image);
    
    image = document.createElement("img");
    image.setAttribute("src", "sample.png");  
    gallery.appendChild(image);
    
    Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
    Galleria.run("#gallery");
      
    $(gallery).draggable({containment: "#canvas"});
    $(gallery).click(function() {gallerySelect(gallery);});
    $(gallery).bind("dragstart", function(event, ui) {gallerySelect(gallery);});
    
    canvas.appendChild(gallery);
    
    elements.push({
        width: gallery.style.width,
        height: gallery.style.height,
        top: gallery.style.top,
        left: gallery.style.left,
        src: ["sample.png", "sample.png", "sample.png"]}); 
        
        alert("done");      
}

function zoomIn()
{
    if (parseInt(canvas.style.zoom) < 300)
    {
        canvas.style.zoom = (parseInt(canvas.style.zoom) + 25) + "%";
    }   
}

function zoomOut()
{
    if (parseInt(canvas.style.zoom) > 0)
    {
        canvas.style.zoom = (parseInt(canvas.style.zoom) - 25) + "%";
        
    }   
}

function textSelect(text)
{
    deselect();
        
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
        });
    form.appendChild(content);
    
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
    $(color).change(function() {text.style.color = color.value;});
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
    $(x).change(function() {text.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
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
    $(y).change(function() {text.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
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
    $(z).change(function() {text.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {canvas.removeChild(text); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function imageSelect(image)
{
    deselect();
        
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
    $(source).change(function() {image.src = source.value;});
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
    $(x).change(function() {image.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
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
    $(y).change(function() {image.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
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
    $(w).change(function() {image.style.width = Math.min(parseInt(w.value, 10), width) + "px";});
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
    $(h).change(function() {image.style.height = Math.min(parseInt(h.value, 10), height) + "px";});
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
    $(z).change(function() {image.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {canvas.removeChild(image); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function videoSelect(video)
{
    deselect();
    
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
    $(source).change(function() {video.src = source.value;});
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
    $(x).change(function() {video.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
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
    $(y).change(function() {video.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
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
    $(w).change(function() {video.style.width = Math.min(parseInt(w.value, 10), width) + "px";});
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
    $(h).change(function() {video.style.height = Math.min(parseInt(h.value, 10), height) + "px";});
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
    $(z).change(function() {video.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {canvas.removeChild(video); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function buttonSelect(button)
{
    deselect();
    
    // TODO
}

function hyperlinkSelect(a)
{
    deselect();
        
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
    content.value = a.innerHTML;
    $(content).change(function() {a.innerHTML = content.value;});
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
    $(href).change(function() {a.href = href.value;});
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
    $(color).change(function() {a.style.color = color.value;});
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
    $(x).change(function() {a.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
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
    $(y).change(function() {a.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
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
    $(z).change(function() {a.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {canvas.removeChild(a); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function dropdownSelect(dropdown)
{
    deselect();
        
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
    options.value = dropdown.src;
    $(options).change(function() {dropdown.src = options.value;});
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
    $(x).change(function() {dropdown.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
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
    $(y).change(function() {dropdown.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
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
    $(z).change(function() {dropdown.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {canvas.removeChild(dropdown); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function gallerySelect(gallery)
{
    deselect();
        
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
    source.id = "content";
    source.value = gallery.src;
    $(source).change(function() {gallery.src = source.value;});
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
    $(x).change(function() {gallery.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
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
    $(y).change(function() {gallery.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
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
    $(w).change(function() {gallery.style.width = Math.min(parseInt(w.value, 10), width) + "px";});
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
    $(h).change(function() {gallery.style.height = Math.min(parseInt(h.value, 10), height) + "px";});
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
    $(z).change(function() {gallery.style.zIndex = parseInt(z.value, 10);});
    form.appendChild(z);
    
    // Delete button    
    var del = document.createElement("div");
    del.id = "delete_button";
    del.innerHTML = "Delete";
    $(del).click(function() {canvas.removeChild(gallery); deselect();});
    form.appendChild(del);
    
    properties.appendChild(form);
}

function deselect()
{
    while (properties.childNodes.length > 2)
    {
        properties.removeChild(properties.lastChild);
    }
}

