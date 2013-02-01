<?PHP

    $connection= new MongoClient();
    $collection = $connection->kioskIt->kiosks;
    
    $cursor = $collection->find(array("ip" => $_POST['ip']));
    
    echo json_encode($cursor->getNext());
    
    $connection->close();
?>