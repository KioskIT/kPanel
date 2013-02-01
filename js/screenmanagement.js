var kiosk_counter = 0;

var current_ip = "";
var current_kiosk;

var selected_background = '#FA6800';
var deselected_background = '#9C9C9C';

var ip_regex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;

function goHome()
{
    document.location = "index.html";    
}

function getKiosks()
{   
    $.ajax(
        {
            type: "POST", 
            url: "kiosks/get_kiosks.php",
            success: function(list)
            {
                loadKiosks(list);            
            }
        });
}

function loadKiosks(list)
{
    var kiosks = JSON.parse(list);
    
    for (i = 0; i < kiosks.length; ++i)
    {
        var screens = document.getElementById("screens");
        
        var new_kiosk = document.createElement("div");
        
        new_kiosk.setAttribute("name", kiosks[i]["ip"]);
        
        new_kiosk.setAttribute("id", "screen_" + kiosk_counter);
        new_kiosk.setAttribute("class", "screen");
        new_kiosk.setAttribute("onClick", "select(" + kiosk_counter + ")");
   
        new_kiosk.innerHTML = "<img src = 'images/tick.png' class = 'tick' id = 'tick_" + kiosk_counter + "' style = 'visibility:hidden'/><img class = 'screen_img' src = 'images/screen.png' /><div class = 'name'>Kiosk</div><div class = 'description'>The Kiosk's description</div>";
    
        screens.appendChild(new_kiosk);
        
        ++kiosk_counter;        
    }
}

function selectAll()
{
    for(i = 0; i < kiosk_counter; ++i)
    {
        document.getElementById('screen_' + i).style.background = selected_background;
        document.getElementById('tick_' + i).style.visibility = 'visible';
    }
}

function cancel()
{
    for(i = 0; i < kiosk_counter; ++i)
    {		
        document.getElementById('screen_'+i).style.background = deselected_background;
        document.getElementById('tick_'+i).style.visibility = 'hidden';
    }
}

function tickScreen(id)
{
        document.getElementById('screen_'+id).style.background = selected_background;
        document.getElementById('tick_'+id).style.visibility = 'visible';		
}

function untickScreen(id)
{
        document.getElementById('screen_'+id).style.background = deselected_background;
        document.getElementById('tick_'+id).style.visibility = 'hidden';			
}

function select(id)
{		
    if(document.getElementById('tick_'+id).style.visibility == 'hidden')
    {
        tickScreen(id);
    }
    else
    {
        untickScreen(id);
    }
}

function deleteScreen()
{   
    var initial_kiosk_counter = kiosk_counter;
    for (i = 0; i < initial_kiosk_counter; ++i)
    {
        current_kiosk = document.getElementById("screen_" + i);
        
        if (current_kiosk)
        {
            if (document.getElementById("tick_" + i).style.visibility == "visible")
            {
                removeKiosk();
                
                $.ajax(
                    {
                        type: "POST", 
                        url: "kiosks/delete_kiosk.php",
                        data: "ip=" + current_kiosk.getAttribute("name")
                    });
            }
        }
    }
}

function removeKiosk()
{
    document.getElementById("screens").removeChild(current_kiosk);
}

function addScreen()
{
    current_ip = prompt("Please enter the IP address:");
    
    if (ip_regex.test(current_ip))
    {
        $.ajax(
            {
                type: "POST", 
                url: "kiosks/add_kiosk.php",
                data: "ip=" + current_ip,
                success: function() 
                {
                    createKiosk();
                }
            });
   }
}

function createKiosk()
{
    var screens = document.getElementById("screens");
    
    var new_kiosk = document.createElement("div");

    new_kiosk.setAttribute("name", current_ip);
    
    new_kiosk.setAttribute("id", "screen_" + kiosk_counter);
    new_kiosk.setAttribute("class", "screen");
    new_kiosk.setAttribute("onClick", "select(" + kiosk_counter + ")");
  
    new_kiosk.innerHTML = "<img src = 'images/tick.png' class = 'tick' id = 'tick_" + kiosk_counter + "' style = 'visibility:hidden'/><img class = 'screen_img' src = 'images/screen.png' /><div class = 'name'>Kiosk</div><div class = 'description'>The Kiosk's description</div>";
    
    screens.appendChild(new_kiosk);
    
    ++kiosk_counter;
}

function screenConfiguration()
{
    $.ajax(
            {
                type: "POST", 
                url: "kiosks/kiosk_configuration.php",
                data: "ip=" + current_ip
            });    
}

