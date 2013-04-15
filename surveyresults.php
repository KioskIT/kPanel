<!DOCTYPE HTML>

<html>
    
    
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel</title>
                
        <link href="css/animations.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <link href="css/surveyresults.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/surveyresults.js"></script>
    
    </head>
    
    
    <body>
    
        <div id="top_bar">
            
            <div id="survey_selector_wrapper">
                <span id="survey_selector_label">Select survey</span>
                <select id="survey_selector" onchange="getCollection(this.value);">
                    <option value=""></option>
                    <?PHP
                    
                        $connection = new MongoClient();
                        
                        $database = $connection->selectDB("kioskIt");
                        
                        $collections = $database->getCollectionNames();
                        
                        foreach ($collections as $collection)
                        {
                            if (substr($collection, 0, 7) == "survey_")
                            {
                                echo "<option value='" . $collection . "'>" . substr($collection, 7) . "</option>";
                            }
                        }
                        
                        $connection->close();
                    
                    ?>
                </select>
            </div>
            
            <a href="index.html" class="button">Home</a>
        </div>
        
        <div id="results">
            
            <table id="table">
                <thead id="thead">
                    
                </thead>
                
                <tbody id="tbody">
                    
                </tbody>
            </table>
            
        </div>
        
    </body>
    
    
</html>