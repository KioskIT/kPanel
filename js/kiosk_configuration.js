var values = new Array();
var properties = new Array("name", "description", "category", "video_mode", "sync_stream", "ip", "server_ip");

function populateFields(ips)
{
    // Use different logo for multple kiosks
    if (ips.split("|").length > 1)
    {
        document.getElementById("logo").setAttribute("src", "../images/multiple_big_screens.png");
    }
    else
    {
        document.getElementById("logo").setAttribute("src", "../images/big_screen.png");
    }
    
    // Get all parameters
    for (i = 0; i < properties.length; ++i)
    {
        $.ajax(
            {
                type: "POST", 
                url: "get_parameter.php",
                data: "ips=" + ips + "&property=" + properties[i],
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

function applyChanges()
{
    for (i = 0; i < properties.length; ++i)
    {
        if (getProperty(properties[i]) != values[properties[i]])
        {        
            $.ajax(
                {
                    type: "POST", 
                    url: "set_parameter.php",
                    data: "ips=" + ips + "&parameter=" + properties[i] + "&value=" + values[properties[i]],
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
