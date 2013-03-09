var html;

function compile()
{    
    html = '<!DOCTYPE HTML>\n\n<html>\n\n\n\t<head>\n\n\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n\n\t\t<title>kioskIt</title>\n\n\t\t<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>\n\n\t\t<script type="text/javascript" src="../galleria/galleria-1.2.8.js"></script>\n\n\t\t<link href="css/animations.css" type="text/css" rel="stylesheet" />\n\n\t\t<link href="css/global.css" type="text/css" rel="stylesheet" />\n\n\t</head>\n\n\t<body>\n\n\t\t';
    
    // The webpage resides inside a container for centering and setting width
    html += '<div id="container" style="position:relative; color:' + elements[0].color + '; margin-left:auto; margin-right:auto; width:' + elements[0].width + '">\n\n\t\t\t';
    
    for (var i = 1; i < elements.length; ++i)
    {
        if (elements[i].type == "text")
        {
            createText(i);            
        }
        else
        if (elements[i].type == "image")
        {
            createImage(i);            
        }
        else
        if (elements[i].type == "video")
        {
            createVideo(i);            
        }
        else
        if (elements[i].type == "button")
        {
            createButton(i);            
        }
        else
        if (elements[i].type == "hyperlink")
        {
            createHyperlink(i);            
        }
        else
        if (elements[i].type == "dropdown")
        {
            createDropdown(i);            
        }
        else
        if (elements[i].type == "gallery")
        {
            createGallery(i);            
        }
    }        
                
    html += '\n\t\t</div>\n\n\t</body>\n\n\n</html>';
      
    $.ajax(
        {
            type: "POST", 
            url: "compile.php", 
            data: "selected_version=" + selected_version + "&html=" + escape(html),
            success: function(message)
                {
                    document.getElementById("compileButton").className = "disabledCompileButton";
                    document.getElementById("compileButton").innerHTML = "Compiled";
                }
        });
}

function createText(index)
{
    // Parameters
    html += '<div ' + 
            'style="' +
            'position:absolute; ' +
            'top:' + elements[index].top + '; ' +
            'left:' + elements[index].left + '; ' +
            'width:' + elements[index].width + '; ' +
            'z-index:' + elements[index].zIndex + '; ' +
            'font-family:' + elements[index].font + '; ' +
            'font-size:' + elements[index].fontsize + '; ' +
            'color:' + elements[index].color + '; ' +
            '-webkit-animation:' + elements[index].animation_name + ' ' + elements[index].animation_duration + ' ' + elements[index].animation_mode + '; ' +
            '">\n\n\t\t\t\t';
    
    // Content
    html += elements[index].content + '\n\n\t\t\t';
            
    // Closing tag
    html += '</div>\n\n\t\t\t';     
}

function createImage(index)
{
    // Parameters
    html += '<img ' +
            'src="' + elements[index].src + '" ' +
            'style="' +
            'position:absolute; ' +
            'top:' + elements[index].top + '; ' +
            'left:' + elements[index].left + '; ' +
            'width:' + elements[index].width + '; ' +
            'height:' + elements[index].height + '; ' +
            'z-index:' + elements[index].zIndex + '; ' +
            '-webkit-animation:' + elements[index].animation_name + ' ' + elements[index].animation_duration + ' ' + elements[index].animation_mode + '; ' +
            '">\n\n\t\t\t';
            
    // Closing tag
    html += '</img>\n\n\t\t\t';      
}

function createVideo(index)
{
    // Parameters
    html += '<iframe ' +
            'src="' + elements[index].src + '" ' +
            'style="' +
            'position:absolute; ' +
            'top:' + elements[index].top + '; ' +
            'left:' + elements[index].left + '; ' +
            'width:' + elements[index].width + '; ' +
            'height:' + elements[index].height + '; ' +
            'z-index:' + elements[index].zIndex + '; ' +
            '-webkit-animation:' + elements[index].animation_name + ' ' + elements[index].animation_duration + ' ' + elements[index].animation_mode + '; ' +
            '">\n\n\t\t\t';
            
    // Closing tag
    html += '</iframe>\n\n\t\t\t';      
}

function createButton(index)
{
    // Parameters
    html += '<input type="button" ' +
            'value="' + elements[index].content + '" ' +
            'onclick="window.location=\'' + elements[index].target + '\'" ' +
            'style="' +
            'position:absolute; ' +
            'top:' + elements[index].top + '; ' +
            'left:' + elements[index].left + '; ' +
            'height:' + elements[index].height + '; ' +
            'width:' + elements[index].width + '; ' +
            'z-index:' + elements[index].zIndex + '; ' +
            'font-family:' + elements[index].font + '; ' +
            'font-size:' + elements[index].fontsize + '; ' +
            'color:' + elements[index].color + '; ' +
            '-webkit-animation:' + elements[index].animation_name + ' ' + elements[index].animation_duration + ' ' + elements[index].animation_mode + '; ' +
            '">\n\n\t\t\t';
            
    // Closing tag
    html += '</input>\n\n\t\t\t';    
}

function createHyperlink(index)
{
    // Parameters
    html += '<a ' +
            'href="' + elements[index].target + '" ' +
            'style="' +
            'position:absolute; ' +
            'top:' + elements[index].top + '; ' +
            'left:' + elements[index].left + '; ' +
            'width:' + elements[index].width + '; ' +
            'z-index:' + elements[index].zIndex + '; ' +
            'font-family:' + elements[index].font + '; ' +
            'font-size:' + elements[index].fontsize + '; ' +
            'color:' + elements[index].color + '; ' +
            '-webkit-animation:' + elements[index].animation_name + ' ' + elements[index].animation_duration + ' ' + elements[index].animation_mode + '; ' +
            '">\n\n\t\t\t';
    
    // Content
    html += elements[index].content + '\n\n\t\t\t';
            
    // Closing tag
    html += '</a>\n\n\t\t\t';      
}

function createDropdown(index)
{
    // Parameters
    html += '<select ' +
            'style="' +
            'position:absolute; ' +
            'top:' + elements[index].top + '; ' +
            'left:' + elements[index].left + '; ' +
            'z-index:' + elements[index].zIndex + '; ' +
            'font-family:' + elements[index].font + '; ' +
            'font-size:' + elements[index].fontsize + '; ' +
            '-webkit-animation:' + elements[index].animation_name + ' ' + elements[index].animation_duration + ' ' + elements[index].animation_mode + '; ' +
            '">\n\n\t\t\t';
    
    // Content
    for (var i = 0; i < elements[index].options.length; ++i)
    {
            html += '\t<option ' +
                    'value="' + elements[index].options[i] + '">' +
                    elements[index].options[i] +
                    '</option>\n\n\t\t\t';
    }
            
    // Closing tag
    html += '</select>\n\n\t\t\t';
}

function createGallery(index)
{
    // Parameters
    html += '<div id="' + index + '"' +
            'style="' +
            'position:absolute; ' +
            'top:' + elements[index].top + '; ' +
            'left:' + elements[index].left + '; ' +
            'width:' + elements[index].width + '; ' +
            'height:' + elements[index].height + '; ' +
            'z-index:' + elements[index].zIndex + '; ' +
            '-webkit-animation:' + elements[index].animation_name + ' ' + elements[index].animation_duration + ' ' + elements[index].animation_mode + '; ' +
            '">\n\n\t\t\t';
    
    // Content
    for (var i = 0; i < elements[index].src.length; ++i)
    {
            html += '\t<img ' +
                    'src="' + elements[index].src[i] + '">' +
                    '</img>\n\n\t\t\t';
    }
            
    // Closing tag
    html += '</div>\n\n\t\t\t';
    
    // Run Galleria
    html += '<script type="text/javascript">Galleria.loadTheme("../galleria/themes/classic/galleria.classic.min.js"); Galleria.run("#' + index + '");</script>\n\n\t\t\t';
}
