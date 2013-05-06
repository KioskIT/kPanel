			function startTime()
			{
				var today=new Date();
				var h=today.getHours();
				var m=today.getMinutes();
				// add a zero in front of numbers<10
				document.getElementById('time').innerHTML=h+":"+styleText(m);
			}
			function mealTime(skippedMeal)
			{
				var today=new Date();
				var h=today.getHours();
				var m=today.getMinutes()				
				if(skippedMeal==false)
				{
					if(h >=0 && h<=23){
						document.getElementById('meal').style.display = 'block';
					}else{
						document.getElementById('meal').display = 'none';
					}
				}			
			}
			
			function isSkipMeal()
			{
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						var response=xmlhttp.responseText;
						if(response=='true')
						{
							return true;
						}else{
							return false;
						}
					}else{
						return false;
					}
				}
				var year = document.getElementById('year').value;
				var month = document.getElementById('month').value;
				xmlhttp.open("GET","check-to-skip-meal.php?&i=" + Math.random(),true);
				xmlhttp.send();
				
			}
			
			function styleText(value)
			{
				if(value <10)
				{
					return '0' + value;
				}else{
					return value;
				}
			}
			
			function getDay()
			{
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						document.getElementById('day').innerHTML=xmlhttp.responseText;
					}
				}
				var year = document.getElementById('year').value;
				var month = document.getElementById('month').value;
				xmlhttp.open("GET","get-days.php?y="+ year + "&m="+ month + "&i=" + Math.random(),true);
				xmlhttp.send();
			}
			
			function createXMLHTTP()
			{
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
			
			function skipMeal()
			{
				
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						document.getElementById('meal').style.display = 'none';
						return true;
					}else{
						return false;
					}
				}
				
				xmlhttp.open("GET","skip-meal.php?i=" + Math.random(),true);
				xmlhttp.send();			
			}
			
			function showTxtKeyboard()
			{
				document.getElementById('txtkeyboard-overlay').style.display='block';
			}
			
			function showNumKeyboard()
			{
				document.getElementById('numkeyboard-overlay').style.display='block';
			}
			
			function cancelKeyboardEntry(txtbox)
			{
				document.getElementById('txtkeyboard-overlay').style.display = 'none';
				document.getElementById(txtbox).value = '';
			}
			
			function cancelNumKeyboardEntry(txtbox)
			{
				document.getElementById('numkeyboard-overlay').style.display = 'none';
				document.getElementById(txtbox).value = '';
			}
			
			function keyPress(txtbox,value)
			{
				document.getElementById(txtbox).value = document.getElementById(txtbox).value + value;
			}
			
			function backspace(txtbox)
			{
				
				myStr = document.getElementById(txtbox).value;
				myStr = myStr.slice(0,myStr.length-1);
				document.getElementById(txtbox).value = myStr;
			}
			
			function enter()
			{
				document.getElementById('txtkeyboard-overlay').style.display = 'none';
			}
			
			
			function authorizeNurse()
			{
				var xmlhttp=createXMLHTTP();
				var token = document.getElementById('token').value;
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						response=xmlhttp.responseText;
						if(response == 'true')
						{
							document.getElementById('token').value = '';
							document.getElementById('numkeyboard-overlay').style.display = 'none';
							document.getElementById('nurse-tools').style.display = 'block';
							document.getElementById('nurse-confirmation').style.display = 'none';
							document.getElementById('authorise-nurse-button').style.display = 'none';
						}else{
							alert('Incorrect authorization token');
						}
					}
				}				
				xmlhttp.open("GET","authorize-nurse.php?token=" + token + "&t=" + Math.random(),true);				
				xmlhttp.send();					
			}
			
			function closeNursePanel()
			{
				document.getElementById('authorise-nurse-button').style.display = 'block';
				document.getElementById('nurse-tools').style.display = 'none';
			}
			
			function movePatient(currentBed)
			{
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						document.getElementById('available-beds').innerHTML = xmlhttp.responseText;
						document.getElementById('move-patient').style.display = 'block';
					}
				}		
				xmlhttp.open("GET","get-available-beds.php?currentBed=" + currentBed + "&t=" + Math.random(),true);				
				xmlhttp.send();			
			}
	
			function movePatient(currentBed)
			{
				var xmlhttp=createXMLHTTP();
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						document.getElementById('available-beds').innerHTML = xmlhttp.responseText;
						document.getElementById('move-patient').style.display = 'block';
					}
				}		
				xmlhttp.open("GET","get-available-beds.php?currentBed=" + currentBed + "&t=" + Math.random(),true);				
				xmlhttp.send();			
			}
			function nurseConfirmation()
			{
				document.getElementById('nurse-confirmation').style.display = 'block';
			}
			function moveBed()
			{
				document.getElementById('move-bed').style.display = 'block';
			}
			
			function confirmMovePatient(currentBed)
			{
				var xmlhttp=createXMLHTTP();
				var newBedNumber = document.getElementById('available-beds').value;
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						alert(xmlhttp.responseText);
						window.location.replace('frontpage.php?bed='+currentBed);
					}
				}		
				xmlhttp.open("GET","move-patient.php?newBedNumber=" + newBedNumber + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}
			function closePanel()
			{
				document
			}
			function confirmMoveBed()
			{
				var xmlhttp=createXMLHTTP();
				var newFloor = document.getElementById('new-floor').value;
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						alert(xmlhttp.responseText);
					}
				}		
				xmlhttp.open("GET","move-bed.php?newFloor=" + newFloor + "&t=" + Math.random(),true);				
				xmlhttp.send();
			}
			
			var skippedMeal = false;