<?PHP

    $elements = $_COOKIE["elements"];
    $elements_decoded = json_decode($elements, true);
    
    $file = fopen("versions/" . $elements_decoded[0]["name"] . ".version", "w");
    
    fwrite($file, $elements);
    
    fclose($file);

?>
