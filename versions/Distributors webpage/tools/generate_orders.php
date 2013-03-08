<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->meal_orders;

    // Uncomment to populate database with orders
    for ($i = 0; $i < 100; $i++)
    {
        $order = array("meal_name" => "Meal name #" . $i, "bed_number" => "" . (100 + $i), "floor" => "1", "status" => "pending", "time" => time()); 
        $collection->insert($order);
        
        $order = array("meal_name" => "Meal name #" . $i, "bed_number" => "" . (200 + $i), "floor" => "2", "status" => "pending", "time" => time()); 
        $collection->insert($order);
        
        $order = array("meal_name" => "Meal name #" . $i, "bed_number" => "" . (300 + $i), "floor" => "3", "status" => "pending", "time" => time()); 
        $collection->insert($order);
        
        $order = array("meal_name" => "Meal name #" . $i, "bed_number" => "" . (400 + $i), "floor" => "4", "status" => "pending", "time" => time()); 
        $collection->insert($order);        
    }
    
    $connection->close();
   
?>
