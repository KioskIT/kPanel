<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;


    if ($_POST["category"] == "(all)")
    {
        $cursor = $collection->find(array(), array("ip" => "1", "name" => "1", "description" => "1", "category" => "1"));
    }
    else
    {
        $cursor = $collection->find(array("category" => $_POST["category"]), array("ip" => "1", "name" => "1", "description" => "1"));
    }
    
    $temp = array();
    $i = 0;
    while($cursor->hasNext())
    {
        $temp[$i++] = $cursor->getNext();
    }
        
    $connection->close();
    
    echo json_encode($temp);
    
?>