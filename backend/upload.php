<?php
include('connect_db.php');

// Debugging: print $_FILES
// print_r($_FILES); die;

$sender_id = $_POST['sender_id'] ?? '';
$receiver_id = $_POST['receiver_id'] ?? '';

if (!$conn) {
    $response = ['success' => false, 'message' => 'Failed to connect to the database.'];
    echo json_encode($response);
    exit();
}

// Function to handle file uploads
function handleFileUpload($fileInputName, $uploadDirectory) {
    if (isset($_FILES[$fileInputName])) {
        $file = $_FILES[$fileInputName];
        $tempFilePath = $file['tmp_name'];
        $uniqueFileName = uniqid() . "_" . $file['name'];
        $targetFilePath = $uploadDirectory . $uniqueFileName;

        if (!move_uploaded_file($tempFilePath, $targetFilePath)) {
            return ['success' => false, 'message' => "Failed to move the file: {$fileInputName}."];
        }

        return ['success' => true, 'fileName' => $uniqueFileName];
    }

    return ['success' => true, 'fileName' => '']; // No file uploaded
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/chatting-app-php-react-2/files/';
    // print_r($uploadDirectory); die;

    // Ensure the directory exists and is writable
    if (!is_dir($uploadDirectory) || !is_writable($uploadDirectory)) {
        $response = ['success' => false, 'message' => 'Upload directory is not valid.'];
        echo json_encode($response);
        exit();
    }

    // Handle image file
    $imageUploadResult = handleFileUpload('image', $uploadDirectory);
    if (!$imageUploadResult['success']) {
        echo json_encode($imageUploadResult);
        exit();
    }
    $uniqueImageFileName = $imageUploadResult['fileName'];

    // Handle PDF or other file
    $fileUploadResult = handleFileUpload('pdf', $uploadDirectory);
    if (!$fileUploadResult['success']) {
        echo json_encode($fileUploadResult);
        exit();
    }
    $uniquePdfFileName = $fileUploadResult['fileName'];

    // Get the message from POST data
    $message = $_POST['message'] ?? '';
$message = mysqli_real_escape_string($conn, $message);

$rply_msg = $_POST['rply_msg'] ?? '';
$rply_msg = mysqli_real_escape_string($conn, $rply_msg);
    $seen = $_POST['seen'] ?? '';

    // SQL query to insert message into database
    $sql = "INSERT INTO messages (sender_id, receiver_id, message, rply_msg, image, pdf) 
            VALUES ('$sender_id', '$receiver_id', '$message', '$rply_msg', '$uniqueImageFileName', '$uniquePdfFileName')";

    // Update sender's seen status
    $sql2 = "UPDATE user SET s_seen = 1 WHERE id = '{$sender_id}'";
    mysqli_query($conn, $sql2);

    // Update receiver's seen status
    $sql3 = "UPDATE user SET r_seen = 1 WHERE id = '{$receiver_id}'";
    mysqli_query($conn, $sql3);

    // Execute SQL query
    if (mysqli_query($conn, $sql)) {
        // If insertion is successful, fetch all messages
        $sql1 = "SELECT * FROM messages";
        $result1 = mysqli_query($conn, $sql1);
        $data = ['image' => []];

        while ($row = mysqli_fetch_assoc($result1)) {
            $data['image'][] = $row;
        }

        $response = ['success' => true, 'message' => 'Files uploaded successfully.', 'data' => $data];
        echo json_encode($response);
    } else {
        // If SQL query fails
        $response = ['success' => false, 'message' => 'Failed to execute SQL query.'];
        echo json_encode($response);
    }
} else {
    // If invalid request method
    $response = ['success' => false, 'message' => 'Invalid request method.'];
    echo json_encode($response);
}

// header('Content-Type: application/json');
?>
