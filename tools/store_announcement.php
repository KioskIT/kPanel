<?PHP

    $connection = new MongoClient();
    $collection = $connection->kioskIt->announcements;

    $from = (int) $_POST["from"];
    
    $to = $_POST["to"];
    if ($_POST["to"] != "indefinitely")
    {
        $to = (int) $_POST["to"];
    }
    
	$collection->insert(array(
      'destinationtype' => $_POST["destinationtype"],
      'destination' => $_POST["destination"],
      'type' => $_POST["type"],
	  'message' => $_POST["message"],
      'from' => $from,
	  'to' => $to,
	  'backcolor' => $_POST["backcolor"],
	  'forecolor' => $_POST["forecolor"],
      'status' => 'not shown'
    ));
   
    $connection->close();
	
?>
