<?php
include('connect_db.php');
$sender_id = $_POST['sender_id'];
$grp_id = $_POST['grp_id'];
// SQL query to join grp_message with user table using sender_id and fetch the username
$sql = "SELECT grp_message.*, user.username
        FROM grp_message
        JOIN user ON grp_message.sender_id = user.id
        WHERE grp_message.grp_id='$grp_id'";
$result = mysqli_query($conn, $sql);
if ($result) {
    $userData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        // Include the message data along with the username
        $userData["usermessages"][] = $row;
    }
    if (!empty($userData["usermessages"])) {
        echo json_encode($userData);
    } else {
        $response = array("message" => "No messages found");
        echo json_encode($response);
    }
} else {
    $response = array("message" => "Query failed: " . mysqli_error($conn));
    echo json_encode($response);
}
mysqli_close($conn);
?>