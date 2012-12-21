<?PHP

    $file = fopen("versions/" . $_COOKIE["selected_version"] . ".html", "w");
    
    fwrite($file, $_COOKIE["html"]);
    
    fclose($file);

?>
