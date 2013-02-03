var values = new Array();
var properties = new Array("name", "description", "category", "video_mode", "sync_stream", "ip", "server_ip");

var ips_string;
var ips_array;
var names_array;

function populateFields(ips, names)
{   
    names_array = unescape(names).split("|");
    ips_array = ips.split("|");
    
    // Use different logo for multple kiosks
    if (ips_array.length > 1)
    {
        document.getElementById("logo").setAttribute("src", "../images/multiple_big_screens.png");
        document.getElementById("ping_button").innerHTML += "s";
    }
    else
    {
        document.getElementById("logo").setAttribute("src", "../images/big_screen.png");
    }
    
    // Add kiosks in the top_bar
    var top_bar = document.getElementById("top_bar");
    for (i = 0; i < names_array.length; ++i)
    {
        var screen = document.createElement("div");
        screen.setAttribute("class", "screen");
        screen.setAttribute("id", i);
        screen.innerHTML = names_array[i]; 
        
        var ping_status = document.createElement("div");
        ping_status.setAttribute("class", "ping_status");
        ping_status.setAttribute("id", "ping_status_" + i);
        
        screen.appendChild(ping_status);
           
        top_bar.appendChild(screen);
    }
    
     
    ips_string = ips;
    
    // Get all parameters
    for (i = 0; i < properties.length; ++i)
    {
        $.ajax(
            {
                type: "POST", 
                url: "get_parameter.php",
                data: "ips=" + ips_string + "&property=" + properties[i],
                success: function(data) 
                {
                    var json = JSON.parse(data);
                    showProperty(json["property"], json["value"]);
                }
            });
    }
}

function showProperty(property, value)
{
    var input = document.getElementById(property + "_input");
    input.setAttribute("value", value);
    
    if (value == "(multiple)")
    {
        input.disabled = true;
    }
    
    values[property] = value;
}

function getProperty(property)
{
    return document.getElementById(property + "_input").value;
}

function pingKiosks()
{
    showLoading();
    
    for (i = 0; i < names_array.length; ++i)
    {
        $.ajax(
            {
                type: "POST", 
                url: "ping_kiosk.php",
                data: "kiosk_ip=" + ips_array[i] + "&id=" + i,
                success: function(data) 
                {
                    console.log(data);
                    
                    // If 'data' corrupted, uncover screen
                    try
                    {
                        var json = JSON.parse(data);
                        showPing(json["id"], json["ping"]);
                    }
                    catch(err)
                    {
                        hideLoading();
                    }
                }
            });
    }
}

function showPing(id, ping)
{
    var ping_status = document.getElementById("ping_status_" + id);
    ping_status.innerHTML = ping;
    
    if (ping == "unreachable")
    {
        ping_status.style.backgroundColor = "rgb(255, 0, 0)";        
    }
    else
    {     
        var numeric_ping = parseInt(ping);
        
        if (numeric_ping <= 10)
        {
            ping_status.style.backgroundColor = "rgb(0, 255, 0)";
        }
        else
        if (numeric_ping <= 100)
        {
            var temp = (numeric_ping / 90 * numeric_ping);
            ping_status.style.backgroundColor = "rgb(" + temp + ", " + (255 - temp) + ", 0)";
        }
        else
        {
            ping_status.style.backgroundColor = "rgb(255, 0, 0)";
        }
    }
    
    if (id == names_array.length - 1)
    {
        hideLoading();
    }    
}

function applyChanges()
{
    for (i = 0; i < properties.length; ++i)
    {
        console.log(getProperty(properties[i]) + " " + values[properties[i]]);
        if (getProperty(properties[i]) != values[properties[i]])
        {        
            console.log("ips=" + ips_string + "&property=" + properties[i] + "&value=" + getProperty(properties[i]));
            $.ajax(
                {
                    type: "POST", 
                    url: "set_parameter.php",
                    data: "ips=" + ips_string + "&property=" + properties[i] + "&value=" + getProperty(properties[i]),
                    success: function(property)
                    {
                        toastr.success(property + " changed");
                    }
                });        
        }
    }
}

function goBack()
{
    window.location = "../screenmanagement.html";
}

function showLoading()
{
    document.getElementById("cover").style.visibility = "visible";
}

function hideLoading()
{
    document.getElementById("cover").style.visibility = "hidden";    
}
