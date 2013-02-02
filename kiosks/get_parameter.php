<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;
    
    $ips = explode("|", $_POST["ips"]);
    
    $kiosk = $collection->findOne(array("ip" => $ips[0]));
    $value = $kiosk[$_POST["property"]];
    
    foreach ($ips as $ip)
    {
        $kiosk = $collection->findOne(array("ip" => $ip));
        
        if ($value != $kiosk[$_POST["property"]])
        {
            echo json_encode(array("property" => $_POST["property"], "value" => "(multiple)"));
            
            $connection->close();
            exit();     
        }        
    }
    
    echo json_encode(array("property" => $_POST["property"], "value" => $value));
    
    $connection->close();
        
?>
