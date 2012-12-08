var canvas, context, width, height;

var elements = [];

function initalizeCanvas()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    var ratio = 1.7778;
    
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    width = viewportWidth - 300 - 150 - 100;
    height = width / ratio;
    
    canvas.style.position = "absolute";
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    
    canvas.style.top = ((viewportHeight - height) / 2) + "px";
    canvas.style.left = "200px";
    
    canvas.addEventListener('click', 
        function(event) 
        {
            var x = event.offsetX;
            var y = event.offsetY;
            
            var found_element = false;
            
            for (var i = 0; i < elements.length; ++i)
            {
               if (y > elements[i].top && y < elements[i].top + elements[i].height && x > elements[i].left && x < elements[i].left + elements[i].width) 
                {
                    select(i);
                    found_element = true;
                    break;
                }                
            }    
            
            if (found_element == false)
            {
                deselect();
            }
        }, 
    false);
}

function select(index)
{
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(elements[index].top, elements[index].left, elements[index].top + elements[index].width, elements[index].left + elements[index].height);
}

function deselect()
{
    
}

function addText()
{
    context.font = "bold 12px sans-serif";
    context.fillStyle = "black";
    context.textBaseline = "top";
    context.textAlign = "left";
    context.fillText("Sample text", 50, 50);
    
    elements.push({
        width: 100,
        height: 100,
        top: 50,
        left: 50});
}

function addImage()
{
    // TODO
}

function addVideo()
{
    // Button disabled
}

function addButton()
{
    // Button disabled    
}

function addHyperlink()
{
    // TODO    
}

function addDropdownMenu()
{
    // Button disabled    
}

function addGallery()
{
    // Button disabled    
}
