import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  // Function to handle the image upload and compression
  const handleImageUpload = async (e, setImage, imageName, companyCode, mobileNo) => {
    const file = e.target.files[0];

    if (!file) {
      // alert('Please select a file');
      return;
    }

    // alert("File selected: " + file.name);

    // Compress the image using the browser-image-compression library
    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 800, // Maximum width or height in pixels
      useWebWorker: true, // Use web worker for better performance
    };

    let compressedFile;
    try {
      compressedFile = await imageCompression(file, options);
      // alert("Image compressed successfully!");
    } catch (error) {
      console.error("Error compressing image: ", error);
      // alert("Error compressing the image.");
      return;
    }

    // Prepare the FormData with the compressed image
    const formData = new FormData();
    formData.append('pdf', compressedFile);  // Send the compressed file
    formData.append('mode', 'savetreephoto');
    formData.append('UploadLogicalPath', 'https://cdnfs.optigoapps.com/content-global3/');
    formData.append('ukey', 'test71IBOKTQHSCLEN367X9');
    formData.append('uploadname', 'castingtree');
    formData.append('castbatchno', 'XP');

    // alert('Form data prepared: ' + JSON.stringify({
    //   file: compressedFile.name,
    //   mode: 'savetreephoto',
    //   ufcc: companyCode,
    //   uploadname: imageName,
    //   leadname: mobileNo
    // }));

    try {
      // alert("Sending request to the server...");

      // Setting up the headers
      const headers = {
        'Authorization': "Bearer 8456510807569990",  // Add the Authorization header
        'Yearcode': "e3tsaXZlLm9wdGlnb2FwcHMuY29tfX17ezIwfX17e3Rlc3Q3MX19e3t0ZXN0NzF9fQ==",  // Yearcode header
        'Version': "V4",  // Version header
        'sp': '2'  // sp header
      };

      // Sending request with fetch
      const response = await fetch('http://api.optigoapps.com/test/photoupload.aspx', {
        method: 'POST',
        headers: headers,
        body: formData // Sending the formData as the body of the request
      });

      const data = await response.json();

      // alert("API Response: " + JSON.stringify(data));

      // Check if the response contains the image URL
      if (data && data.data && data.data[0]) {
        const imageUrl = data.data[0][imageName];

        // alert("Image uploaded successfully! Image URL: " + imageUrl);

        setImage(imageUrl);
        setFormData(prevState => ({
          ...prevState,
          [imageName]: imageUrl,
        }));
      } else {
        // alert("Error: Image upload response did not contain a valid URL.");
      }
    } catch (error) {
      // Handle network or API errors
      console.error('Error uploading image:', error);

      // Check if the error is related to CORS
      if (error.message.includes('CORS')) {
        // alert("CORS Error: The request was blocked due to cross-origin restrictions.");
      } else {
        // alert("Error occurred while uploading the image: " + error.message);
      }
    }
  };


  const postDummyData = async () => {
    // alert("Function start: postDummyData");

    // Dummy data to send in the request
    const dummyData = {
        name: "John Doe",
        email: "john.doe@example.com",
        message: "This is a test message",
    };

    // alert("Request Data:\n" + JSON.stringify(dummyData, null, 2));

    try {
        // alert("Sending API request...");

        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/posts", // Dummy API endpoint
            dummyData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Log the entire response
        // alert("API Response Received:\n" + JSON.stringify(response, null, 2));
        // alert("Response Data:\n" + JSON.stringify(response.data, null, 2));

        return response;
    } catch (error) {
        // Log detailed error information
        // alert("Error occurred during API call: " + error.message);

        if (error.response) {
            // alert("Error Response Data:\n" + JSON.stringify(error.response.data, null, 2));
            // alert("Error Response Status: " + error.response.status);
            // alert("Error Response Headers:\n" + JSON.stringify(error.response.headers, null, 2));
        } else {
            // alert("Network or other error: " + error.message);
        }

        throw error;
    }
};


  return (
    <div>
      <h2>Upload Image</h2>

      {/* File input for image upload */}
      <input
        type="file"
        onChange={(e) => handleImageUpload(e, setImage, 'imageName', 'companyCode123', 'mobileNo123')}
        accept="image/*" // Optional: restrict to image files only
      />

      {/* Display the uploaded image if available */}
      {image && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={image} alt="Uploaded" width="200" height="200" />
        </div>
      )}
      <button onClick={postDummyData}>Post Dummy Data</button>
    </div>
  );
};

export default ImageUploadComponent;
