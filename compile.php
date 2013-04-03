<?PHP

    $file = fopen("versions/" . $_POST["selected_version"] . ".php", "w");
    
    fwrite($file, $_POST["html"]);
    
    fclose($file);

?>
