<?PHP

    set_include_path('../lib/phpseclib');
    include('Net/SSH2.php');
    
    $kiosk_ip = $_POST["kiosk_ip"];
    
    $ssh = new Net_SSH2($kiosk_ip, 22);
    if (!$ssh->login('pi', 'raspberry'))
    {
        exit('Login Failed');
    }

    echo $ssh->exec('sudo reboot');
    
?>