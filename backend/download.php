<?php
// Get the filename from the query parameter
$file = isset($_GET['file']) ? $_GET['file'] : '';

if (empty($file)) {
    http_response_code(400);
    echo "No file specified.";
    exit;
}
// Define the file path
$filePath = $_SERVER['DOCUMENT_ROOT'] . '/files/' . $file;

// Check if the file exists
if (file_exists($filePath)) {
    // Set headers to force download
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));
    // Clear the output buffer
    ob_clean();
    flush();
    
    // Read the file and send it to the output buffer
    readfile($filePath);
    exit;
} else {
    // File does not exist
    http_response_code(404);
    echo "File not found.";
    exit;
}
?>
