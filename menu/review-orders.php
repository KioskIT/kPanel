<html>
	<?php require('../menu/add-files/connect-db.php');?>
	<head>
		<link rel="stylesheet" type="text/css" href="../menu/css/review-orders.css">
		<?php
			session_start();
			$patientID= $_SESSION['id'];
		?>
	</head>
	<body>
		<?php
			function getOrders($patientID,$meal)
			{
				$day = date('d',time());
				$month = date('m',time());
				$year = date('Y',time());
				$sql = "SELECT orders.food_ID,title FROM orders,food_items WHERE food_items.id = orders.food_ID AND patient_ID = $patientID AND FROM_UNIXTIME(orders.timestamp,'%d')=$day AND FROM_UNIXTIME(orders.timestamp,'%m')=$month AND FROM_UNIXTIME(orders.timestamp,'%Y')=$year AND meal = $meal";
				$result = mysql_query($sql);
				echo mysql_error();
				$orders = '';
				$color1='#CEFFCD';
				$color2='FFFFFF';
				$count = 2;
				while($row = mysql_fetch_array($result))
				{
					$title = $row['title'];
					$orders = $orders . $row['food_ID'] . ',';
					if($count%2==0)
					{
						$bgColor = '#CEFFCD';
					}else{
						$bgColor = '#FFFFFF';
					}
					echo "
							<div class = 'item' style= 'background:$bgColor'>
								$title
							</div>
						";
					$count++;
				}
				return rtrim($orders,',');
			}
		?>
		<div id = 'content'>
			<div class = 'pane' id = 'tools'>
				<a id = 'back-button' href = 'main.php'>BACK</a>
			</div>
			<div class = 'pane' id='menu'>
				<h1>Lunch</h1>
				<div class = 'pane' id = 'orders'>
					<?php $lunchOrders = getOrders($patientID,$_GET['meal']) ?>
				</div>
			</div>
			<div class = 'pane' id = 'edit-button' onClick = 'window.location.replace("menu.php?meal=<?php echo $_GET['meal']?>&orders=<?php echo $lunchOrders ?>")'>
					EDIT ORDERS
			</div>
		</div>
	</body>
</html>