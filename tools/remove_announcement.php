<?PHP

    $connection = new MongoClient();

    $connection->kioskIt->announcements->remove(array("_id" => new MongoID($_POST["id"])), array("justOne" => true));
    
    $connection->close();
    
?>