var selected = null;
var current = null;

var numberOfVersions = 15;
var renaming = false;

function populateVersionsList()
{
    var versionsList = document.getElementById("versionsList");
    
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
                version.innerHTML = "The name of some version you have created";
                version.setAttribute("class", "version");
                version.setAttribute("id", "version" + numberOfVersions);   
                version.setAttribute("onmouseover", "select(this)");
                version.innerHTML = '<p class="versionName">' + versionName + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div>';
                document.getElementById("versionsList").appendChild(version);
            }
            
            break;
        }
    }
}

function select(toBeSelected)
{
	// If there is a previously selected version
	if (selected != null && renaming == false) // due to some bug, select() gets randomly run after rename()
	{
	    if (selected != current)
	    {
    		// Apply unselected style
    		selected.style.background = "#9C9C9C";
    		selected.style.color = "#000000";
		}
		
		// Hide buttons while the version isn't selected
        var buttons = selected.getElementsByClassName("edit");
		for (var i = 0; i < buttons.length; ++i)
		{
    		buttons[i].style.display = "none";
		}
	}
	
	// Select version
	selected = toBeSelected;	
	
    if (selected != current)
    {
    	// Apply selected style
    	selected.style.background = "#094AB2";
    	selected.style.color = "#FFFFFF";
	}
	
    // Show buttons when the version is selected
    if (renaming == false) // due to some bug, select() gets randomly run after rename()
    {
        var buttons = selected.getElementsByClassName("edit");
        for (var i = 0; i < buttons.length; ++i)
        {
            buttons[i].style.display = "inline";
        }
    }
}

function edit()
{
    window.location = "ide.php"
    document.cookie = "selected_version = " + selected.getElementsByClassName("versionName")[0].innerHTML;
}

function rename()
{        
    // Hide buttons while renaming
    var buttons = selected.getElementsByClassName("edit");
    for (var i = 0; i < buttons.length; ++i)
    {
        buttons[i].style.display = "none";
    }
    
    // Enable renaming
    var name = selected.getElementsByClassName("versionName");
    name[0].setAttribute("contenteditable", "true");
    name[0].style.webkitUserSelect = "auto";
    name[0].style.background="#666666";
    renaming = true;
    
    // Add confirmButton
    var confirmButton = document.createElement("div");
    confirmButton.innerHTML = "Confirm";
    confirmButton.setAttribute("class", "edit");
    confirmButton.setAttribute("onclick", "confirmRename()");
    confirmButton.style.display = "inline";
    selected.appendChild(confirmButton);
}

function confirmRename()
{
    // Remove confirmButton
    selected.removeChild(selected.lastChild);
    
    // Disable renaming
    var name = selected.getElementsByClassName("versionName");
    name[0].setAttribute("contenteditable", "false");
    name[0].style.webkitUserSelect = "none";
    name[0].style.background="inherit";
    renaming = false;
        
    // Refresh selection
    select(selected);
}

function copy()
{   
    ++numberOfVersions;
    
    var version = document.createElement("div");
    version.innerHTML = "The name of some version you have created";
    version.setAttribute("class", "version");
    version.setAttribute("id", "version" + numberOfVersions);   
    version.setAttribute("onclick", "select(this)");
    version.innerHTML = '<p class="versionName">Copied version</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div>';
    document.getElementById("versionsList").appendChild(version);   
    
    // Scroll to the bottom of the page (.setTimeout workaround needed)
    window.setTimeout("window.scrollTo(0, 30000)", 0);
}

function createNewVersion()
{	
	++numberOfVersions;
	
	var version = document.createElement("div");
	version.innerHTML = "The name of some version you have created";
	version.setAttribute("class", "version");
	version.setAttribute("id", "version" + numberOfVersions);	
	version.setAttribute("onmouseover", "select(this)");
	version.innerHTML = '<p class="versionName">The name of some version you just created</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div>';
	document.getElementById("versionsList").appendChild(version);	
	
	// Scroll to the bottom of the page (.setTimeout workaround needed)
    window.setTimeout("window.scrollTo(0, 30000)",0);
}

function removeVersion()
{
    var popup = confirm("Are you sure you want to delete the selected version?");

    if (popup == true)
    {
        --numberOfVersions;
    
        selected.parentNode.removeChild(selected);
        selected = null;
    }
}
