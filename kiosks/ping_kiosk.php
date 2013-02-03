<?PHP

    $kiosk_ip = $_POST["kiosk_ip"];
    
    $ping_ex = exec("ping -n 1 $kiosk_ip", $ping_output, $ping_return);
    
    if ($ping_return == 0)
    {
        preg_match_all('!\d+!', $ping_output[7], $ping_times);

        echo json_encode(array("id" => $_POST["id"], "ping" => $ping_times[0][2]));
    }
    else
    {
        echo json_encode(array("id" => $_POST["id"], "ping" => "unreachable"));
    }    
    
?>