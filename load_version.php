<?PHP

    $version_name = $_COOKIE["selected_version"];
    
    $file = fopen("versions/" . $version_name . ".version", "r");
    
    if (!feof($file))
    {
        print(fgets($file));
    }
    else
    {
        print("dasdas");    
    }
    
    fclose($file);

?>
