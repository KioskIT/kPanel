var selected = null;

var numberOfVersions = 0;

var versionsList;

function getVersions()
{
    $.ajax(
        {
            type: "POST", 
            url: "get_versions.php",
            success: function() {populateVersionsList();}
        });
}

function populateVersionsList()
{           
    versionsList = document.getElementById("versionsList");
    
    var cookies = document.cookie.split("; ");
    
    for (var i = 0; i < cookies.length; ++i)
    {
        if (cookies[i].substr(0, cookies[i].indexOf("=")) == "versions_list")
        {
            var versions = unescape(cookies[i].substr(cookies[i].indexOf("=") + 1)).split(":");
            
            for (var j = 0; j < versions.length - 1; ++j)
            {
                var versionName = unescape(versions[j].split(".version")[0]).split("+").join(" ");
                var version = document.createElement("div");
                version.innerHTML = "Loading version..";
                version.setAttribute("class", "version");
                version.setAttribute("id", "version" + numberOfVersions);   
                version.setAttribute("onmouseover", "select(this)");
                
                if (isVersionCompiled(versionName))
                {
                    version.innerHTML = '<p class="versionName">' + versionName + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div><div class="edit" onclick="view()">View version</div>';
                }
                else
                {
                    version.innerHTML = '<p class="versionName">' + versionName + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div>';                    
                }
                
                document.getElementById("versionsList").appendChild(version);
            }
            
            numberOfVersions = versions.length - 1;
            
            break;
        }
    }
}

function goHome()
{
    selected = null;
    document.cookie = "selected_version=";
    window.location = "index.html";
}

function select(toBeSelected)
{
	// If there is a previously selected version
	if (selected != null)
	{
		// Apply unselected style
		selected.style.background = "#9C9C9C";
		selected.style.color = "#000000";
		
		// Hide buttons while the version isn't selected
        var buttons = selected.getElementsByClassName("edit");
		for (var i = 0; i < buttons.length; ++i)
		{
    		buttons[i].style.display = "none";
		}
	}
	
	// Select version
	selected = toBeSelected;
	document.cookie = "selected_version = " + selected.getElementsByClassName("versionName")[0].innerHTML;
	
	// Apply selected style
	selected.style.background = "#094AB2";
	selected.style.color = "#FFFFFF";
	
    // Show buttons when the version is selected
    var buttons = selected.getElementsByClassName("edit");
    for (var i = 0; i < buttons.length; ++i)
    {
        buttons[i].style.display = "inline";
    }
}

function edit()
{
    window.location = "ide.php"
}

function view()
{
    window.location = "versions/" + selected.getElementsByClassName("versionName")[0].innerHTML + ".html";
}

function rename()
{  
    var name = selected.getElementsByClassName("versionName");
    var new_name = prompt("Enter the new name:", name[0].innerHTML);
    
    if (new_name.length > 0)
    {
        document.cookie = "old_name=" + name[0].innerHTML;
        name[0].innerHTML = new_name;
        
        select(selected);
        
        $.ajax(
        {
            type: "POST", 
            url: "rename_version.php"
        });
    }
}

function copy()
{   
    ++numberOfVersions;
    
    var version = document.createElement("div");
    version.setAttribute("class", "version");
    version.setAttribute("id", "version" + numberOfVersions);   
    version.setAttribute("onmouseover", "select(this)");
    version.innerHTML = '<p class="versionName">Copy of ' + selected.getElementsByClassName("versionName")[0].innerHTML + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div><div class="edit" onclick="view()">View version</div>';
    document.getElementById("versionsList").appendChild(version);   
    
    // Scroll to the bottom of the page (.setTimeout workaround needed)
    window.setTimeout("window.scrollTo(0, 30000)", 0);
    
    $.ajax(
        {
            type: "POST", 
            url: "copy_version.php",
            success: function()
            {
                while (versionsList.childNodes.length > 0)
                {
                    versionsList.removeChild(versionsList.lastChild);
                }
                
                selected = null; 
                getVersions();
            }
        });
}

function createNewVersion()
{	
	++numberOfVersions;
	
	var version = document.createElement("div");
	version.innerHTML = "Creating version..";
	version.setAttribute("class", "version");
	version.setAttribute("id", "version" + numberOfVersions);	
	version.setAttribute("onmouseover", "select(this)");
	document.getElementById("versionsList").appendChild(version);	
	
	// Scroll to the bottom of the page (.setTimeout workaround needed)
    window.setTimeout("window.scrollTo(0, 30000)",0);
    
    $.ajax(
        {
            type: "POST", 
            url: "create_version.php",
            success: function(name){version.innerHTML = '<p class="versionName">' + name + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div>';}
        });
}

function removeVersion()
{
    if (selected != null)
    {
        var popup = confirm("Are you sure you want to delete the selected version?");
    
        if (popup == true)
        {
            $.ajax(
                {
                    type: "POST", 
                    url: "remove_version.php", 
                    success: function(message)
                    {
                        --numberOfVersions;
                        
                        while (versionsList.childNodes.length > 0)
                        {
                            versionsList.removeChild(versionsList.lastChild);
                        }
                        
                        selected = null; 
                        getVersions();
                    }
                });
        }
    }
}

function isVersionCompiled(version) 
{
    var request = false;
    
    request = new XMLHttpRequest;
    
    if (request) 
    {
        console.log("https://rynx.no-ip.org/kPanel/versions/" + escape(version) + ".html");
        request.open("GET", "https://rynx.no-ip.org/kPanel/versions/" + escape(version) + ".html", false);
        request.send();
        
        if (request.status == 200)
        { 
            return true; 
        }
    }
    
    return false;
}
