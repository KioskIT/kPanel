<?PHP

    $connection = new MongoClient();
    $collection = $connection->kioskIt->announcements;

    $cursor = $collection->find();

    $array = iterator_to_array($cursor);

    foreach ($array as $value) 
    {
        if ($value["status"] == "not shown")
        {
            echo "
                <div class='announcement' data-id='" . $value["_id"] . "' onclick='toggleSelect(this);'>
                    <p class='message'>" . $value["message"] . "</p>
                    <div class='edit' onclick='edit(this.parentNode);'>Edit</div>
                </div>
                    ";
        }
        else
        if ($value["status"] == "shown")
        {
            echo "
                <div class='announcement' data-id='" . $value["_id"] . "' onclick='toggleSelect(this);'>
                    <p class='message'>" . $value["message"] . "</p>
                    <div class='edit' onclick='edit(this.parentNode);'>View</div>
                </div>
                    ";
        }
    }
    
    $connection->close();
   
?>