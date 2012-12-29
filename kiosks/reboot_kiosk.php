<?PHP

    $kiosk_ip = $_GET["kiosk_ip"];  
        
    $ssh_ex = exec("ssh user@$kiosk_ip", $ssh_output, $ssh_return);
    
    if ($ssh_return == 0)
    {        
        $ssh_ex = exec("sudo shutdown -r now", $ssh_output, $ssh_return);
    }
    else 
    {
        print($ssh_return);
    }    
    
?>