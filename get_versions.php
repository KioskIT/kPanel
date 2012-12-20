<?PHP

    $handle = opendir("versions");

    // Skip . ..
    $entry = readdir($handle);
    $entry = readdir($handle);

    $versionsList = "";
    while (false !== ($entry = readdir($handle)))
    {
       $versionsList .= $entry . ":";
    }

    setcookie("versions_list", $versionsList);

?>