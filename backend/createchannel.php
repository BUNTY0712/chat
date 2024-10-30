<?php

include('connect_db.php');

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];
$grp_name = $_POST['grp_name'];

// Convert receiver_id array to JSON string
$receiver_id_json = json_encode($receiver_id);

// Insert query
$sql = "INSERT INTO channel (sender_id, receiver_id, grp_name) VALUES ('$sender_id', '$receiver_id_json', '$grp_name')";
if (mysqli_query($conn, $sql)) {
    // Query to get all channels including the newly inserted one
    $sql1 = "SELECT * FROM channel";
    $result = mysqli_query($conn, $sql1);

    if (mysqli_num_rows($result) > 0) {
        $channels = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $channels[] = $row;
        }

        echo json_encode([
            "message" => "Channel successfully created",
            "success" => true,
            "data" => $channels
        ]);
    } else {
        echo json_encode([
            "message" => "No channels found",
            "success" => false
        ]);
    }
} else {
    echo json_encode([
        "message" => "Channel insertion failed: " . mysqli_error($conn),
        "success" => false
    ]);
}

// Close the database connection
mysqli_close($conn);

?>
