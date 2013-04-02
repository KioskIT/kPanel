<?PHP

    $connection = new MongoClient();
    
    $collection = $connection->kioskIt->$_GET["collection"];

    unset($_GET["collection"]);
     
	$collection->insert($_GET);
   
    $connection->close();

?>

<!DOCTYPE HTML>

<html>


	<head>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<title>kioskIt</title>

	</head>

	<body>

        <h2>Survey sent! Returning you to the previous page..</h2>
        
        <script>
            
            setTimeout(function(){window.history.go(-2);}, 3000);
            
        </script>

	</body>


</html>