<?PHP

    $connection = new MongoClient();
    $collection = $connection->kioskIt->announcements;

	$collection->update(array("_id" => new MongoID($_POST["id"])), 
	array('$set' => array(
		'destinationtype' => $_POST["destinationtype"],
		'destination' => $_POST["destination"],
		'type' => $_POST["type"],
		'message' => $_POST["message"],
		'from' => $_POST["from"],
		'to' => $_POST["to"],
		'backcolor' => $_POST["backcolor"],
		'forecolor' => $_POST["forecolor"]
    )));

	$connection->close();
	
?>
