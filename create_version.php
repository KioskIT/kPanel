<?PHP

    $time = round(microtime(true) * 1000);
    
    $file = fopen("versions/" . $time . ".version", "w");
    
    fclose($file);

    print($time);
    
?>