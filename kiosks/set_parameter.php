<?PHP

    set_include_path('../lib/phpseclib');
    include('Net/SSH2.php');

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->kiosks;
    
    $ips = explode("|", $_POST["ips"]);
    
    foreach ($ips as $ip)
    {
        $collection->update(array("ip" => $ip), array('$set' => array($_POST["property"] => $_POST["value"])));
        /*
        $ssh = new Net_SSH2($ip, 22, 2);
        if ($ssh->login('pi', 'raspberry'))
        {        
            echo $ssh->exec('./kioskIt/set_parameter ' . $_POST["property"] . ' ' . $_POST["value"]);
            echo $ssh->exec('./kioskIt/kiosk_refresh');
            $collection->update(array("ip" => $ip), array('$set' => array($_POST["property"] => $_POST["value"])));
        }
        */
    }
    
    echo $_POST["property"];
    
    $connection->close();
?>



