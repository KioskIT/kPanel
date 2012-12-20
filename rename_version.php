<?PHP
    
    rename("versions/" . $_COOKIE["old_name"] . ".version", "versions/" . $_COOKIE["selected_version"] . ".version");
    
?>