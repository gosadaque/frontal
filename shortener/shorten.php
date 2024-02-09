<?php
// Datei, in der die Zuordnungen gespeichert werden
$database = '/url_database.txt';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['url'])) {
    $longUrl = $_POST['url'];
    $shortCode = generateShortCode();

    // Speichern der Zuordnung
    file_put_contents($database, "$shortCode,$longUrl\n", FILE_APPEND);

    $shortUrl = "https://$_SERVER[HTTP_HOST]/s?c=$shortCode";
    echo "Kurze URL: $shortUrl";
} else {
    echo "Bitte geben Sie eine URL zum Kürzen ein.";
}

function generateShortCode() {
    return substr(md5(uniqid(rand(), true)), 0, 6);
}
?>
