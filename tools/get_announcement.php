<?PHP

    $connection = new MongoClient();
    $collection = $connection->kioskIt->announcements;

    $announcement = $collection->findOne(array("_id" => new MongoID($_POST["id"])));
    
    print_r(json_encode($announcement));
    
    $connection->close();
   
?>