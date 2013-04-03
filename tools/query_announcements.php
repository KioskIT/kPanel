<?PHP
    
    $client_ip = $_SERVER["REMOTE_ADDR"];
    
    $connection = new MongoClient();
    $announcements_collection = $connection->kioskIt->announcements;
    $kiosks_collection = $connection->kioskIt->kiosks;
    
    $announcements = $announcements_collection->find(array("from" => array('$lte' => time()), "status" => "not shown"));
    foreach ($announcements as $announcement)
    {
        if ($announcement["destinationtype"] == "id")
        {
            $kiosk = $kiosks_collection->findOne(array("_id" => new MongoID($announcement["destination"])));
            
            if ($kiosk["ip"] == $client_ip)
            {
                $result = $announcement;
                $result["action"] = "DISPLAY";
                $result["currenttime"] = time();
                
                $announcements_collection->update(array("_id" => new MongoID($announcement["_id"])), 
                                  array('$set' => array("status" => "shown")));
                
                break;
            }
        }
        else
        if ($announcement["destinationtype"] == "category")
        {
            $kiosks = $kiosks_collection->find(array("category" => $announcement["destination"]));
            
            $found = false;
            foreach ($kiosks as $kiosk)
            {
                if ($kiosk["ip"] == $client_ip)             
                {
                    $result = $announcement;
                    $result["action"] = "DISPLAY";
                    $result["currenttime"] = time();
                    
                    $announcements_collection->update(array("_id" => new MongoID($announcement["_id"])), 
                                      array('$set' => array("status" => "shown")));
                    
                    $found = true;
                    break;
                }
            }
                
            if ($found)
            {
                break;
            }
        }
    }
    
    if (!isset($result))
    {
        $result = array();
        $result["action"] = "NONE";
    }
    
    echo json_encode($result);
    
    $connection->close();

?>
