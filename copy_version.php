<?PHP

    copy("versions/" . $_COOKIE[selected_version] . ".version", "versions/Copy of " . $_COOKIE[selected_version] . ".version");
    copy("versions/" . $_COOKIE[selected_version] . ".html", "versions/Copy of " . $_COOKIE[selected_version] . ".html");
    
?>