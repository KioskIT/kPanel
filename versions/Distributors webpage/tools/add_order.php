<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->meal_orders;

    $order = array("meal_name" => "Meal name #" . time(), "bed_number" => "100", "floor" => "1", "status" => "pending", "time" => time()); 
    $collection->insert($order);
    
    $connection->close();
   
?>
