<?PHP

    $connection= new MongoClient();
    $collection = $connection->kioskIt->meal_orders;
    
    $collection->remove();
    
    $connection->close();
    
?>
