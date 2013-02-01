function populateFields()
{
    $.ajax(
        {
            type: "POST", 
            url: "kiosks/get_kiosk.php",
            data: "ip=" + ,
            success: function(e) {alert(e);}
        });
}