<?PHP

    $connection= new MongoClient();
    $collection = $connection->kioskIt->meal_orders;
    
    $cursor = $collection->find();
    
    $temp = array();
    $i = 0;
    while($cursor->hasNext())
    {
        $temp[$i++] = $cursor->getNext();
    }
        
    $connection->close();
    
    echo json_encode($temp);
    
?>
