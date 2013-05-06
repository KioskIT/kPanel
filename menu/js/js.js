			function allowDrop(ev)
			{
				ev.preventDefault();
			}
			
			function invalidDrop(ev)
			{
				ev.preventDefault();
				document.getElementById('active-menus').style.display = 'none';
				document.getElementById('bin').style.display='none';
			}
			
			function drag(ev)
			{
				ev.dataTransfer.setData("Text",ev.target.id);
				document.getElementById('active-menus').style.display = 'block';
				document.getElementById('bin').style.display = 'block';
				document.getElementById('menu-items').style.display = 'none';
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
			function dropOut(ev,cycle,day,meal,obj)
			{
				ev.preventDefault();
				var id = ev.dataTransfer.getData("Text");
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
					
						var child = document.getElementById(id);
						child.parentNode.removeChild(child);
						listMenus();
						document.getElementById('bin').style.display = 'none';
					}
				}				
				xmlhttp.open("GET","drop-out.php?id=" + id + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}

			function dropIn(ev,cycle,day,meal,obj)
			{
				ev.preventDefault();
				var id = ev.dataTransfer.getData("Text");
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							response = xmlhttp.responseText;
							if(response != 'false')
							{
								var child = document.getElementById(id);
								child.parentNode.removeChild(child);
								
								obj.innerHTML = response;
							}else{
								alert('This slot is already occupied by a menu');
							}
							obj.style.background = 'white';
							document.getElementById('bin').style.display = 'none';
					}
				}				
				xmlhttp.open("GET","drop-in.php?id=" + id +  "&cycle=" + cycle + "&day=" + day+ "&meal=" + meal + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}
			function dropBin(ev,obj)
			{
				ev.preventDefault();
				var id = ev.dataTransfer.getData("Text");
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							var child = document.getElementById(id);
							child.parentNode.removeChild(child);
							obj.innerHTML = xmlhttp.responseText;
							document.getElementById('bin').style.display = 'none';
							document.getElementById('bin').style.background = 'red';
							document.getElementById('active-menus').style.display = 'none';
					}
				}				
				xmlhttp.open("GET","delete-menu.php?id=" + id + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}
			
			function showForm()
			{
				document.getElementById('create-menu-overlay').style.display = 'block';
			}
			
			function showFoodForm()
			{
				document.getElementById('create-food-overlay').style.display = 'block';
				document.getElementById('food-name').value = '';
				document.getElementById('portion').value = '';
				document.getElementById('min-calories').value = '';
				document.getElementById('max-calories').value = '';
			}
			
			function closeFoodForm()
			{
				document.getElementById('create-food-overlay').style.display = 'none';
			}
			
			function closeEditForm()
			{
				document.getElementById('edit-food-overlay').style.display = 'none';
			}
			
			function showEditForm(id)
			{
				var name = document.getElementById('create-menu-name').value;
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						response = xmlhttp.responseText;
						var arr = response.split(",");
						document.getElementById('edit-food-name').value = arr[0];
						document.getElementById('edit-portion').value = arr[1];
						document.getElementById('edit-min-calories').value = arr[2];
						document.getElementById('edit-max-calories').value = arr[3];
						document.getElementById('edit-category').selectedIndex = arr[4]-1;
						document.getElementById('edit-food-overlay').style.display = 'block';
						
					}
				}
				
				xmlhttp.open("GET","food-details.php?id=" + id + "&t=" + Math.random(),true);				
				xmlhttp.send();			}

			function createMenu()
			{
				var name = document.getElementById('create-menu-name').value;
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							var msgbox = document.getElementById('create-menu-msgbox');
							
							msgbox.style.display = 'block';
							document.getElementById('create-menu-name').value = '';
							document.getElementById('create-menu-msgbox').innerHTML = xmlhttp.responseText;	
							listMenus();
					}
				}
				
				xmlhttp.open("GET","create-menu.php?name=" + name + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}
			
			function listMenus()
			{
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							document.getElementById('menu-list').innerHTML = xmlhttp.responseText;	
					}
				}
				
				xmlhttp.open("GET","list-menus.php?t=" + Math.random(),true);				
				xmlhttp.send();			
			}
			
			function closeForm()
			{
				document.getElementById('create-menu-overlay').style.display = 'none';						
			}
			
			function displayActiveMenus()
			{
				var activeMenus = document.getElementById('active-menus');
				var menuItems = document.getElementById('menu-items');
				
				if(activeMenus.style.display == 'none')
				{
					activeMenus.style.display = 'block';
					menuItems.style.display =  'none';
				}else{
					activeMenus.style.display = 'none';
				}
			}

			function getFoodItems(id)
			{
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							document.getElementById('menu-items').innerHTML = xmlhttp.responseText;	
							document.getElementById('menu-items').style.display = 'block';
							document.getElementById('active-menus').style.display = 'none';
							document.getElementById('txtbox-edit-menu-name').value = document.getElementById('menu-name-'+id).innerHTML;
					}
				}
				
				xmlhttp.open("GET","menu-items.php?id=" + id + "&t=" + Math.random(),true);				
				xmlhttp.send();							
			}

			function addFood(menuID)
			{
				
				var xmlhttp=createXMLHTTP();
				var foodName = document.getElementById('food-name').value;
				var portion = document.getElementById('portion').value;
				var minCalories = document.getElementById('min-calories').value;
				var maxCalories = document.getElementById('max-calories').value;
				var category = document.getElementById('category').value;
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							document.getElementById('add-food-msgbox').innerHTML = xmlhttp.responseText;
							document.getElementById('add-food-msgbox').style.display = 'block';
							getFoodItems(menuID);
					}
				}
				
				xmlhttp.open("GET","add-food-items.php?menuID=" + menuID + "&title=" + foodName + "&portion=" + portion + "&minCalories=" + minCalories + "&maxCalories=" + maxCalories + "&category=" + category + "&t=" + Math.random(),true);				
				xmlhttp.send();		
			}
			
			function getFoodSuggestions(id)
			{
				
				var xmlhttp=createXMLHTTP();
				var txt = document.getElementById('food-name').value;
				if(txt.length  >=3)
				{
					
					xmlhttp.onreadystatechange=function()
					{
						if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
								document.getElementById('add-food-suggestion').innerHTML = xmlhttp.responseText;	
						}
					}
					
					xmlhttp.open("GET","food-suggestions.php?name=" + txt + "&id=" + id + "&t=" + Math.random(),true);				
					xmlhttp.send();		
				}else{
					document.getElementById('food-suggestion').innerHTML = '';
				}
			}
			
			function addSuggestedFood(obj,menuID,foodID)
			{
				var xmlhttp=createXMLHTTP();
				
					xmlhttp.onreadystatechange=function()
					{
						if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
							
								document.getElementById('add-food-msgbox').innerHTML = obj.innerHTML + ' added';
								document.getElementById('add-food-msgbox').style.display = 'block';
								
						}
					}
					
					xmlhttp.open("GET","add-food-suggestion.php?menuID=" + menuID + "&foodID=" + foodID + "&t=" + Math.random(),true);				
					xmlhttp.send();
			}
			
			function deleteItem(menuFoodID)
			{
				var xmlhttp=createXMLHTTP();
				
					xmlhttp.onreadystatechange=function()
					{
						if (xmlhttp.readyState==4 && xmlhttp.status==200)
						{
							
								document.getElementById('menu-items-msgbox').innerHTML = xmlhttp.responseText;
								document.getElementById('food-item-'+menuFoodID).style.display = 'none';
						}
					}
					
					xmlhttp.open("GET","delete-food-item.php?menuFoodID=" + menuFoodID + "&t=" + Math.random(),true);				
					xmlhttp.send();			
			}
			
			function updateMenu(id)
			{
				var xmlhttp=createXMLHTTP();
				menuName = document.getElementById('edit-menu-name').value;
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							document.getElementById('menu-items-msgbox').innerHTML = xmlhttp.responseText;
							document.getElementById('menu-name-'+id).innerHTML = menuName;
					}
				}
				
				xmlhttp.open("GET","update-menu.php?id=" + id + "&menuName=" + menuName + "&t=" + Math.random(),true);				
				xmlhttp.send();					
			}
			
			function updateFood(id)
			{
				var xmlhttp=createXMLHTTP();
				var foodName = document.getElementById('edit-food-name').value;
				var portion = document.getElementById('edit-portion').value;
				var minCalories = document.getElementById('edit-min-calories').value;
				var maxCalories = document.getElementById('edit-max-calories').value;
				var category = document.getElementById('edit-category').value;
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						
							document.getElementById('edit-food-msgbox').innerHTML = xmlhttp.responseText;
							document.getElementById('edit-food-msgbox').style.display = 'block';
							document.getElementById('food-item-name-'+id).innerHTML = foodName;
					}
				}
				
				xmlhttp.open("GET","update-food.php?foodID=" + id + "&title=" + foodName + "&portion=" + portion + "&minCalories=" + minCalories + "&maxCalories=" + maxCalories + "&category=" + category + "&t=" + Math.random(),true);				
				xmlhttp.send();					
			}
			
			function getFoodDetails(id)
			{
				var xmlhttp=createXMLHTTP();
				menuName = document.getElementById('edit-menu-name').value;
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
							document.getElementById('menu-items-msgbox').innerHTML = xmlhttp.responseText;
							document.getElementById('menu-name-'+id).innerHTML = menuName;
					}
				}
				
				xmlhttp.open("GET","update-menu.php?id=" + id + "&menuName=" + menuName + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}
			

			

			
			var  menuSelected;
			var foodSelected;