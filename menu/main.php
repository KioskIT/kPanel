<!DOCTYPE html>
<html>
	<?php require('../menu/add-files/connect-db.php');?>
	<head>
		<link rel="stylesheet" type="text/css" href="../menu/css/patient-screen.css">
		<script src="../menu/js/patient-screen.js" type="text/javascript"></script>
		<title> </title>
	</head>
	<body onLoad = 'timeClock=setInterval("startTime()",500); mealClock=setInterval("mealTime(skippedMeal)",500)' >
		<?php
			session_start();
			if(!isSet($_SESSION['id'])){
				$showRegForm = 'display:block';
				$showPatientScreen = 'display:none';
				
			}else{
				$showRegForm = 'display:none';
				$showPatientScreen = 'display:block';
				
			}
			
			function disableMealButton($meal)
			{
				$year = date('Y',time());
				$month = date('m',time());
				$day = date('d',time());
				$sql = "SELECT id FROM orders WHERE FROM_UNIXTIME(timestamp,'%Y')=$year AND FROM_UNIXTIME(timestamp,'%month')=$month AND FROM_UNIXTIME(timestamp,'%d')=$day AND meal = $meal LIMIT 1";
				$result = mysql_query($sql);
				echo mysql_error();
				if(mysql_num_rows($result)==0)
				{
					return false;
				}else{
					return true;
				}
			}
			$disableDinnerButton=disableMealButton(3);
			$disableLunchButton=disableMealButton(2);
			if($disableLunchButton==true)
			{
				$displayLunchButton='display:none';
				$displayReviewLunchButton = 'display:block';
			}else{
				$displayLunchButton='display:block';
				$displayReviewLunchButton = 'display:none';
			}
			
			if($disableDinnerButton==true)
			{
				$displayDinnerButton='display:none';
				$displayReviewDinnerButton = 'display:block';
			}else{
				$displayDinnerButton='display:block';
				$displayReviewDinnerButton = 'display:none';
			}
		?>
			<div id = 'content'>
				<div id='patient-screen' style = '<?php echo $showPatientScreen ?>'>
					<h1><span id = 'greet'>HELLO</span>, <?php echo $_SESSION['name']; ?> &nbsp <span id = 'time'></span></h1>	
					<div id = 'meal' style = 'display:none'>
						<h2> Please select your meal for tomorrow <?php echo date('d M Y',strtotime(date('d M Y',time()),'+1 day')); ?> </h2>
						
						<a class = 'button' href='menu.php?meal=2' style =' <?php echo $displayLunchButton;?>'>LUNCH</a>
						<a class = 'button' href='review-orders.php?meal=2' style='<?php echo $displayReviewLunchButton;?>'>REVIEW/EDIT LUNCH ORDERS</a>
						<a class = 'button' href='menu.php?meal=3' style = '<?php echo $displayDinnerButton;?>'>DINNER</a>
						<a class = 'button' href='review-orders.php?meal=3' style = '<?php echo $displayReviewDinnerButton;?>'>REVIEW/EDIT DINNER ORDERS</a>
						
					</div>
					<div id = 'nurse-section'>
						<a id='authorise-nurse-button' class = 'button' onClick = 'document.getElementById("nurse-confirmation").style.display="block"' >For Nurse Use</a>
						<div id = 'nurse-tools' style = 'display:none'>
							<a  class = 'button' class = '' onClick = 'closeNursePanel()'>Close</a>
							<a  class = 'button' href = '../menu/sign-patient-out.php' class = 'nurse-button' onClick ='clearInterval(timeClock);clearInterval(mealClock)'>Sign Patient Out</a>
							<a  class = 'button' class = 'nurse-button' onClick = 'moveBed()'>Move Bed</a>
							<a  class = 'button' onClick = 'movePatient(<?php echo $_SESSION['bed'] ?>)' >Move Patient</a>
						</div>
					</div>
				</div>
				<div id = 'nurse-confirmation' class = 'overlay' style = 'display:none'>
					<div class = 'form'>
						<h1>Nurse Authentication</h1>
						<hr/>
						<h2>Token:</h2>
						<input id = 'token' class = 'txtbox'  type = 'password' value = '' onClick = 'showNumKeyboard()' readOnly = "true" />
						<br/>
						<div class = 'submit-button' onClick = 'document.getElementById("nurse-confirmation").style.display="none"' >Cancel</div>
					</div>
				</div>
				<div class = 'overlay' id = 'move-bed' style = 'display:none'>
					<div class='form'>
						<h1>Move Patient's Bed</h1>
						<hr/>
						<h2>Move Bed to Floor:</h2>
						<select id = 'new-floor'>
							<option selected='selected'>Beds</option>
							<option value = '1'>Floor 1</option>
							<option value = '2'>Floor 2</option>
							<option value = '3'>Floor 3</option>
							<option value = '4'>Floor 4</option>
						</select>
						<br/>
						<br/>
						<div class = 'submit-button' onClick = 'document.getElementById("move-bed").style.display="none"' >Cancel</div>
						<div class = 'submit-button' onClick = 'confirmMoveBed(<?php echo $_SESSION['bed'] ?>)' >Move Bed</div>

					</div>
				</div>
				<div id = 'move-patient' class = 'overlay' style = 'display:none'>
					<div class = 'form'>
						<h1>Move Patient</h1>
						<hr/>
						<h2>Move Patient From Bed, <?php echo $_SESSION['bed'] ?> To:</h2>
						<select id = 'available-beds'>
						
						</select>
						<br/>
						<br/>
						<div class = 'submit-button' onClick = 'document.getElementById("move-patient").style.display="none"' >Cancel</div>
						<div class = 'submit-button' onClick = 'confirmMovePatient(<?php echo $_SESSION['bed'] ?>)' >Move Patient</div>
					</div>
				</div>
				
				<div id = 'registration-form' style = '<?php echo $showRegForm; ?>'>
					<form method = 'POST' action = 'register-patient-to-bed.php'>
						<h2>No Patient has been registered to this bed </h2>
						<hr/>
						<input type = 'hidden' name = 'bed' value = '<?php  echo $_GET['bed']; ?>' />
						<h3>Patient Name:</h3>
							<input id = 'name' class = 'txtbox' name = 'name' type = 'text' value = '' onClick = 'showTxtKeyboard()' readOnly = "true" />
						<h3>Date of Birth:</h3> 
						<select class = 'date-box' id = 'year' name = 'year'>
							<option selected>Year</option>				
								<?php
									for($i=2013;$i>=1920;$i--)
									{
										echo "<option value = '$i'>$i</option>";
									}
								?>
						</select>	
						<select class = 'date-box' name = 'month' id='month' onChange = 'getDay(1)'>
							<option selected>Month</option>"
							<option value = '1'>Jan</option>
							<option value = '2'>Feb</option>
							<option value = '3'>Mar</option>
							<option value = '4'>Apr</option>
							<option value = '5'>May</option>
							<option value = '6'>Jun</option>
							<option value = '7'>Jul</option>
							<option value = '8'>Aug</option>
							<option value = '9'>Sep</option>
							<option value = '10'>Oct</option>
							<option value = '11'>Nov</option>
							<option value = '12'>Dec</option>
						</select>
						
						<select class = 'date-box'  name = 'day' id = 'day'>
							<option selected>Day</option>
						</select>
						<br/>
						<input class = 'submit-button' type = 'submit' value = 'Check In Patient' />
						</form>
				</div>	
				
			</div>
			<div id = 'txtkeyboard-overlay' style = 'position:absolute;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:none'>
				<?php require('txt-keyboard.php');?>
			</div>
			<div id = 'numkeyboard-overlay' style = 'position:absolute;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:none'>
				<?php require('num-keyboard.php');?>
			</div>

			<?php require('../menu/add-files/close-db.php');?>
</html>