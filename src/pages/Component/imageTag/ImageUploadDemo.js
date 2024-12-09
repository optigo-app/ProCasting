import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageUploaderWithCameraAndMediaSelection = () => {
  const [images, setImages] = useState([]);
  const [uploadSource, setUploadSource] = useState("");

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Compress and add files to state
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleUploadSourceChange = (e) => {
    setUploadSource(e.target.value);
  };

  const isMobileOrTablet = () => {
    return /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent);
  };

alert(JSON.stringify(images))

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload or Capture Images</h2>

      {/* Dropdown for selecting upload source */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="uploadSource">Choose upload source: </label>
        <select
          id="uploadSource"
          value={uploadSource}
          onChange={handleUploadSourceChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Select an option</option>
          <option value="media">Gallery/Media</option>
          {isMobileOrTablet() && <option value="camera">Camera</option>}
        </select>
      </div>

      {/* File Input for Uploading */}
      <input
        type="file"
        // accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ marginBottom: "20px" }}
        // capture={uploadSource === "camera" ? "environment" : undefined}
        // disabled={uploadSource === ""}
      />

      {/* Display Uploaded Images */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((image) => (
          <div key={image.id} style={{ position: "relative" }}>
            <img
              src={image.url}
              alt="Uploaded"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}
      </div>

      {/* Swiper Slider */}
      {images.length > 0 && (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          style={{ marginTop: "20px", width: "300px", height: "300px" }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                src={image.url}
                alt="Slide"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImageUploaderWithCameraAndMediaSelection;
