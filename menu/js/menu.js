			var id_list = [];
			
			function getFoodItems(menuID,category){
				var xmlhttp;
				if (window.XMLHttpRequest)
				{// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
				}
				else
				{// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						document.getElementById("list-food").innerHTML=xmlhttp.responseText;
					}
				}				
				xmlhttp.open("GET","get-food-items.php?menuID=" + menuID +  "&category=" + category + "&orders=" + getOrders() + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}

			function getOrders()
			{
				var orders = '';
				for(i=0;i<id_list.length;i++)
				{
					orders =  id_list[i] + ',' + orders;
				}
				orders = orders.slice(0,orders.length-1);	
				return orders;
			}
			
			function createXMLHTTP()
			{
				var xmlhttp;
				if (window.XMLHttpRequest)
				{// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
				}
				else
				{// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				return xmlhttp;
			}
			
			function placeOrder(meal)
			{
				var orders = getOrders();
				xmlhttp = createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						response = xmlhttp.responseText;
						if(response == 'Error1')
						{
							document.getElementById("info").innerHTML='<h1>You have not placed any orders</h1>';
						}else if(response=='Error2'){
							document.getElementById("info").innerHTML='<h1>There is a problem here.Please try again later</h1>';
						}else{
							window.location.replace('../menu/main.php');
						}
						
					}
				}
				
				xmlhttp.open("GET","place-order.php?meal=" + meal + "&orders=" + orders + "&t=" + Math.random(),true);
				xmlhttp.send();
			}
			
			function removeOrderedFood(id)
			{
				var parentDiv = document.getElementById('cart');
				var divToRemove = document.getElementById('ord_'+id);
				parentDiv.removeChild(divToRemove);
				if(document.getElementById('food_'+id)){document.getElementById('food_'+id).style.border = '3px solid black';}
				id_list.splice(id_list.indexOf(id),1);
			}
			
			function addOrderedFood(id)
			{
				
				if (document.getElementById('food_'+id).style.border == '3px solid black')
				{
					document.getElementById('food_'+id).style.border = '3px solid red'
					var parent = document.getElementById('cart');
					var newDiv = document.createElement('button');
					var titleFromDiv = document.getElementById('food-item-title-'+id).innerHTML;
					newDiv.setAttribute('id','ord_'+id);
					newDiv.setAttribute('class','food-item');
					newDiv.setAttribute('style','text-align:left;padding:0;vertical-align:bottom;line-height:3.0em;padding-left:2%');
					newDiv.innerHTML = titleFromDiv;
					newDiv.setAttribute('onClick','removeOrderedFood(' + id + ')');
					getFoodDetails(id);
					id_list.push(id);
					parent.appendChild(newDiv);
					
				}else{
					removeOrderedFood(id);
				}	
			}
			
			function getFoodDetails(id)
			{			
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						document.getElementById("info").innerHTML=xmlhttp.responseText;
					}
				}
				xmlhttp.open("GET","get-food-details.php?id=" + id + "&t=" + Math.random(),true);
				xmlhttp.send();
			}

			function removeAvailableFood(id){document.getElementById('avb_'+id).style.display = 'none';}
			
			function iniCart(title,id)
			{
				listOfIDs = id.split(',');
				listOfTitles = title.split(',');
				for(var i=0; i<listOfIDs.length; i++) { listOfIDs[i] = +listOfIDs[i]; } 
				for(i=0;i<listOfIDs.length;i++)
				{
					var parent = document.getElementById('cart');
					var newDiv = document.createElement('button');

					newDiv.setAttribute('class','food-item');
					newDiv.setAttribute('style','text-align:left;padding:0;vertical-align:bottom;line-height:3.0em;padding-left:2%');
					newDiv.innerHTML = listOfTitles[i] + '<div style = "float:right;height:100%;width:10%;background:red;font-weight:bold;text-align:center;color:white;z-order:2">X</div>';
					newDiv.setAttribute('onClick','removeOrderedFood(' + listOfIDs[i] + ')');
					newDiv.setAttribute('id','ord_'+listOfIDs[i]);
					id_list.push(listOfIDs[i]);
					parent.appendChild(newDiv);
				}
			}