if (isset($_FILES['original_image']) && isset($_FILES['compressed_image'])) {
    $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/chatting-app-php-react/images/';
    $compressDirectory = $_SERVER['DOCUMENT_ROOT'] . '/chatting-app-php-react/compressimages/';

    if (!is_dir($uploadDirectory) || !is_writable($uploadDirectory)) {
        $response = ['success' => false, 'message' => 'Upload directory is not valid.'];
        echo json_encode($response);
        exit();
    }

    if (!is_dir($compressDirectory) || !is_writable($compressDirectory)) {
        $response = ['success' => false, 'message' => 'Compress directory is not valid.'];
        echo json_encode($response);
        exit();
    }

    // Handle original image file
    $originalImageFile = $_FILES['original_image'];
    $originalImageFileName = $originalImageFile['name'];
    $originalImageTempFilePath = $originalImageFile['tmp_name'];
    $uniqueOriginalImageFileName = uniqid() . "_" . $originalImageFileName;
    $originalImageTargetFilePath = $uploadDirectory . $uniqueOriginalImageFileName;

    // Handle compressed image file
    $compressedImageFile = $_FILES['compressed_image'];
    $compressedImageFileName = $compressedImageFile['name'];
    $compressedImageTempFilePath = $compressedImageFile['tmp_name'];
    $uniqueCompressedImageFileName = uniqid() . "_" . $compressedImageFileName;
    $compressedImageTargetFilePath = $compressDirectory . $uniqueCompressedImageFileName;

    // Move the original image file
    if (!move_uploaded_file($originalImageTempFilePath, $originalImageTargetFilePath)) {
        $response = ['success' => false, 'message' => 'Failed to move the original image file.'];
        echo json_encode($response);
        exit();
    }

    // Move the compressed image file
    if (!move_uploaded_file($compressedImageTempFilePath, $compressedImageTargetFilePath)) {
        $response = ['success' => false, 'message' => 'Failed to move the compressed image file.'];
        echo json_encode($response);
        exit();
    }

    $response = ['success' => true, 'message' => 'Images uploaded successfully.', 'originalFileName' => $uniqueOriginalImageFileName, 'compressedFileName' => $uniqueCompressedImageFileName];
    echo json_encode($response);
    exit();
} else {
    $response = ['success' => false, 'message' => 'No image files provided.'];
    echo json_encode($response);
    exit();
}