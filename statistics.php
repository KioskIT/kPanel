<!DOCTYPE HTML>

<html>
    
    
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel</title>
                
        <link href="css/animations.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <link href="css/database.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/statistics.js"></script>
    
    </head>
    
    
    <body>
    
        <div id="top_bar">
            <div class="button" onclick="getCollection('meal_orders');">Meal orders collection</div>
            <div class="button" onclick="getCollection('versions');">Versions collection</div>
            <div class="button" onclick="getCollection('kiosks');">Kiosks collection</div>
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
