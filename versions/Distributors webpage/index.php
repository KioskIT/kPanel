<!DOCTYPE html>

<html>


    <head>
        
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <title>kioskIt</title>
        
        <link rel=stylesheet type="text/css" href="css/distributors.css">
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/distributors.js"></script>
        
    </head>
    
    
    <body onload="getOrders();">
        
        <div id="top_bar">
            
            <a href="#" onclick="scrollTo(document.getElementById('floor1'));" class="button" >Floor 1</a>
            <a href="#" onclick="scrollTo(document.getElementById('floor2'));" class="button" >Floor 2</a>
            <a href="#" onclick="scrollTo(document.getElementById('floor3'));" class="button" >Floor 3</a>
            <a href="#" onclick="scrollTo(document.getElementById('floor4'));" class="button" >Floor 4</a>
            
            <a href="#" id="clear_orders" class="button" onclick="">Clear orders</a>
            
            <a href="#" class="button" id="toggle_view" onclick="toggleView();">Toggle view</a>
            
        </div>
        
        <div id="list">
            
            <div id="floor1">
                
                <div class="floor_title">Floor 1</div>
                
                <hr>
                
                <table id="floor1_table">
                
                    <thead>
                        <tr id="header_row">
                            <th class="meal_name_column">Meal name</th>
                            <th class="bed_number_column">Bed number</th>
                            <th class="floor_column">Floor</th>
                            <th class="status_column">Status</th>
                        </tr>
                    </thead>
                    
                    <tbody id="floor1_body">
                    </tbody>
                
                </table>
                
            </div>
            
            <hr>
            
            <div id="floor2">
                
                <div class="floor_title">Floor 2</div>
                
                <hr>
                
                <table id="floor2_table">
                
                    <thead>
                        <tr id="header_row">
                            <th class="meal_name_column">Meal name</th>
                            <th class="bed_number_column">Bed number</th>
                            <th class="floor_column">Floor</th>
                            <th class="status_column">Status</th>
                        </tr>
                    </thead>
                    
                    <tbody id="floor2_body">
                    </tbody>
                
                </table>
                
            </div>
            
            <hr>
            
            <div id="floor3">
                
                <div class="floor_title">Floor 3</div>
                
                <hr>
                
                <table id="floor3_table">
                
                    <thead>
                        <tr id="header_row">
                            <th class="meal_name_column">Meal name</th>
                            <th class="bed_number_column">Bed number</th>
                            <th class="floor_column">Floor</th>
                            <th class="status_column">Status</th>
                        </tr>
                    </thead>
                    
                    <tbody id="floor3_body">
                    </tbody>
                
                </table>
                
            </div>
            
            <hr>
            
            <div id="floor4">
                
                <div class="floor_title">Floor 4</div>
                
                <hr>
                
                <table id="floor4_table">
                
                    <thead>
                        <tr id="header_row">
                            <th class="meal_name_column">Meal name</th>
                            <th class="bed_number_column">Bed number</th>
                            <th class="floor_column">Floor</th>
                            <th class="status_column">Status</th>
                        </tr>
                    </thead>
                    
                    <tbody id="floor4_body">
                    </tbody>
                
                </table>
                
            </div>
            
        </div>
        
        <div id="map">
            <img src="images/floor-plan.png" height="800" width="1200" onload="document.getElementById('map').style.display = 'none';" > 
        </div>
        
    </body>


</html>
