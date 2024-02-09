<?php
$database = '/url_database.txt';

if (!empty($_GET['c'])) {
    $shortCode = $_GET['c'];
    $urls = file($database);

    foreach ($urls as $url) {
        list($code, $longUrl) = explode(",", $url, 2);
        if (trim($code) == $shortCode) {
            header("Location: " . trim($longUrl));
            exit;
        }
    }
}

echo "Kurze URL nicht gefunden.";
?>