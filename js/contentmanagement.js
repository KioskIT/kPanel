var selected = null;

var numberOfVersions = 0;

var versionsList;

function getVersions()
{
    $.ajax(
        {
            type: "POST", 
            url: "tools/get_versions.php",
            success: function(rawVersionsList) {populateVersionsList(rawVersionsList);}
        });
}

function populateVersionsList(rawVersionsList)
{           
    versionsList = document.getElementById("versionsList");
    
    var versions = unescape(rawVersionsList.substr(rawVersionsList.indexOf("=") + 1)).split(":");
    
    for (var j = 0; j < versions.length - 1; ++j)
    {
        var dotIndex = versions[j].lastIndexOf(".");
        var extension = versions[j].substring(dotIndex + 1);
        var versionName = unescape(versions[j].substring(0, dotIndex)).split("+").join(" ");
        var version = document.createElement("div");
        version.innerHTML = "Loading version..";
        version.setAttribute("data-extension", extension);
        version.setAttribute("id", "version" + j);   
        version.setAttribute("onmouseover", "select(this)");
        version.setAttribute("onmouseout", "deselect(this)");
        
        if (extension == "version")
        {
            version.setAttribute("class", "version");
        
            if (isVersionCompiled(versionName))
            {
                version.innerHTML = '<p class="versionName">' + versionName + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div><div class="edit" onclick="view()">View version</div>';
            }
            else
            {
                version.innerHTML = '<p class="versionName">' + versionName + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div><div class="disabledEdit">View version</div>';                    
            }
        }
        else
        if (extension == "importedversion")
        {
            version.setAttribute("class", "importedVersion");
            version.innerHTML = '<p class="versionName">' + versionName + '</p><div class="disabledEdit">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="disabledEdit">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div><div class="edit" onclick="view()">View version</div>';
        }
        
        document.getElementById("versionsList").appendChild(version);
    }
    
    numberOfVersions = versions.length - 1;
}

function goHome()
{
    selected = null;
    window.location = "index.html";
}

function select(toBeSelected)
{
	// If there is a previously selected version
	if (selected != null)
	{
		deselect(selected);
	}
	
	// Select version
	selected = toBeSelected;
	
	// Apply selected style
	selected.style.zIndex = "2"; 
	selected.style.background = "#094AB2";
	selected.style.color = "#FFFFFF";
	
    // Show buttons when the version is selected
    var buttons = selected.getElementsByClassName("edit");
    for (var i = 0; i < buttons.length; ++i)
    {
        buttons[i].style.display = "inline";
    }
    
    buttons = selected.getElementsByClassName("disabledEdit");
    for (var i = 0; i < buttons.length; ++i)
    {
        buttons[i].style.display = "inline";
    }
}

function deselect(toBeDeselected)
{    
    // Apply unselected style
    selected.style.zIndex = "0"; 
    selected.style.background = "#9C9C9C";
    selected.style.color = "#000000";
    
    // Hide buttons while the version isn't selected
    var buttons = selected.getElementsByClassName("edit");
    for (var i = 0; i < buttons.length; ++i)
    {
        buttons[i].style.display = "none";
    }    
    buttons = selected.getElementsByClassName("disabledEdit");
    for (var i = 0; i < buttons.length; ++i)
    {
        buttons[i].style.display = "none";
    }    
}

function edit()
{
    window.location = "ide.php?selected_version=" + encodeURI(selected.getElementsByClassName("versionName")[0].innerHTML);
}

function view()
{
    if (selected.getAttribute("data-extension") == "version")
    {
        window.location = "versions/" + selected.getElementsByClassName("versionName")[0].innerHTML + ".php";
    }
    else
    if (selected.getAttribute("data-extension") == "importedversion")
    {
        window.location = "versions/" + selected.getElementsByClassName("versionName")[0].innerHTML + "/index.php";        
    }
}

function rename()
{  
    var name = selected.getElementsByClassName("versionName");
    var new_name = prompt("Enter the new name:", name[0].innerHTML);
    
    if (new_name.length > 0)
    {
        var old_name = name[0].innerHTML;
        name[0].innerHTML = new_name;
        
        select(selected);
        
        $.ajax(
        {
            type: "POST",
            data: "old_name=" + old_name + "&new_name=" + new_name + "&extension=" + selected.getAttribute("data-extension"),
            url: "tools/rename_version.php"
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
            url: "tools/copy_version.php",
            data: "selected_version=" + selected.getElementsByClassName("versionName")[0].innerHTML,
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
	version.setAttribute("data-extension", "version");
	version.setAttribute("id", "version" + numberOfVersions);	
	version.setAttribute("onmouseover", "select(this)");
	document.getElementById("versionsList").appendChild(version);	
	
	// Scroll to the bottom of the page (.setTimeout workaround needed)
    window.setTimeout("window.scrollTo(0, 30000)",0);
    
    $.ajax(
        {
            type: "POST", 
            url: "tools/create_version.php",
            success: function(name){version.innerHTML = '<p class="versionName">' + name + '</p><div class="edit" onclick="edit()">Edit version</div><div class="edit" onclick="rename()">Rename version</div><div class="edit" onclick="copy()">Copy version</div><div class="edit" onclick="removeVersion()">Delete version</div><div class="disabledEdit">View version</div>';}
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
                    url: "tools/remove_version.php",
                    data: "selected_version=" + selected.getElementsByClassName("versionName")[0].innerHTML + "&extension=" + selected.getAttribute("data-extension"),
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
        request.open("GET", "versions/" + escape(version) + ".php", false);
        request.send();
        
        if (request.status == 200)
        { 
            return true; 
        }
    }
    
    return false;
}

function importVersion()
{ 
    var file = document.getElementById("uploader").files[0];
        
    document.getElementById("form").style.display = "none";
    document.getElementById("uploading").style.display = "block";
    
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = sendFile;
}

function sendFile(event)
{
    var file = document.getElementById("uploader").files[0];      
    $.post("tools/importVersion.php", 
        { 
            data: event.target.result, 
            name: file.name,
        }, uploadDone);
}

function uploadDone()
{
    location.reload();
}

function hideImportPopup()
{
    document.getElementById("popup_bg").style.display = "none";
}

function showImportPopup()
{
    document.getElementById("popup_bg").style.display = "block";        
    document.getElementById("form").style.display = "block";
    document.getElementById("uploading").style.display = "none";
}
