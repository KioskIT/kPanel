<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;
    
    $kiosk = array("name" => "Kiosk", 
                   "description" => "The Kiosk description", 
                   "category" => "default", 
                   "video_mode" => "CEA 2", 
                   "sync_stream" => $_SERVER["SERVER_ADDR"], 
                   "version" => "default", 
                   "server_ip" => $_SERVER["SERVER_ADDR"] . ":8080",
                   "ip" => $_POST['ip']);

    $collection->insert($kiosk);
    
    $connection->close();
    
    print_r($_POST);
?>