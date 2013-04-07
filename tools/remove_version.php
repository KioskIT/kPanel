<?PHP
    
    // holger1 at NOSPAMzentralplan dot de @ http://php.net/manual/en/function.rmdir.php
    function rrmdir($dir) 
    { 
        if (is_dir($dir)) 
        { 
            $objects = scandir($dir); 
            foreach ($objects as $object) 
            { 
                if ($object != "." && $object != "..") 
                { 
                    if (filetype($dir."/".$object) == "dir") 
                    {
                        rrmdir($dir."/".$object);
                    }
                    else 
                    {
                        unlink($dir."/".$object);
                    }
                } 
            } 
        
            reset($objects); 
            rmdir($dir); 
        } 
    } 
    //
    
    if ($_POST["extension"] == "version")
    {
        unlink("../versions/" . $_POST["selected_version"] . ".version");
        unlink("../versions/" . $_POST["selected_version"] . ".php");
    }
    else
    if ($_POST["extension"] == "importedversion")
    {
        unlink("../versions/" . $_POST["selected_version"] . ".importedversion");
        rrmdir("../versions/" . $_POST["selected_version"]);
    }
    
    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->versions;
    
    $collection->remove(array("name" => $_POST["selected_version"]), array("justOne" => true));
    
    $connection->close();

?>