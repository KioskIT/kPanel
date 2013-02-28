<?PHP

    $versionName = $_POST["name"];
    echo substr($_POST["data"], 41);
    $versionArchive = base64_decode(substr($_POST["data"], 41));
    
    
    $tempFile = fopen("../temp/" . $versionName, "w");
    fwrite($tempFile, $versionArchive);
    fclose($tempFile);

    
    $archiveContents = new ZipArchive;
    echo $archiveContents->open("../temp/" . $versionName);
    if ($archiveContents->open("../temp/" . $versionName) === TRUE)
    {
        $versionName = substr($versionName, 0, -4);
        echo $versionName;
        $versionHandle = fopen("../versions/" . $versionName . ".importedversion", "w");
        fclose($versionHandle);
        
        mkdir("../versions/" . $versionName);
         
        $archiveContents->extractTo("../versions/" . $versionName . "/");
        $archiveContents->close();
    }
    
    unlink("../temp/" . $_POST["name"]);
    
?>
