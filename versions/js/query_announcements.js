setInterval(function(){queryAnnouncements();}, 2000);

function queryAnnouncements()
{
    $.ajax(
    {
        type:"POST",
        url:server_ip + "/kPanel/tools/query_announcements.php",
        success:function(data){console.log(data);checkData(data);}
    });
}

function checkData(rawdata)
{
    var data = JSON.parse(rawdata);
    
    if (data.action == "DISPLAY")
    {
        displayAnnouncement(data);
    }
}

function displayAnnouncement(announcement)
{
    if (announcement.type == "Ticker-Tape")
    {
        var tickertape = document.getElementById("tickertape");
        tickertape.style.display = "block";
        tickertape.innerHTML = announcement.message;
        tickertape.style.backgroundColor = announcement.backcolor;
        tickertape.style.color = announcement.forecolor;
        
        if (announcement.to != "indefinitely")
        {
            setTimeout(function(){hideAnnouncement("tickertape");}, (announcement.to - announcement.currenttime) * 1000);
        }
    }
    else
    if (announcement.type == "Modal Message")
    {
        var modalmessage = document.getElementById("modalmessage");
        modalmessage.style.display = "block";
        modalmessage.innerHTML = announcement.message;
        modalmessage.style.backgroundColor = announcement.backcolor;
        modalmessage.style.color = announcement.forecolor;
        
        if (announcement.to != "indefinitely")
        {
            setTimeout(function(){hideAnnouncement("modalmessage");}, (announcement.to - announcement.currenttime) * 1000);
        }
    }
}

function hideAnnouncement(id)
{
    document.getElementById(id).style.display = "none";
}