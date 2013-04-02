<?PHP
    
    rename("versions/" . $_POST["old_name"] . "." . $_POST["extension"], "versions/" . $_POST["new_name"] . "." . $_POST["extension"]);
    
    if ($_POST["extension"] == "version")
    {
        // Rename respective HTML file
        rename("versions/" . $_POST["old_name"] . ".html", "versions/" . $_POST["new_name"] . ".html");
    }
    else
    if ($_POST["extension"] == "importedversion")
    {
        // Rename respective folder
        rename("versions/" . $_POST["old_name"], "versions/" . $_POST["new_name"]);
    }
    
    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->versions;
    
    $collection->update(array("name" => $_POST["old_name"]), array('$set' => array("name" => $_POST["new_name"])));
    
    $connection->close();
    
?>
