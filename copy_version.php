<?PHP
    
    $current_time = time();
    
    copy("versions/" . $_POST[selected_version] . ".version", "versions/" . $_POST[selected_version] . "(" . $current_time . ").version");
    copy("versions/" . $_POST[selected_version] . ".html", "versions/" . $_POST[selected_version] . "(" . $current_time . ").html");
    
?>