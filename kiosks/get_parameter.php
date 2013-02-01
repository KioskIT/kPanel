<?PHP

    // TODO:CHANGE TO GET PARAMETER FROM DATABASE
    $name = $_GET["name"];
    $parameter = $_GET["parameter"];  
        
    $file = fopen($name . ".json", "r");
    
    $json = json_decode(fgets($file), true);
    
    print($json[$parameter]);
    
?>