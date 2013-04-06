<?PHP

    set_include_path('../lib/phpseclib');
    include('Net/SSH2.php');

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;
    
    $ips = explode("|", $_POST["ips"]);
    
    foreach ($ips as $ip)
    {
        $collection->update(array("ip" => $ip), array('$set' => array($_POST["property"] => $_POST["value"])));
        
        if ($_POST["property"] == "video_mode" || $_POST["property"] == "version" || $_POST["property"] == "server_ip")
        {
            /*
            $ssh = new Net_SSH2($ip, 22, 2);
            if ($ssh->login('pi', 'raspberry'))
            {
                if ($_POST["property"] == "video_mode")
                {
                    $parameters = explode(" ", $_POST["value"]);
                    
                    echo $ssh->exec('./kioskIt/set_parameter video_group ' . $parameters[0]);
                    echo $ssh->exec('./kioskIt/set_parameter video_mode ' . $parameters[1]);
                }
                else
                {
                    echo $ssh->exec('./kioskIt/set_parameter ' . $_POST["property"] . ' ' . $_POST["value"]);
                }
                
                echo $ssh->exec('./kioskIt/kiosk_refresh');
                $collection->update(array("ip" => $ip), array('$set' => array($_POST["property"] => $_POST["value"])));
            }
            */
        }
    }
    
    echo $_POST["property"];
    
    $connection->close();
?>



