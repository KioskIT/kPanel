// Defaults

var animations = new Array("none", "fly_in_from_top", "fly_in_from_bottom", "fly_in_from_left", "fly_in_from_right", "fly_out_to_top", "fly_out_to_bottom", "fly_out_to_left", "fly_out_to_right", "fade_in", "fade_out", "wiggle", "scale_emphasis", "indent");

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
var selected_version = "";

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
        canvas.style.left = ((viewportWidth - 150 - 250 - width) / 2 + 150) + "px";
        canvas.style.webkitUserSelect = "none";
            
        elements.push({
            type: "canvas",
            name: selected_version,
            width: width,
            height: height,
            color: canvas.style.backgroundColor});   
    }
    else
    {   
        elements[0].name = selected_version;
        
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
                data: "selected_version=" + selected_version,
                success: function(array){elements = $.parseJSON(array); loadVersion();}
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
    
    text.style.cursor = "default";
    text.style.position = "absolute";
    text.style.left = elements[index].left;
    text.style.top = elements[index].top;
    text.style.width = elements[index].width;
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
    
    video.setAttribute("src", "images/video_sample.png");
    
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
    var button = document.createElement("input");
    button.type = "button";
    button.style.fontFamily = elements[index].font;
    button.style.fontSize = elements[index].fontsize;
    button.style.color = elements[index].color;
    
    button.value = elements[index].content;
    
    button.style.position = "absolute";
    button.style.left = elements[index].left;
    button.style.top = elements[index].top;
    button.style.height = elements[index].height;
    button.style.width = elements[index].width;
    button.style.zIndex = elements[index].zIndex;
    button.style.webkitUserSelect = "none";
    
    canvas.appendChild(button);
    
    $(button).draggable({containment: "#canvas", cancel: false});
    $(button).click(function() {buttonSelect(button, index);});
    $(button).bind("dragstart", function(event, ui) {buttonSelect(button, index);});
    $(button).bind("dragstop", function(event, ui) {buttonSelect(button, index);});    
}

function loadHyperlink(index)
{
    var a = document.createElement("a");
    a.style.fontFamily = elements[index].font;
    a.style.fontSize = elements[index].fontsize;
    a.style.color = elements[index].color;
    
    a.innerHTML = elements[index].content;
    
    a.style.cursor = "default";
    a.style.textDecoration = "underline";
    a.style.position = "absolute";
    a.style.left = elements[index].left;
    a.style.top = elements[index].top;
    a.style.width = elements[index].width;
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
    
    $(dropdown).draggable({containment: "#canvas", cancel: false});
    $(dropdown).click(function() {dropdownSelect(dropdown, index); return false;});
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
    
    text.style.cursor = "default";
    text.style.position = "absolute";
    text.style.left = width / 2 + "px";
    text.style.top = height / 2 + "px";
    text.style.width = width > 300 ? "300px" : (width + "px");
    text.style.webkitUserSelect = "none";
    text.style.zIndex = "2147483646";
    
    canvas.appendChild(text);
    
    elements.push({
        type: "text",
        top: text.style.top,
        left: text.style.left,
        width: text.style.width,
        zIndex: text.style.zIndex,
        font: text.style.fontFamily,
        fontsize: text.style.fontSize,
        color: text.style.color,
        content: text.innerHTML,
        animation_name: "none",
        animation_duration: "0",
        animation_mode: ""});
        
    var index = elements.length - 1;
    
    $(text).draggable({containment: "#canvas"});
    $(text).click(function() {textSelect(text, index);});
    $(text).bind("dragstart", function(event, ui) {textSelect(text, index);});
    $(text).bind("dragstop", function(event, ui) {textSelect(text, index);});
}

function addImage()
{
    var image = document.createElement("img");
    
    image.setAttribute("src", "images/image_sample.png");
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
        src: image.src,
        animation_name: "none",
        animation_duration: "0",
        animation_mode: ""});
        
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
        src: video.src,
        animation_name: "none",
        animation_duration: "0",
        animation_mode: ""});
    
    var index = elements.length - 1;
    
    $(video).draggable({containment: "#canvas"});
    $(video).click(function() {videoSelect(video, index);});
    $(video).bind("dragstart", function(event, ui) {videoSelect(video, index);});
    $(video).bind("dragstop", function(event, ui) {videoSelect(video, index);});
}

function addButton()
{
    var button = document.createElement("input");
    button.style.fontFamily = DEFAULT_FONT;
    button.style.fontSize = DEFAULT_FONT_SIZE;
    button.style.color = "#000000";
    
    button.value = "Sample button";
    button.type = "button";
    
    button.style.position = "absolute";
    button.style.left = width / 2 + "px";
    button.style.top = height / 2 + "px";
    button.style.width = width > 150 ? "150px" : (width + "px");
    button.style.webkitUserSelect = "none";
    button.style.zIndex = "2147483646";
    
    canvas.appendChild(button);
    
    elements.push({
        type: "button",
        top: button.style.top,
        left: button.style.left,
        height: button.style.height,
        width: button.style.width,
        zIndex: button.style.zIndex,
        font: button.style.fontFamily,
        fontsize: button.style.fontSize,
        color: button.style.color,
        content: button.value,
        target: "about:blank",
        animation_name: "none",
        animation_duration: "0",
        animation_mode: ""});
    
    var index = elements.length - 1;
    $(button).draggable({containment: "#canvas", cancel: false});
    $(button).click(function() {buttonSelect(button, index);});
    $(button).bind("dragstart", function(event, ui) {buttonSelect(button, index);});
    $(button).bind("dragstop", function(event, ui) {buttonSelect(button, index);});   
}

function addHyperlink()
{
    var a = document.createElement("a");
    a.style.fontFamily = DEFAULT_FONT;
    a.style.fontSize = DEFAULT_FONT_SIZE;
    a.style.color = "#000000";
    
    a.innerHTML = "Sample hyperlink";
    
    a.style.cursor = "default";
    a.style.textDecoration = "underline"
    a.style.position = "absolute";
    a.style.left = width / 2 + "px";
    a.style.top = height / 2 + "px";
    a.style.width = width > 300 ? "300px" : (width + "px");
    a.style.webkitUserSelect = "none";
    a.style.zIndex = "2147483646";
    
    canvas.appendChild(a);
    
    elements.push({
        type: "hyperlink",
        top: a.style.top,
        left: a.style.left,
        width: a.style.width,
        zIndex: a.style.zIndex,
        font: a.style.fontFamily,
        fontsize: a.style.fontSize,
        color: a.style.color,
        content: a.innerHTML,
        target: "about:blank",
        animation_name: "none",
        animation_duration: "0",
        animation_mode: ""});
    
    var index = elements.length - 1;
    
    $(a).draggable({containment: "#canvas"});
    $(a).click(function() {hyperlinkSelect(a, index); return false;});
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
        options: ["option1", "option2", "option3"],
        animation_name: "none",
        animation_duration: "0",
        animation_mode: ""});
    
    var index = elements.length - 1;
    
    $(dropdown).draggable({containment: "#canvas", cancel: false});
    $(dropdown).click(function() {dropdownSelect(dropdown, index); return false;});
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
    image.setAttribute("src", "images/image_sample.png");  
    gallery.appendChild(image);
    
    image = document.createElement("img");
    image.setAttribute("src", "images/image_sample.png");  
    gallery.appendChild(image);
    
    image = document.createElement("img");
    image.setAttribute("src", "images/image_sample.png");  
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
        src: ["images/image_sample.png", "images/image_sample.png", "images/image_sample.png"],
        animation_name: "none",
        animation_duration: "0",
        animation_mode: ""});
    
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

function showButtonsBar(element, properties, index)
{
    // Buttons bar
    var buttons_bar = document.createElement("div");
    buttons_bar.setAttribute("id", "buttons_bar");
    
    // Apply button   
    var apply = document.createElement("div");
    apply.id = "apply_button";
    apply.innerHTML = "Apply";
    $(apply).click(function() {/* Getting focus is enough for changes to apply*/});
    buttons_bar.appendChild(apply);
    
    if (index != 0)
    {
        // Delete button    
        var del = document.createElement("div");
        del.id = "delete_button";
        del.innerHTML = "Delete";
        $(del).click(function() {elements.splice(index, 1); canvas.removeChild(element); deselect();});
        buttons_bar.appendChild(del);
    }
    
    properties.appendChild(buttons_bar);
}

function showTitle(properties, title_content)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "title_wrapper";
    
    var title = document.createElement("div");
    title.id = "properties_title";
    title.innerHTML = title_content;
    wrapper.appendChild(title);
    
    properties.appendChild(wrapper);    
}

function showFontSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "font_wrapper";
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Font";
    wrapper.appendChild(label);
    
    // Font family    
    var font = document.createElement("select");
    font.className = "properties_input";
    font.id = "font";
    font.value = element.style.fontFamily;

    var option = document.createElement("option");
    option.value = option.innerHTML = "Arial, Verdana, Geneva, Helvetica, sans-serif";
    font.appendChild(option);
    
    option = document.createElement("option");
    option.value = option.innerHTML = "Georgia, 'Times New Roman', Times, serif";
    font.appendChild(option);
    
    option = document.createElement("option");
    option.value = option.innerHTML = "'Courier New', Courier, monospace";
    font.appendChild(option);    
    
    for (var i = 0; i < font.options.length; ++i)
    {
        if (elements[index].font == font.options[i].text)
        {
            font.options[i].selected = true;
            break;
        }
    }
    
    $(font).change(function() {elements[index].font = element.style.fontFamily = font.options[font.selectedIndex].text;});
    wrapper.appendChild(font);
    
    // Font size    
    var fontsize = document.createElement("input");
    fontsize.type = "number";
    fontsize.className = "properties_input";
    fontsize.id = "fontsize";
    
    fontsize.value = parseInt(element.style.fontSize);
    
    $(fontsize).change(function() {elements[index].fontsize = element.style.fontSize = fontsize.value + "%";});
    wrapper.appendChild(fontsize);       
    
    form.appendChild(wrapper); 
}

function showColorSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "color_wrapper";
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Color";
    wrapper.appendChild(label);
    
    var color = document.createElement("input");
    color.type = "color";
    color.className = "properties_input";
    color.id = "color";
    color.value = element.style.color;
    $(color).change(function() {elements[index].color = element.style.color = color.value;});
    wrapper.appendChild(color);
    
    form.appendChild(wrapper);
}

function showCoordinatesSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "coordinates_wrapper";  
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Coordinates";
    wrapper.appendChild(label);
    
    // X coord    
    var x = document.createElement("input");
    x.type = "text";
    x.className = "properties_input";
    x.id = "x";
    x.value = parseInt(element.style.left, 10);
    $(x).change(function() {elements[index].left = element.style.left = Math.min(parseInt(x.value, 10), width) + "px";});
    wrapper.appendChild(x);
    
    label = document.createElement("div");
    label.id = "coordinates_times";
    label.className = "times";
    label.innerHTML = "x";
    wrapper.appendChild(label);
    
    // Y coord
    var y = document.createElement("input");
    y.type = "text";
    y.className = "properties_input";
    y.id = "y";
    y.value = parseInt(element.style.top, 10);
    $(y).change(function() {elements[index].top = element.style.top = Math.min(parseInt(y.value, 10), height) + "px";});
    wrapper.appendChild(y);
    
    form.appendChild(wrapper);
}

function showOrderSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "order_wrapper";
        
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Order";
    wrapper.appendChild(label);
    
    var z = document.createElement("input");
    z.type = "number";
    z.className = "properties_input";
    z.id = "order";
    z.max = "2147483647";
    z.min = "-2147483648";
    z.value = parseInt(element.style.zIndex, 10);
    $(z).change(function() {elements[index].zIndex = element.style.zIndex = parseInt(z.value, 10);});
    wrapper.appendChild(z);
       
    form.appendChild(wrapper);   
}

function showSizeSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "size_wrapper";    
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Size";
    wrapper.appendChild(label);
    
    // Width    
    var w = document.createElement("input");
    w.type = "number";
    w.className = "properties_input";
    w.id = "w";
    w.value = parseInt(element.style.width, 10);
    $(w).change(function() 
        {
            if (index == 0)
            {
                width = parseInt(w.value, 10);
            }
            elements[index].width = element.style.width = Math.min(parseInt(w.value, 10), width) + "px";
        });
    wrapper.appendChild(w);
        
    
    label = document.createElement("div");
    label.id = "size_times";
    label.className = "times";
    label.innerHTML = "x";
    wrapper.appendChild(label);
    
    // Height
    var h = document.createElement("input");
    h.type = "number";
    h.className = "properties_input";
    h.id = "h";
    h.value = parseInt(element.style.height, 10);
    $(h).change(function() 
        {
            if (index == 0)
            {
                height = parseInt(h.value, 10);
            }
            elements[index].height = element.style.height = Math.min(parseInt(h.value, 10), height) + "px";
        });
    wrapper.appendChild(h);
    
    form.appendChild(wrapper);   
}

function showContentSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "content_wrapper";    
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Content";
    wrapper.appendChild(label);
    
    var content = document.createElement("textarea");
    content.type = "text";
    content.className = "properties_input";
    content.id = "content";
    content.value = elements[index].content;
    
    $(content).change(function() 
        {
            if (element.type == "button")
            {
                $(element).val($(content).val()).html(function(index, old) 
                    { 
                        return old.replace(/\n/g, '<br />') 
                    });
            }
            else
            {
                $(element).text($(content).val()).html(function(index, old) 
                    { 
                        return old.replace(/\n/g, '<br />') 
                    });
            }                
             
            elements[index].content = content.value;
        });
    wrapper.appendChild(content);
    
    form.appendChild(wrapper);    
}

function showAnimationSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "animation_wrapper";  
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Animation";
    wrapper.appendChild(label);
    
    var animation_name = document.createElement("select");
    
    for (var i = 0; i < animations.length; ++i)
    {
        var option = document.createElement("option");
        option.value = option.innerHTML = animations[i];
        
        if (elements[index].animation_name == animations[i])
        {
            option.selected = true;
        }
        
        animation_name.appendChild(option);
    }
    
    animation_name.className = "properties_input";
    animation_name.id = "animation_name";
    $(animation_name).change(function() {elements[index].animation_name = animation_name.options[animation_name.selectedIndex].text;});
    wrapper.appendChild(animation_name);
    
    var animation_duration = document.createElement("input");
    animation_duration.type = "number";
    animation_duration.min = "0";
    animation_duration.step = "0.05";
    animation_duration.className = "properties_input";
    animation_duration.id = "animation_duration";
    animation_duration.value = parseFloat(elements[index].animation_duration);
    $(animation_duration).change(function() {elements[index].animation_duration = animation_duration.value + "s";});
    wrapper.appendChild(animation_duration);
    
    var animation_infinite_label = document.createElement("div");
    animation_infinite_label.className = "properties_label";
    animation_infinite_label.id = "animation_infinite_label";
    animation_infinite_label.innerHTML = "infinite";
    wrapper.appendChild(animation_infinite_label);
    
    var animation_mode = document.createElement("input");
    animation_mode.type = "checkbox";
    animation_mode.className = "properties_input";
    animation_mode.id = "animation_mode";
    wrapper.appendChild(animation_mode);
    
    var animation_count = document.createElement("input");
    animation_count.style.display = "none";
    animation_count.type = "number";
    animation_count.min = "1";
    animation_count.className = "properties_input";
    animation_count.id = "animation_count";
    animation_count.value = parseInt(elements[index].animation_mode);
    $(animation_count).change(function() {elements[index].animation_mode = animation_count.value;});
    wrapper.appendChild(animation_count);
    
    $(animation_mode).change(function() 
        {            
            if (animation_mode.checked == true)
            {
                animation_count.style.display = "none";
                elements[index].animation_mode = "infinite";
            }
            else
            {                
                animation_count.style.display = "inline-block";
            }
        });
    
    if (elements[index].animation_mode == "infinite")
    {
        animation_count.style.display = "none";
        animation_mode.checked = true;
    }
    else
    {                
        animation_count.style.display = "inline-block";
    }
    
    form.appendChild(wrapper);
}

function showImageSourceSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "source_wrapper"; 
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Source";
    wrapper.appendChild(label);
    
    var source = document.createElement("input");
    source.type = "text";
    source.className = "properties_input";
    source.id = "content";
    source.value = elements[index].src;
    $(source).change(function() {elements[index].src = element.src = source.value;});
    wrapper.appendChild(source);
        
    form.appendChild(wrapper);
}

function showVideoSourceSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "source_wrapper"; 
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Source";
    wrapper.appendChild(label);
    
    var source = document.createElement("input");
    source.type = "text";
    source.className = "properties_input";
    source.id = "content";
    source.value = elements[index].src;
    $(source).change(function() {elements[index].src = source.value;});
    wrapper.appendChild(source);
        
    form.appendChild(wrapper);
}

function showTargetSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "source_wrapper"; 
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Target";
    wrapper.appendChild(label);
    
    var target = document.createElement("input");
    target.type = "text";
    target.className = "properties_input";
    target.id = "target";
    target.value = elements[index].target;
    $(target).change(function() {elements[index].target = target.value;});
    wrapper.appendChild(target);
        
    form.appendChild(wrapper);
}

function showOptionsSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "options_wrapper";
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Options";
    wrapper.appendChild(label);
    
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
            
            while (element.childNodes.length > 0)
            {
                element.removeChild(dropdown.lastChild);
            }
            
            for (var i = 0; i < elements[index].options.length; ++i)
            {    
                var option = document.createElement("option");
                option.setAttribute("value", i);
                option.innerHTML = elements[index].options[i];
                element.appendChild(option);
            }
        });
    wrapper.appendChild(options);
        
    form.appendChild(wrapper);
}

function showImagesSettings(element, form, index)
{
    // Wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "images_wrapper";
    
    var label = document.createElement("div");
    label.className = "properties_label";
    label.innerHTML = "Images";
    wrapper.appendChild(label);
    
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

            refreshGallery(element, index);            
        });
    wrapper.appendChild(source);
        
    form.appendChild(wrapper);
}

function textSelect(text, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = text.style.left;
    elements[index].top = text.style.top;
    
    selected = text;
    text.style.border = "2px solid grey";
      
    showTitle(properties, "Text item");
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showContentSettings(text, form, index);    
    showFontSettings(text, form, index);    
    showColorSettings(text, form, index);    
    showCoordinatesSettings(text, form, index);    
    showOrderSettings(text, form, index);    
    showSizeSettings(text, form, index);    
    showAnimationSettings(text, form, index);
    
    properties.appendChild(form);
    
    showButtonsBar(text, properties, index);
}

function imageSelect(image, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = image.style.left;
    elements[index].top = image.style.top;
    
    selected = image;
    image.style.border = "2px solid grey";
    
    showTitle(properties, "Image item");
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showImageSourceSettings(image, form, index);
    showCoordinatesSettings(image, form, index);
    showSizeSettings(image, form, index);
    showOrderSettings(image, form, index);
    showAnimationSettings(image, form, index);    
    
    properties.appendChild(form);
    
    showButtonsBar(image, properties, index);
}

function videoSelect(video, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = video.style.left;
    elements[index].top = video.style.top;
    
    selected = video;
    video.style.border = "2px solid grey";
    
    showTitle(properties, "Video item");
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showImageSourceSettings(video, form, index);
    showCoordinatesSettings(video, form, index);
    showSizeSettings(video, form, index);
    showOrderSettings(video, form, index);
    showAnimationSettings(video, form, index);
    
    properties.appendChild(form);
    
    showButtonsBar(video, properties, index);
}

function buttonSelect(button, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = button.style.left;
    elements[index].top = button.style.top;
    
    selected = button;
    button.style.border = "2px solid grey";
        
    showTitle(properties, "Button item");
        
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showFontSettings(button, form, index);
    showContentSettings(button, form, index);
    showTargetSettings(button, form, index);
    showColorSettings(button, form, index);
    showCoordinatesSettings(button, form, index);
    showOrderSettings(button, form, index);
    showSizeSettings(button, form, index);
    showAnimationSettings(button, form, index);
    
    properties.appendChild(form);
    
    showButtonsBar(button, properties, index);
}

function hyperlinkSelect(a, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = a.style.left;
    elements[index].top = a.style.top;
    
    selected = a;
    a.style.border = "2px solid grey";
        
    showTitle(properties, "Hyperlink item");
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showFontSettings(a, form, index);
    showContentSettings(a, form, index);
    showTargetSettings(a, form, index);
    showColorSettings(a, form, index);
    showSizeSettings(a, form, index);
    showOrderSettings(a, form, index);
    showSizeSettings(a, form, index);
    showAnimationSettings(a, form, index);
    
    properties.appendChild(form);
    
    showButtonsBar(a, properties, index);
}

function dropdownSelect(dropdown, index)
{
    deselect();
    
    // Update coords by dragging
    elements[index].left = dropdown.style.left;
    elements[index].top = dropdown.style.top;
    
    selected = dropdown;
    dropdown.style.border = "2px solid grey";
        
    showTitle(properties, "Dropdown menu item");
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showOptionsSettings(dropdown, form, index);
    showSizeSettings(dropdown, form, index);
    showOrderSettings(dropdown, form, index);
    showAnimationSettings(dropdown, form, index);

    properties.appendChild(form);
    
    showButtonsBar(dropdown, properties, index);
}

function gallerySelect(gallery, index)
{
    deselect();
    
    selected = gallery;
    gallery.style.border = "2px solid grey";
    
    // Update coords by dragging
    elements[index].left = gallery.style.left;
    elements[index].top = gallery.style.top;
        
    showTitle(properties, "Gallery item");
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showImagesSettings(gallery, form, index);    
    showCoordinatesSettings(gallery, form, index);
    showSizeSettings(gallery, form, index);
    showOrderSettings(gallery, form, index);
    showAnimationSettings(gallery, form, index);
       
    properties.appendChild(form);
    
    showButtonsBar(gallery, properties, index);
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
    
    showTitle(properties, "Canvas");
    
    var form = document.createElement("form");
    form.id = "properties_form";
    
    showSizeSettings(canvas, form, 0);
    showColorSettings(canvas, form, 0);
    
    properties.appendChild(form);
    
    showButtonsBar(canvas, properties, 0);
}

function deselect()
{
    if (selected != null)
    {
        selected.style.border = "0px";    
    }
    
    while (properties.childNodes.length > 0)
    {
        properties.removeChild(properties.lastChild);
    }
}

function saveCanvas()
{
    if (document.getElementById("saveButton").className == "saveButton")
    {
        document.getElementById("saveButton").innerHTML = "Saving..";
        
        $.ajax(
            {
                type: "POST", 
                url: "save_version.php",
                data: "elements=" + encodeURIComponent(JSON.stringify(elements)),
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
