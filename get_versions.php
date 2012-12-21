<?PHP

    $handle = opendir("versions");

    // Skip . ..
    $entry = readdir($handle);
    $entry = readdir($handle);

    $versionsList = "";
    while (false !== ($entry = readdir($handle)))
    {
        if (substr($entry, strrpos($entry, '.') + 1) == "version")
        {
            $versionsList .= $entry . ":";
        }
    }

    setcookie("versions_list", $versionsList);

?>