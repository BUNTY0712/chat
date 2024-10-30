<?php

include "connect_db.php";

header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$id = $_POST['id'];
$newpassword = $_POST['newpassword'];
$oldpassword = $_POST['oldpassword'];



$sql1 = "SELECT password FROM user WHERE id='$id'";
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

$sql = "UPDATE user SET password = '$hashed_newpassword' WHERE id = '$id'";
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
