<?php
include "connect_db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");
// print_r($_POST); die;
$id = $_POST['id'];
$newpassword = $_POST['newpassword'];
$oldpassword = $_POST['oldpassword'];



$sql1 = "SELECT password FROM admin WHERE id='$id'";
$result1 = mysqli_query($conn, $sql1);

if (mysqli_num_rows($result1) == 0) {
    echo json_encode(["message" => "User not found"]);
    mysqli_close($conn);
    exit();
}

$row = mysqli_fetch_assoc($result1);

$hashedpassword = $row['password'];

if (!password_verify($oldpassword, $hashedpassword)) {
    echo json_encode(["message" => "Old password does not match",
        "success" => true]);
    mysqli_close($conn);
    exit();
}

$hashed_newpassword = password_hash($newpassword, PASSWORD_DEFAULT);

$sql = "UPDATE admin SET password ='$hashed_newpassword' WHERE id = '$id'";
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode([
        "message" => "Password successfully updated",
        "success" => true
    ]);
} else {
    echo json_encode([
        "message" => "Update failed: " . mysqli_error($conn),
        "success" => false
    ]);
}

mysqli_close($conn);
?>
