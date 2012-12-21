<?PHP

    unlink("versions/" . $_COOKIE["selected_version"] . ".version");
    unlink("versions/" . $_COOKIE["selected_version"] . ".html");
    
?>