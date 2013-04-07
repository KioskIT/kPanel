<?PHP

    $handle = opendir("../versions");

    // Skip . ..
    $entry = readdir($handle);
    $entry = readdir($handle);

    $versionsList = "";
    while (false !== ($entry = readdir($handle)))
    {
        $extension = substr($entry, strrpos($entry, '.') + 1);
        if ($extension == "version" || $extension == "importedversion")
        {
            $versionsList .= $entry . ":";
        }
    }

    echo $versionsList;

?>