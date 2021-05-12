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
$lesson = mysqli_real_escape_string($conn, $_POST['lesson']);
$level = mysqli_real_escape_string($conn, $_POST['level']);
$sql = "SELECT levelData FROM Levels  WHERE levelNum=$level ;";

$result = $conn->query($sql);
echo $result;
$conn->close();
?>
