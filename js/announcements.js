var SELECTED_BACKGROUND = "rgb(250, 104, 0)";
var DESELECTED_BACKGROUND = "rgb(156, 156, 156)";

function toggleSelect(announcement)
{
    if (announcement.style.backgroundColor == SELECTED_BACKGROUND)
    {
        announcement.style.backgroundColor = DESELECTED_BACKGROUND;
    }
    else
    {
        announcement.style.backgroundColor = SELECTED_BACKGROUND;
    }
}

function selectAll()
{
    var announcements = document.getElementsByClassName("announcement");
    for (var i = 0; i < announcements.length; ++i)
    {
        announcements[i].style.backgroundColor = SELECTED_BACKGROUND;
    }
}

function deselectAll()
{
    var announcements = document.getElementsByClassName("announcement");
    for (var i = 0; i < announcements.length; ++i)
    {
        announcements[i].style.backgroundColor = DESELECTED_BACKGROUND;
    }
}

function deleteSelected()
{        
    var announcements = document.getElementsByClassName("announcement");
    for (var i = announcements.length - 1; i >= 0; --i)
    {
        if (announcements[i].style.backgroundColor == SELECTED_BACKGROUND)
        {
            $.ajax(
                {
                    type:"POST",
                    url:"tools/remove_announcement.php",
                    data:"id=" + announcements[i].getAttribute("data-id")
                });
                
            announcements[i].parentNode.removeChild(announcements[i]);
        }
    }
}

function edit(announcement)
{
    // Cancel the change in selection that occurred while clicking the edit button (nested divs)
    toggleSelect(announcement);
    
	$.ajax(
        {
            type:"POST",
            url:"tools/get_announcement.php",
            data:"id=" + announcement.getAttribute("data-id"),
            success:function (announcement) 
            {   
                populateFields(announcement);
            }
        });
}

function populateFields(rawAnnouncement)
{
	// JSON.parse is decoding the array from the JSON format (which was encoded with in the PHP script)
    var announcement = JSON.parse(rawAnnouncement);
    
    // Populate popup fields with values retrieved from the database
    document.getElementById("popup_title").innerHTML = "Edit announcement";
    
    if (announcement["destinationtype"] == "id")
    {
        document.getElementById("radio_kiosk").checked = true;
        document.getElementById("kiosk_selector").value = announcement["destination"];
        
    }
    else
    if (announcement["destinationtype"] == "category")
    {
        document.getElementById("radio_category").checked = true;
        document.getElementById("category_selector").value = announcement["destination"];    
    }
        
    if (announcement["type"] == "Ticker-Tape")
    {
        document.getElementById("type_selector").selectedIndex = 0;
    }
    else
    if (announcement["type"] == "Modal Message")
    {
        document.getElementById("type_selector").selectedIndex = 1;     
    }     
    
    document.getElementById("message_box").value = announcement["message"];
    var from_temp = new Date(parseInt(announcement["from"]) * 1000);
    document.getElementById("from_date").value = from_temp.getFullYear() + "-" + ((from_temp.getMonth() + 1) < 10 ? "0" + (from_temp.getMonth() + 1) : (from_temp.getMonth() + 1)) + "-" + (from_temp.getDate() < 10 ? "0" + from_temp.getDate() : from_temp.getDate());
    document.getElementById("from_time").value = from_temp.getHours() + ":" + from_temp.getMinutes();
    
    if (announcement["to"] == "indefinitely")
    {
        document.getElementById("indefinitely").checked = true;
        hideToDate();
    }
    else
    {
        document.getElementById("period").checked = true;
        
        showToDate();
        var to_temp = new Date(parseInt(announcement["to"]) * 1000);
        document.getElementById("to_date").value = to_temp.getFullYear() + "-" + ((to_temp.getMonth() + 1) < 10 ? "0" + (to_temp.getMonth() + 1) : (to_temp.getMonth() + 1)) + "-" + (to_temp.getDate() < 10 ? "0" + to_temp.getDate() : to_temp.getDate());
        document.getElementById("to_time").value = to_temp.getHours() + ":" + to_temp.getMinutes();
    
    }
    
    document.getElementById("backcolor").value = announcement["background"];
    document.getElementById("forecolor").value = announcement["foreground"];
    document.getElementById("popup_submit_button").value = "Update announcement";
	document.getElementById("popup_submit_button").setAttribute("onclick", "updateAnnouncement('" + announcement["_id"]["$id"] + "');");
	
    if (announcement["status"] == "shown")
    {
        document.getElementById("radio_kiosk").disabled = true;
        document.getElementById("kiosk_selector").disabled = true;
        document.getElementById("radio_category").disabled = true;
        document.getElementById("category_selector").disabled = true;
        document.getElementById("type_selector").disabled = true;
        document.getElementById("message_box").disabled = true;
        document.getElementById("from_date").disabled = true;
        document.getElementById("from_time").disabled = true;
        document.getElementById("indefinitely").disabled = true;
        document.getElementById("period").disabled = true;
        document.getElementById("to_date").disabled = true;
        document.getElementById("to_time").disabled = true;
        document.getElementById("backcolor_value").disabled = true;
        document.getElementById("forecolor_value").disabled = true;
        document.getElementById("popup_submit_button").style.display = "none";
    }
    else
    if (announcement["status"] == "not shown")
    {
        document.getElementById("radio_kiosk").disabled = false;
        document.getElementById("kiosk_selector").disabled = false;
        document.getElementById("radio_category").disabled = false;
        document.getElementById("category_selector").disabled = false;
        document.getElementById("type_selector").disabled = false;
        document.getElementById("message_box").disabled = false;
        document.getElementById("from_date").disabled = false;
        document.getElementById("from_time").disabled = false;
        document.getElementById("indefinitely").disabled = false;
        document.getElementById("period").disabled = false;
        document.getElementById("to_date").disabled = false;
        document.getElementById("to_time").disabled = false;
        document.getElementById("backcolor_value").disabled = false;
        document.getElementById("forecolor_value").disabled = false;
        document.getElementById("popup_submit_button").style.display = "inline";
    }
    
    showPopup();
}

function updateAnnouncement(id)
{
    var radio_kiosk = document.getElementById("radio_kiosk");
    var radio_category = document.getElementById("radio_category");
    
    var destinationtype = "";
    var destination = "";
    
    if (radio_kiosk.checked)
    {
        destinationtype = "id";
        destination = document.getElementById("kiosk_selector").value;
    }
    else
    {
        destinationtype = "category";
        destination = document.getElementById("category_selector").value;
    }
        
	var type = document.getElementById("type_selector").options[document.getElementById("type_selector").selectedIndex].text;
	var message_box = document.getElementById("message_box").value;
        var from_date = new Date(document.getElementById("from_date").value + " " + document.getElementById("from_time").value).getTime() / 1000;
	
	var to_date; 
	
	if(document.getElementById('indefinitely').checked) {
  		to_date = "indefinitely";
	}
	else if(document.getElementById('period').checked) {
        to_date = new Date(document.getElementById("to_date").value + " " + document.getElementById("to_time").value).getTime() / 1000;
	}

	var backcolor = document.getElementById("backcolor_value").value;
	var forecolor = document.getElementById("forecolor_value").value;
	
	$.ajax(
        {
            type:"POST",
            url:"tools/update_announcement.php",
			data:"id=" + id + 
                 "&destinationtype=" + destinationtype +
                 "&destination=" + destination +
				 "&type=" + type + 
				 "&message=" + message_box + 
				 "&from=" + from_date + 
				 "&to=" + to_date + 
				 "&backcolor=" + backcolor + 
				 "&forecolor=" + forecolor,
				 
            success:function () 
            {   
                location.reload();
			}
        });
}

function addAnnouncement()
{   
    var radio_kiosk = document.getElementById("radio_kiosk");
    var radio_category = document.getElementById("radio_category");
    
    if (radio_kiosk.checked || radio_category.checked)
    {
        var destinationtype = "";
        var destination = "";
        
        if (radio_kiosk.checked)
        {
            destinationtype = "id";
            destination = document.getElementById("kiosk_selector").value;
        }
        else
        {
            destinationtype = "category";
            destination = document.getElementById("category_selector").value;
        }
        
        var type = document.getElementById("type_selector").options[document.getElementById("type_selector").selectedIndex].text;
        var message_box = document.getElementById("message_box").value;
        var from_date = new Date(document.getElementById("from_date").value + " " + document.getElementById("from_time").value).getTime() / 1000;
        
        var to_date; 
        
        if(document.getElementById('indefinitely').checked) {
            to_date = "indefinitely";
        }
        else if(document.getElementById('period').checked) {
            to_date = new Date(document.getElementById("to_date").value + " " + document.getElementById("to_time").value).getTime() / 1000;
        }

        var backcolor = document.getElementById("backcolor_value").value;
        var forecolor = document.getElementById("forecolor_value").value;
        
        $.ajax(
            {
                type:"POST",
                url:"tools/store_announcement.php",
                data:"destinationtype=" + destinationtype +
                     "&destination=" + destination + 
                     "&type=" + type + 
                     "&message=" + message_box + 
                     "&from=" + from_date + 
                     "&to=" + to_date + 
                     "&backcolor=" + backcolor + 
                     "&forecolor=" + forecolor,
                     
                success:function () 
                {   
                    location.reload();
                }
            });
    }
}

function showPopup()
{
    document.getElementById("popup_bg").style.display = "block";
    document.documentElement.style.overflowY = "hidden";
}

function hidePopup()
{
    document.getElementById("popup_bg").style.display = "none";
    document.documentElement.style.overflowY = "auto";
    
    resetPopup();
}

function resetPopup()
{
    // Reset popup fields to default values
    document.getElementById("popup_title").innerHTML = "New announcement";
    document.getElementById("type_selector").selectedIndex = 0;
    document.getElementById("message_box").value = "";
    document.getElementById("from_date").value = "";
    document.getElementById("indefinitely").checked = true;
    document.getElementById("to_date").value = "";
    document.getElementById("backcolor").value = "rgb(0, 0, 0)";
    document.getElementById("forecolor").value = "rgb(0, 0, 0)";
    document.getElementById("popup_submit_button").value = "Add announcement";
	document.getElementById("popup_submit_button").setAttribute("onclick", "addAnnouncement();");	
        
    document.getElementById("radio_kiosk").disabled = false;
    document.getElementById("kiosk_selector").disabled = false;
    document.getElementById("radio_category").disabled = false;
    document.getElementById("category_selector").disabled = false;
    document.getElementById("type_selector").disabled = false;
    document.getElementById("message_box").disabled = false;
    document.getElementById("from_date").disabled = false;
    document.getElementById("from_time").disabled = false;
    document.getElementById("indefinitely").disabled = false;
    document.getElementById("period").disabled = false;
    document.getElementById("to_date").disabled = false;
    document.getElementById("to_time").disabled = false;
    document.getElementById("backcolor_value").disabled = false;
    document.getElementById("forecolor_value").disabled = false;
    document.getElementById("popup_submit_button").style.display = "inline";
}

function showToDate()
{
    document.getElementById('to_date').style.display='-webkit-inline-flex';
    document.getElementById('to_time').style.display='-webkit-inline-flex';
}

function hideToDate()
{
    document.getElementById('to_date').style.display='none';
    document.getElementById('to_time').style.display='none';
}
