<?PHP

    $elements = $_POST["elements"];
    $elements_decoded = json_decode(urldecode($elements), true);
    
    $file = fopen("../versions/" . $elements_decoded[0]["name"] . ".version", "w");
    
    fwrite($file, $elements);
    
    fclose($file);

?>
