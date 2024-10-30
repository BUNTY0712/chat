<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");



$username = isset($_POST['username']) ? $_POST['username'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
// $password = isset($_POST['password']) ? $_POST['password'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$dob = isset($_POST['dob']) ? $_POST['dob'] : '';
$id = isset($_POST['id']) ? $_POST['id'] : '';


$conn = mysqli_connect('localhost', 'root', '', 'chatting-app');
if (!$conn) {
    die(json_encode(["message" => "Connection failed: " . mysqli_connect_error()]));
}

$sql = "UPDATE user SET username = '{$username}', email = '{$email}', phone = '{$phone}', dob = '{$dob}' WHERE id = '{$id}'";

$result = mysqli_query($conn, $sql);


if ($result) {
    $sql = "SELECT * FROM user WHERE id = '{$id}'";
    $result = mysqli_query($conn, $sql);
    $updated_user = mysqli_fetch_assoc($result);
    
    echo json_encode(["message" => "Successful Update", "data" => $updated_user]);
} else {
    echo json_encode(["message" => "Update failed: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
