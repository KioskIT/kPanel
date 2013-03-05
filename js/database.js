function getCollection(collection_name)
{
    $.ajax(
        {
            type: "POST", 
            url: "database/get_collection.php",
            data: "collection_name=" + collection_name,
            success: function(collection) {showCollection(collection);}
        });
}

function showCollection(collection)
{
    emptyTable();
    
    var results = JSON.parse(collection);
    var keys = [];
    
    if (results.length > 0)
    {        
        // Populate header
        var row = document.createElement("tr");
        row.setAttribute("id", "header_row");
        
        for (var key in results[0])
        {
            if(results[0].hasOwnProperty(key))
            {
                var value = document.createElement("th");
                value.innerHTML = key;
                keys.push(key);
                row.appendChild(value);
            }        
        }
            
        document.getElementById("thead").appendChild(row);
        
        // Populate contents        
        for (i = 0; i < results.length; ++i)
        {
            var row = document.createElement("tr");
            row.setAttribute("id", "body_row");
            
            for (j = 0; j < keys.length; ++j)
            {
                if (results[i].hasOwnProperty(keys[j]))
                {
                    // _id is stored as an object with a single key ($id)
                    if (keys[j] == "_id")
                    {
                        var value = document.createElement("td");
                        value.innerHTML = results[i][keys[j]]["$id"];
                        row.appendChild(value);
                    }
                    else
                    {   
                        var value = document.createElement("td");
                        value.innerHTML = results[i][keys[j]];
                        row.appendChild(value);
                    }
                }
            }
            
            document.getElementById("tbody").appendChild(row);
        }
    }
    else
    {
        // Populate header
        var row = document.createElement("tr");
        row.setAttribute("id", "header_row");
        
        var value = document.createElement("th");
        value.innerHTML = "Collection keys missing";
        row.appendChild(value);
            
        document.getElementById("thead").appendChild(row);
        
        // Populate contents
        var row = document.createElement("tr");
        row.setAttribute("id", "body_row");
        
        var value = document.createElement("td");
        value.innerHTML = "Collection values missing";
        row.appendChild(value);
        
        document.getElementById("tbody").appendChild(row);        
    }   
}

function emptyTable()
{
    // Empty header
    var thead = document.getElementById("thead");
    
    while (thead.hasChildNodes()) 
    {
        thead.removeChild(thead.lastChild);
    }
    
    // Empty contents
    var tbody = document.getElementById("tbody");
    
    while (tbody.hasChildNodes()) 
    {
        tbody.removeChild(tbody.lastChild);
    }
}
