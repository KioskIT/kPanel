<?PHP

    // TODO:CHANGE TO SET PARAMETER IN DATABASE         
        
    set_include_path('../lib/phpseclib');
    include('Net/SSH2.php');
    
    $kiosk_ip = $_GET["kiosk_ip"];
    $name = $_GET["name"];
    $parameter = $_GET["parameter"];
    $value = $_GET["value"];
    
    $ssh = new Net_SSH2($kiosk_ip, 8082);
    if (!$ssh->login('xxx', 'password')) 
    {
        exit('Login Failed');
    }
   
    // TODO:SET PARAMETERS
    echo $ssh->exec('');
?>