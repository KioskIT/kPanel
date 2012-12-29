<?PHP

    $kiosk_ip = $_GET["kiosk_ip"];
    
    $ping_ex = exec("ping -n 1 $kiosk_ip", $ping_output, $ping_return);
    
    if ($ping_return == 0)
    {
        preg_match_all('!\d+!', $ping_output[7], $ping_times);
        
        print($ping_times[0][2]);
    }
    else
    {
        print("-1");
    }    
    
?>