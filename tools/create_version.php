<?PHP

    $time = round(microtime(true) * 1000);
    
    $file = fopen("../versions/" . $time . ".version", "w");
    
    fclose($file);
    
    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->versions;
    
    $version = array("name" => strval($time), "type" => "default");

    $collection->insert($version);
    
    $connection->close();

    print($time);
    
?>