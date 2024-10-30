import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import dragDrop from "drag-drop";
import { Box } from "@mui/material";

const ImageUpload = () => {
  const backendUrl = process.env.REACT_APP_API_URL;

  const { id, receiverId } = useSelector((state) => state.ui);

  const handleDrop = async (files) => {
    console.log("Files dropped:", files);
    console.log("Current sender_id:", id);
    console.log("Current receiver_id:", receiverId);

    const formData = new FormData();
    formData.append("sender_id", id);
    formData.append("receiver_id", receiverId);

    let imageFile = null;
    let pdfFile = null;

    // Iterate through dropped files to find image and pdf
    Array.from(files).forEach((file) => {
      if (file.type.includes("image")) {
        if (!imageFile) {
          imageFile = file; // Only keep the first image found
        }
      } else if (file.type.includes("pdf")) {
        if (!pdfFile) {
          pdfFile = file; // Only keep the first pdf found
        }
      }
    });

    if (imageFile) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedImage = await imageCompression(imageFile, options);
        formData.append("original_image", imageFile);
        formData.append("compressed_image", compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }

    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }

    // Send data to backend
    fetch(`${backendUrl}/upload.php`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const dropElement = document.body;

    const dropHandler = (files, pos, fileList, directories) => {
      console.log("Drop event triggered");
      handleDrop(files);
    };

    // Initialize drag-and-drop functionality
    const removeDrop = dragDrop(dropElement, { onDrop: dropHandler });

    // Cleanup function
    return () => {
      removeDrop();
    };
  }, [id, receiverId]);

  return (
    <>
      <Box>Drag to upload image</Box>
    </>
  );
};

export default ImageUpload;
