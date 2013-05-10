<!DOCTYPE html>
<html>
<head>
<title>User List </title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel=stylesheet type="text/css" href="css/kitchen.css">
<script type="text/javascript" src="jquery-1.8.3.min.js" ></script>
<script type="text/javascript" >

function getOrders()
{
    $.ajax(
        {
            type: "POST",
            url: "ajax-orderlist.php",
            success: function(orders) {showOrders(orders);}
        });
}


function showOrders(value)
{    
	if(value=="lunch")
	{
	    var results = JSON.parse(orders.lunch);
   
	    for (var k in results) 
	    {
	      if (results.hasOwnProperty(k)) 
	    {
	      document.write('Food name: ' + k + ', Quantity: ' + results[k]);
	    }
	}
	
	if(value=="dinner")
	{
	    var results = JSON.parse(orders.dinner);
   
	    for (var k in results) 
	    {
	      if (results.hasOwnProperty(k)) 
	    {
	      document.write('Food name: ' + k + ', Quantity: ' + results[k]);
	    }
	}

}

</script>
</head>
<body onload="getOrders();">	
<div id="list">
	<div id="main">
                
                <div class="main_title">Order Summary</div>
                        
						<select id="menu" name="menu" onClick="showOrders(this.value);">
    					<option value="dinner">Dinner</option>
    					<option value="lunch">Lunch</option>
						</select>
						
</body>
</html>
