<?PHP

    $version_name = $_POST["selected_version"];
    
    $file = fopen("versions/" . $version_name . ".version", "r");
    
    if (!feof($file))
    {
        print(fgets($file));
    }
    else
    {
        print("");    
    }
    
    fclose($file);

?>
