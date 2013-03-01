var kiosk_counter = 0;

var current_ip = "";

var selected_background = '#FA6800';
var deselected_background = '#9C9C9C';

var ip_regex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;

var categories = [];
var current_category = "uncategorized";

function goHome()
{
    document.location = "index.html";    
}

function getKiosks(category)
{   
    if (category == "(all)")
    {
        current_category = "uncategorized";        
    }
    else
    {
        current_category = category;
    }
    
    $.ajax(
        {
            type: "POST", 
            url: "kiosks/get_kiosks.php",
            data: "category=" + category, 
            success: function(list)
            {
                loadKiosks(list);            
            }
        });
}



function loadKiosks(list)
{
    kiosk_counter = 0;
    var kiosks = JSON.parse(list);
    
    if (categories.length == 0)
    {
        loadCategories(kiosks);
    }
    
    for (i = 0; i < kiosks.length; ++i)
    {
        var screens = document.getElementById("screens");
        
        var new_kiosk = document.createElement("div");
        
        new_kiosk.setAttribute("name", kiosks[i]["ip"]);
        
        new_kiosk.setAttribute("id", "screen_" + kiosk_counter);
        new_kiosk.setAttribute("class", "screen");
        new_kiosk.setAttribute("onClick", "select(" + kiosk_counter + ")");
   
        new_kiosk.innerHTML = "<img src = 'images/tick.png' class = 'tick' id = 'tick_" + kiosk_counter + "' style = 'visibility:hidden'/><div class = 'name'>" + kiosks[i]["name"] + "</div><img class = 'screen_img' src = 'images/screen.png' /><div class = 'description'>" + kiosks[i]["description"] + "</div><div class='screen_ip'>" + kiosks[i]["ip"] + "<div>";
    
        screens.appendChild(new_kiosk);
        
        ++kiosk_counter;
    }
    
    updateScreensCount("absolute", kiosk_counter);
}

function loadCategories(kiosks)
{
    for (i = 0; i < kiosks.length; ++i)
    {        
        if (categories.indexOf(kiosks[i]["category"]) <= -1)
        {
            addSpecificCategory(kiosks[i]["category"]);
            categories.push(kiosks[i]["category"]);
        }
    }
}

function selectAll()
{
    var kiosks = document.getElementsByClassName("screen");
    
    for(i = 0; i < kiosks.length; ++i)
    {
        kiosks[i].style.background = selected_background;
        kiosks[i].getElementsByClassName("tick")[0].style.visibility = 'visible';
    }
}

function cancel()
{
    var kiosks = document.getElementsByClassName("screen");
    
    for(i = 0; i < kiosks.length; ++i)
    {
        kiosks[i].style.background = deselected_background;
        kiosks[i].getElementsByClassName("tick")[0].style.visibility = 'hidden';
    }
}

function tickScreen(id)
{
        document.getElementById('screen_'+id).style.backgroundColor = selected_background;
        document.getElementById('tick_'+id).style.visibility = 'visible';		
}

function untickScreen(id)
{
        document.getElementById('screen_'+id).style.backgroundColor = deselected_background;
        document.getElementById('tick_'+id).style.visibility = 'hidden';			
}

function select(id)
{		
    if(document.getElementById('tick_' + id).style.visibility == 'hidden')
    {
        tickScreen(id);
    }
    else
    {
        untickScreen(id);
    }
}

function deleteScreens()
{   
    var kiosks = document.getElementsByClassName("screen");
    
    for (i = kiosks.length - 1; i >= 0; --i)
    {    
        if (kiosks[i].getElementsByClassName("tick")[0].style.visibility == "visible")
        {            
            $.ajax(
                {
                    type: "POST", 
                    url: "kiosks/delete_kiosk.php",
                    data: "ip=" + kiosks[i].getAttribute("name")
                });
                
            removeKiosk(kiosks[i]);
        }
    }
    
    updateScreensCount("relative", -1);
}

function removeKiosk(kiosk)
{
    document.getElementById("screens").removeChild(kiosk);
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
                data: "ip=" + current_ip + "&category=" + current_category,
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
    
    updateScreensCount("relative", 1);
}

function screenConfiguration()
{
    var kiosks = document.getElementsByClassName("screen");
    var ips = "";
    var names = "";
    
    for (i = 0; i < kiosks.length; ++i)
    {
        if (kiosks[i].getElementsByClassName("tick")[0].style.visibility == "visible")
        {
            ips += kiosks[i].getAttribute("name") + "|";
            names += kiosks[i].getElementsByClassName("name")[0].innerHTML + "|"; 
        }
    }
    
    if (ips != "")
    {
        window.location = "kiosks/kiosk_configuration.php?ips=" + ips.substring(0, ips.length - 1) + "&names=" + escape(names.substring(0, names.length - 1));
    }
}

function addCategory()
{
    var new_category = prompt("Please enter the name of the category:");
    
    if (new_category.length > 0)
    {
        addSpecificCategory(new_category);
    }
}

function addSpecificCategory(category)
{   
    var dropDownMenu = document.getElementById("dropDownMenu");
    
    var new_option = document.createElement("option");
    
    new_option.setAttribute("value", category);
    new_option.innerHTML = category;
    
    dropDownMenu.appendChild(new_option);     
}

function filter()
{   
    var dropDownMenu = document.getElementById("dropDownMenu");
    
    var screens = document.getElementById("screens");
    
    while (screens.children.length > 1) 
    {
        screens.removeChild(screens.lastChild);
    }
    
    getKiosks(dropDownMenu.options[dropDownMenu.selectedIndex].text);
}

function updateScreensCount(mode, amount)
{
    var screens_count = document.getElementById("screens_count");
    
    if (mode == "absolute")
    {
        screens_count.innerHTML = amount;
    }
    else
    if (mode == "relative")
    {
        screens_count.innerHTML = parseInt(screens_count) + amount;
    }
    
    if (parseInt(screens_count.innerHTML) == 1)
    {
        document.getElementById("screens_count_noun").innerHTML = " result";
    }
    else
    {
        document.getElementById("screens_count_noun").innerHTML = " results";
    }    
}
