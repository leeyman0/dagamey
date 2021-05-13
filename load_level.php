<?php
echo "Hello der";
$servername = "localhost";
$username = "grouxndj_testAccount";
$password = "york7000";
$dbname = "grouxndj_game";
echo "We maka da connek";
$conn = new mysqli($servername, $username, $password, $dbname);
echo "Connek med";
// Create connection
if ($conn->connect_error) {
    // Check connection
    echo "You are dead";
    die("Connection failed: " . $conn->connect_error);
}
// $lesson = mysqli_real_escape_string($conn, $_POST['lesson']);
// $level = mysqli_real_escape_string($conn, $_POST['level']);
$sql = "SELECT levelData FROM Levels WHERE levelNum=0 ;";

$result = $conn->query($sql);
echo $result;
$conn->close();
?>
