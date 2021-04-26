<?php

$servername = "localhost";
$username = "grouxndj_gameUser";
$password = "{gF5l$IlX@R}";
$dbname = "grouxndj_game";
$conn = new mysqli($servername, $username, $password, $dbname);
// Create connection
if ($conn->connect_error) {
    // Check connection
    die("Connection failed: " . $conn->connect_error);
}
$ID = mysqli_real_escape_string($conn, $_POST['ID']);
$sql = "SELECT EXISTS(SELECT * from userData WHERE userID=$ID) ;";
$result = $conn->query($sql);
if ($result == 1) {    
    echo 'true';
    return;
}
else
{
    echo 'false';
    return;
}}
$conn->close();
?>
