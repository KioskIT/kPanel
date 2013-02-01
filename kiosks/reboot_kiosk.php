<?PHP

    set_include_path('../lib/phpseclib');
    include('Net/SSH2.php');
    
    $kiosk_ip = $_GET["kiosk_ip"];
    
    $ssh = new Net_SSH2($kiosk_ip, 8082);
    if (!$ssh->login('xxx', 'password')) 
    {
        exit('Login Failed');
    }

    echo $ssh->exec('date'); // CHANGE TO 'sudo reboot'
    
?>