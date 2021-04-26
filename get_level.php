<?php
$servername = "localhost";
$username = "grouxndj_gameUser";
$password = "{gF5l$IlX@R}";
$dbname = "grouxndj_game";
$conn = new mysqli($servername, $username, $password, $dbname);
// Create connection
if ($conn->connect_error) {
    // Check connection
    die("Connection failed: " . $conn->connect_error);}
$ID = mysqli_real_escape_string($conn, $_POST['ID']);
$sql = "SELECT level FROM userData WHERE userID=$ID ;";
//Get the high schore from the database
$result = $conn->query($sql);
//Puts result into a json
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $response['level'] = $row["level"];
    }
    echo json_encode($response);
} else {
    echo "  0 results";
}
$conn->close();
?>
