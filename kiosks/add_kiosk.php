<?PHP

    set_include_path('../lib/phpseclib');
    include('Net/SSH2.php');

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;
    
    $kiosk = array("name" => "Kiosk", 
                   "description" => "The Kiosk description", 
                   "category" => $_POST["category"], 
                   "video_group" => "CEA", 
                   "video_mode" => "2", 
                   "sync_version" => "default", 
                   "version" => "default", 
                   "server_ip" => $_SERVER["SERVER_ADDR"],
                   "ip" => $_POST["ip"]);

    $collection->insert($kiosk);
    
    
    
    $ssh = new Net_SSH2($_POST["ip"], 22, 2);
    if ($ssh->login('pi', 'raspberry'))
    {        
        echo $ssh->exec('./kioskIt/set_parameter video_group CEA');
        echo $ssh->exec('./kioskIt/set_parameter video_mode 2');
        echo $ssh->exec('./kioskIt/set_parameter version default');
        echo $ssh->exec('./kioskIt/set_parameter server_ip ' . $_SERVER["SERVER_ADDR"]);
        
        echo $ssh->exec('./kioskIt/kiosk_refresh');
    }
    
    
    $connection->close();
    
?>