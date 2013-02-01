<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;

    $cursor = $collection->find(array(), array("ip" => "1", "name" => "1", "description" => "1"));
    
    $temp = array();
    $i = 0;
    while($cursor->hasNext())
    {
        $temp[$i++] = $cursor->getNext();
    }
        
    $connection->close();
    
    echo json_encode($temp);
    
?>