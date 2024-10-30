<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

session_start(); // Start the session

$username = $_POST['username'];
$password = $_POST['password'];

$conn = mysqli_connect('localhost', 'root', '', 'chatting-app');
if (!$conn) {
    die(json_encode(["message" => "Connection failed: " . mysqli_connect_error()]));
}

$sql = "SELECT * FROM admin WHERE username = '{$username}'";
$result = mysqli_query($conn, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        // Verify the password
        if (password_verify($password, $row['password'])) {
            $_SESSION['loggedadmin'] = $row; 
            echo json_encode($_SESSION['loggedadmin']);
        } else {
            echo json_encode(["message" => "Invalid username or password", "date" => $row]);
        }
    } else {
        echo json_encode(["message" => "Invalid username or password"]);
    }
} else {
    echo json_encode(["message" => "Query failed: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
