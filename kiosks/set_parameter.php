<?PHP

    $kiosk_ip = $_GET["kiosk_ip"];
    $name = $_GET["name"];
    $parameter = $_GET["parameter"];
    $value = $_GET["value"];         
        
    $ssh_ex = exec("ssh user@$kiosk_ip", $ssh_output, $ssh_return);
    
    if ($ssh_return == 0)
    {        
        $ssh_ex = exec("cd ~/kioskIt;./set_parameter $parameter $value;logout", $ssh_output, $ssh_return);
        
        if ($ssh_return == 0)
        {    
    
            // Update server-side kiosk info as well
            $file = fopen($name . ".json", "r");
            
            $json = json_decode(fgets($file), true);
            
            fclose($file);
            
            
            $file = fopen($name . ".json", "w");
            
            $json[$parameter] = $value;
            fwrite($file, json_encode($json));  
            
            fclose($file);        
        }
    }
    else 
    {
        print($ssh_return);
    }    
    
?>