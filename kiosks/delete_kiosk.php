<?PHP

    $connection = new MongoClient();

    $connection->kioskIt->kiosks->remove(array("ip" => $_POST['ip']), array("justOne" => true));
    
    $connection->close();
    
    print_r($_POST);
    
?>
