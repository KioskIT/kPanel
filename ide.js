var canvas, context, width, height;

function initalizeCanvas()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.innerWidth;
    height = canvas.innerHeight;
}

function addText()
{
    context.font = "bold 12px sans-serif";
    context.fillStyle = "black";
    context.textBaseline = "top";
    context.textAlign = "left";
    context.fillText("Sample text", 250, 250);
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

