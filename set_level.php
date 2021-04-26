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
$level = mysqli_real_escape_string($conn, $_POST['level']);
$sql = "UPDATE userData SET level=$level WHERE userID=$ID ;";
//update the highscore value in the database
$result = $conn->query($sql);
$conn->close();
?>
