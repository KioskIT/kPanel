<?PHP

    // Check if kiosk is already added
    if (!file_exists($_GET["name"]))
    {
        // Retrieve kiosk mac address from arp table
        $kiosk_ip = $_SERVER['REMOTE_ADDR'];
        $kiosk_mac = "NaN";
        
        $arp_lines=explode("\n", `arp -a $kiosk_ip`);
        
        foreach($arp_lines as $line)
        {
           $columns = preg_split('/\s+/', trim($line));
           
           if ($columns[0] == $kiosk_ip)
           {
               $kiosk_mac = $columns[1];
           }
        }
    
    
        $file = fopen(strval($_GET["name"]) . ".json", "w");
        
        $kiosk = array(
                'name' => $_GET["name"],
                'description' => $_GET["description"],
                'width' => $_GET["width"],
                'height' => $_GET["height"],
                'sync_stream' => $_GET["sync_stream"],
                'version' => $_GET["version"],
                'server_ip' => $_GET["server_ip"],
                'kiosk_ip' => $kiosk_ip,
                'kiosk_mac' => $kiosk_mac
                );
                
        fwrite($file, json_encode($kiosk));
        
        fclose($file);
    }

?>