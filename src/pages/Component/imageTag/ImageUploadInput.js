import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageUploader from "./ImageUploader";
import { useRecoilValue } from "recoil";
import { CurrentImageState } from "../../recoil/Recoil";

const ImageUploaderPage = () => {
  const imageShow = useRecoilValue(CurrentImageState);
  console.log("imageShow: ", imageShow);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImagesUpload = (images) => {
    setUploadedImages(images);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Image Uploader</h2>
      <ImageUploader onImagesUpload={handleImagesUpload} />
    </div>
  );
};

export default ImageUploaderPage;
