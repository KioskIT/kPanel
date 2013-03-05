var PENDING_COLOR = "#660000";
var DELIVERING_COLOR = "#FA6800";
var DELIVERED_COLOR = "#25541C";

$.fn.scrollView = function() 
    {
        return this.each(function() 
            {
                $('html, body').animate(
                    {
                        scrollTop: $(this).offset().top - 130
                    }, 1000);
            });
    }

function scrollTo(element)
{
    $(element).scrollView();
}

function toggleView()
{
    if (document.getElementById("map").style.display == "none")
    {
        document.getElementById("list").style.display = "none";
        document.getElementById("map").style.display = "block";
    }
    else
    {
        document.getElementById("list").style.display = "block";
        document.getElementById("map").style.display = "none";
    }
}

function getOrders()
{
    $.ajax(
        {
            type: "POST", 
            url: "tools/get_orders.php",
            success: function(orders) {showOrders(orders);}
        });
}

function showOrders(orders)
{
    var results = JSON.parse(orders);
    var keys = [];
    
    if (results.length > 0)
    {        
        // Populate contents        
        for (i = 0; i < results.length; ++i)
        {
            var row = document.createElement("tr");
            var floor = "";
            row.setAttribute("class", "body_row");
            
            if (results[i].hasOwnProperty("_id"))
            {
                row.setAttribute("data-id", results[i]["_id"]["$id"]);
            }
            
            if (results[i].hasOwnProperty("meal_name"))
            {
                var value = document.createElement("td");
                value.innerHTML = results[i]["meal_name"];
                row.appendChild(value);
            }
            
            if (results[i].hasOwnProperty("bed_number"))
            {
                var value = document.createElement("td");
                value.innerHTML = results[i]["bed_number"];
                row.appendChild(value);
            }
            if (results[i].hasOwnProperty("floor"))
            {
                var value = document.createElement("td");
                value.innerHTML = results[i]["floor"];
                row.appendChild(value);
                
                floor = results[i]["floor"];
            }
            if (results[i].hasOwnProperty("status"))
            {
                var value = document.createElement("td");
                value.setAttribute("class", "status");
                value.innerHTML = results[i]["status"];
                value.style.color = "white";
                
                if (results[i]["status"] == "pending")
                {
                    value.style.backgroundColor = PENDING_COLOR;
                }
                else
                if (results[i]["status"] == "delivering")
                {
                    value.style.backgroundColor = DELIVERING_COLOR;
                }
                else
                if (results[i]["status"] == "delivered")
                {
                    value.style.backgroundColor = DELIVERED_COLOR;
                }
                
                row.appendChild(value);
            }
            
            var value = document.createElement("td");
            var toggleStatus = document.createElement("div");
            toggleStatus.setAttribute("class", "toggle_status");
            toggleStatus.setAttribute("onclick", "toggleStatus(this)");
            toggleStatus.innerHTML = "Toggle status";
            value.appendChild(toggleStatus);
            row.appendChild(value);
            
            value = document.createElement("td");
            var delivered = document.createElement("div");
            delivered.setAttribute("class", "delivered");
            delivered.setAttribute("onclick", "delivered(this)");
            if (results[i]["status"] == "delivered")
            {
                delivered.innerHTML = "Yes";
            }
            else
            {
                delivered.innerHTML = "No";
            }
            value.appendChild(delivered);
            row.appendChild(value);
            
            if (floor != "")
            {
                document.getElementById("floor" + floor + "_body").appendChild(row);
            }
        }
    } 
}

function toggleStatus(button)
{
    var row = button.parentNode.parentNode;
    var id = row.getAttribute("data-id");
    var status = row.getElementsByClassName("status")[0];
    
    if (status.innerHTML == "pending")
    {        
        status.innerHTML = "delivering";
        status.style.backgroundColor = DELIVERING_COLOR;
    
        $.ajax(
            {
                type: "POST", 
                data: "id=" + id + "&status=delivering",
                url: "tools/change_status.php",
                success:function(msg) {console.log(msg)}
            });
    }
    else
    if (status.innerHTML == "delivering")
    {        
        status.innerHTML = "pending";
        status.style.backgroundColor = PENDING_COLOR;
    
        $.ajax(
            {
                type: "POST", 
                data: "id=" + id + "&status=pending",
                url: "tools/change_status.php",
                success:function(msg) {console.log(msg)}
            });
    }
}

function delivered(button)
{
    var row = button.parentNode.parentNode;
    var id = row.getAttribute("data-id");
    var status = row.getElementsByClassName("status")[0];
    
    if (status.innerHTML == "pending" || status.innerHTML == "delivering")
    {        
        status.innerHTML = "delivered";
        status.style.backgroundColor = DELIVERED_COLOR;
        
        button.innerHTML = "Yes";
    
        $.ajax(
            {
                type: "POST", 
                data: "id=" + id + "&status=delivered",
                url: "tools/change_status.php"
            });
    }
    else
    if (status.innerHTML == "delivered")
    {        
        status.innerHTML = "pending";
        status.style.backgroundColor = PENDING_COLOR;
    
        button.innerHTML = "No";
    
        $.ajax(
            {
                type: "POST", 
                data: "id=" + id + "&status=pending",
                url: "tools/change_status.php"
            });
    }
}
