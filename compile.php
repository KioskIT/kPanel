<?PHP

    $file = fopen("versions/" . $_POST["selected_version"] . ".html", "w");
    
    fwrite($file, $_POST["html"]);
    
    fclose($file);

?>
