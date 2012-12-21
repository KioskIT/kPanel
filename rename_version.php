<?PHP
    
    rename("versions/" . $_COOKIE["old_name"] . ".version", "versions/" . $_COOKIE["selected_version"] . ".version");
    rename("versions/" . $_COOKIE["old_name"] . ".html", "versions/" . $_COOKIE["selected_version"] . ".html");
    
?>