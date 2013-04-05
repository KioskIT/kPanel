<!DOCTYPE HTML>

<html>
    
    
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kPanel</title>
                
        <link href="css/animations.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <link href="css/statistics.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="js/statistics.js"></script>
    
    </head>
    
    
    <body>
    
        <div id = "popup_bg">

            <div id = "popup">
        
                <h1>Add element</h1>
                    
                <h2 id="loading">Loading..<h2>
                <div id="form"> 
                
                    <h2>What do you want to add?</h2>
                    
                    <select id="type_selector" onchange="configureFields(this)">
                        <option value=""></option>
                        <option value="patient_orders_summary">Summary of a patient's orders</option>
                        <option value="summary_of_meal_orders">Summary of meal orders</option>
                        <option value="meal_orders_by_category">Chart of meal orders split by categories</option>
                        <option value="moment_of_ordering">Chart of the moments of ordering</option>
                        <option value="meal_popularity">Chart of a meal's popularity</option>
                    </select>
                    
                    <div id="from" class="date">
                        <h2>From</h2>
                        <input id="from_date" class="field" type="date">
                    </div>
                    
                    <div id="to" class="date">
                        <h2>To</h2>
                        <input id="to_date" class="field" type="date">
                    </div>
                    
                    <div id="floor">
                        <h2>Floor</h2>
                        
                        <select id="floor_selector">
                            <option value="all">All floors</option>
                            <option value="1">Floor 1</option>
                            <option value="2">Floor 2</option>
                            <option value="3">Floor 3</option>
                            <option value="4">Floor 4</option>
                        </select>
                    </div>
                
                    <div id="form_buttons_bar">
                    
                        <input class="form_button" type="button" onclick="addElement()" value="Add" />
                        <input class="form_button" type="button" onclick="hideAddElementPopup()" value="Cancel" />
                    
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    
        <div id="top_bar">
            <a href="surveyresults.php" class="button">Survey results</a>
            <a href="#" class="button" onclick="showAddElementPopup()">Add element</a>
            <a href="index.html" class="button">Home</a>
        </div>
        
    </body>
    
    
</html>
