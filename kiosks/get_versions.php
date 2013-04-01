<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->versions;
    
    $cursor = $collection->find(array(), array("name" => "1"));
    
    $temp = array();
    $i = 0;
    while($cursor->hasNext())
    {
        $temp[$i++] = $cursor->getNext();
    }
        
    $connection->close();
    
    echo json_encode($temp);
    
?>