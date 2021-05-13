<?php
$servername = "localhost";
$username = "grouxndj_testAccount";
$password = "york8000";
$dbname = "grouxndj_game";
$conn = new mysqli($servername, $username, $password, $dbname);
// Create connection
if ($conn->connect_error) {
    // Check connection
    die("Connection failed: " . $conn->connect_error);
}
// $lesson = mysqli_real_escape_string($conn, $_POST['lesson']);
// $level = mysqli_real_escape_string($conn, $_POST['level']);
$sql = "SELECT levelData FROM Levels WHERE levelNum=0 ;";

$result = $conn->query($sql);
echo $result;
$conn->close();
?>
