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
            
            var value = document.createElement("td");
            var pending = document.createElement("div");
            pending.setAttribute("class", "pending");
            pending.setAttribute("onclick", "setStatus(this)");
            pending.innerHTML = "pending";
            value.appendChild(pending);
            
            var delivering = document.createElement("div");
            delivering.setAttribute("class", "delivering");
            delivering.setAttribute("onclick", "setStatus(this)");
            delivering.innerHTML = "delivering";
            value.appendChild(delivering);
            
            var delivered = document.createElement("div");
            delivered.setAttribute("class", "delivered");
            delivered.setAttribute("onclick", "setStatus(this)");
            delivered.innerHTML = "delivered";
            value.appendChild(delivered);
            
            row.appendChild(value);
            
            if (results[i].hasOwnProperty("status"))
            {                
                if (results[i]["status"] == "pending")
                {
                    pending.style.backgroundColor = PENDING_COLOR;
                    delivering.style.backgroundColor = "#9c9c9c";
                    delivered.style.backgroundColor = "#9c9c9c";
                }
                else
                if (results[i]["status"] == "delivering")
                {
                    delivering.style.backgroundColor = DELIVERING_COLOR;
                    pending.style.backgroundColor = "#9c9c9c";
                    delivered.style.backgroundColor = "#9c9c9c";    
                }
                else
                if (results[i]["status"] == "delivered")
                {
                    delivered.style.backgroundColor = DELIVERED_COLOR;
                    pending.style.backgroundColor = "#9c9c9c";
                    delivering.style.backgroundColor = "#9c9c9c"; 
                }
                
                row.appendChild(value);
            }
            
            if (floor != "")
            {
                document.getElementById("floor" + floor + "_body").appendChild(row);
            }
        }
    } 
}

function setStatus(button)
{
    var row = button.parentNode.parentNode;
    var id = row.getAttribute("data-id");
    var status = button.innerHTML;
    
    if (status == "pending")
    {
        button.style.backgroundColor = PENDING_COLOR;
        button.parentNode.getElementsByClassName("delivering")[0].style.backgroundColor = "#9c9c9c";
        button.parentNode.getElementsByClassName("delivered")[0].style.backgroundColor = "#9c9c9c";
    }
    else
    if (status == "delivering")
    {
        button.style.backgroundColor = DELIVERING_COLOR;
        button.parentNode.getElementsByClassName("pending")[0].style.backgroundColor = "#9c9c9c";
        button.parentNode.getElementsByClassName("delivered")[0].style.backgroundColor = "#9c9c9c";        
    }
    else
    if (status == "delivered")
    {
        button.style.backgroundColor = DELIVERED_COLOR;
        button.parentNode.getElementsByClassName("pending")[0].style.backgroundColor = "#9c9c9c";
        button.parentNode.getElementsByClassName("delivering")[0].style.backgroundColor = "#9c9c9c";        
    }
    
    $.ajax(
        {
            type: "POST", 
            data: "id=" + id + "&status=" + status,
            url: "tools/change_status.php",
            success:function(msg) {console.log(msg)}
        });
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
