<?PHP

    $connection = new MongoClient();
    $collection = $connection->kioskIt->announcements;

	$collection->insert(array(
      'type' => $_POST["type"],
	  'message' => $_POST["message"],
      'from' => $_POST["from"],
	  'to' => $_POST["to"],
	  'backcolor' => $_POST["backcolor"],
	  'forecolor' => $_POST["forecolor"]
    ));
   
    $connection->close();
	
?>
