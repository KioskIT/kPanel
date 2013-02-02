<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;
    
    $ips = explode("|", $_POST["ips"]);
    
    foreach ($ips as $ip)
    {      
        $collection->update(array("ip" => $ip), array('$set' => array($_POST["property"] => $_POST["value"])));
    }
    
    echo $_POST["property"];
    
    $connection->close();
?>