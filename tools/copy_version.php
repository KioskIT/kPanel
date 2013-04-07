<?PHP
    
    $current_time = time();
    
    copy("../versions/" . $_POST[selected_version] . ".version", "../versions/" . $_POST[selected_version] . "(" . $current_time . ").version");
    copy("../versions/" . $_POST[selected_version] . ".php", "../versions/" . $_POST[selected_version] . "(" . $current_time . ").php");
        
    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->versions;
    
    $version = array("name" => ($_POST[selected_version] . "(" . $current_time . ")"), "type" => "default");

    $collection->insert($version);
    
    $connection->close();
    
?>