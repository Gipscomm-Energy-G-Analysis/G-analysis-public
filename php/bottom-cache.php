<?php
// Cache the contents to a cache file
$cached = fopen("cache/".$cachefile, 'w');
fwrite($cached, ob_get_contents());
fclose($cached);
ob_end_flush(); // Send the output to the browser
?>