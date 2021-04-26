<?php
$servername = "localhost";
$username = "grouxndj_gameUser";
$password = "{gF5l$IlX@R}";
$dbname = "grouxndj_game";
$conn = new mysqli($servername, $username, $password, $dbname);
// Create connection
if ($conn->connect_error) {
    // Check connection
    die("Connection failed: " .
        $conn->connect_error);
}
$ID = mysqli_real_escape_string($conn, $_POST['ID']);
//Gets the value of the passed variable after score:
$sql = "INSERT INTO userData (userID, level) VALUES('$ID', 1);";
$result = $conn->query($sql);
$conn->close();
?>
