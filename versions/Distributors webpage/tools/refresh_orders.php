<?PHP

    $connection= new MongoClient();
    $collection = $connection->kioskIt->meal_orders;
    
    $cursor = $collection->find(array("time" => array('$lt' => ((int) $_POST["time"]), '$gte' => ((int) $_POST["time"]) - 10)));
    
    $temp = array();
    $i = 0;
    while($cursor->hasNext())
    {
        $temp[$i++] = $cursor->getNext();
    }
        
    $connection->close();
    
    echo json_encode($temp);
    
?>
