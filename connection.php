<?php

$servername = '127.0.0.1';
$username = 'mdfm1Ku3cO';
$password = 'lfKaDZ1RkJ';
$database = 'dbmdfm1Ku3cO';

$conn = new mysqli($servername, $username, $password, $database);

$config_file = 'connection.php';
$file = fopen($config_file, "r");
$contents = fread($file, filesize($config_file));
fclose($file);

?>
