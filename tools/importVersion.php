<?PHP

    $versionName = $_POST["name"];
    $versionArchive = base64_decode(substr($_POST["data"], 41));
    
    
    $tempFile = fopen("../temp/" . $versionName, "w");
    fwrite($tempFile, $versionArchive);
    fclose($tempFile);

    
    $archiveContents = new ZipArchive;
    if ($archiveContents->open("../temp/" . $versionName) === TRUE)
    {
        $versionName = substr($versionName, 0, -4);
        $versionHandle = fopen("../versions/" . $versionName . ".importedversion", "w");
        fclose($versionHandle);
        
        mkdir("../versions/" . $versionName);
         
        $archiveContents->extractTo("../versions/" . $versionName . "/");
        $archiveContents->close();
        
        $connection = new MongoClient();
    
        $collection = $connection->kioskIt->versions;
        
        $version = array("name" => $versionName);

        $collection->insert($version);
        
        $connection->close();

    }
    
    unlink("../temp/" . $_POST["name"]);
    
?>
