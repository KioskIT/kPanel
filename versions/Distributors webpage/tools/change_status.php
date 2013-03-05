<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->meal_orders;
    
    $collection->update(array("_id" => new MongoID($_POST["id"])), array('$set' => array("status" => $_POST["status"])));
    
    $connection->close();
    
?>



