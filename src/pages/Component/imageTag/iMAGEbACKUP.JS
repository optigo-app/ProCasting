// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import ImageUploader from "./ImageUploader";
// import { useRecoilValue } from "recoil";
// import { CurrentImageState } from "../../recoil/Recoil";

// const ImageUploaderPage = () => {
//   const imageShow = useRecoilValue(CurrentImageState);
//   console.log("imageShow: ", imageShow);

//   alert('kjsakdjkas', JSON.stringify(imageShow))

//   const [uploadedImages, setUploadedImages] = useState([]);

//   const handleImagesUpload = (images) => {
//     setUploadedImages(images);
//   };

//   useEffect(() => {
//     if (imageShow && imageShow.length > 0) {
//       console.log("Updated images from Recoil: ", imageShow);
//     }
//   }, [imageShow]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Image Uploader</h2>

//       <ImageUploader onImagesUpload={handleImagesUpload} />

//       <div style={{ marginTop: "20px" }}>
//         <h3>Uploaded Images</h3>

//         <Swiper
//           spaceBetween={10}
//           slidesPerView={3}
//           loop={true}
//           centeredSlides={true}
//           pagination={{ clickable: true }}
//         >
//           {uploadedImages.length > 0 && uploadedImages.map((image, index) => (
//             <SwiperSlide key={image.id}>
//               <img
//                 src={image.url}
//                 alt={`Uploaded Image ${index}`}
//                 style={{ width: "100%", borderRadius: "8px" }}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <h3>Images from Recoil:</h3>
//         <Swiper
//           spaceBetween={10}
//           slidesPerView={3}
//           loop={true}
//           centeredSlides={true}
//           pagination={{ clickable: true }}
//         >
//           {imageShow && imageShow.length > 0 && imageShow.map((image, index) => (
//             <SwiperSlide key={image.id}>
//               <img
//                 src={image.url}
//                 alt={`Recoil Image ${index}`}
//                 style={{ width: "100%", borderRadius: "8px" }}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default ImageUploaderPage;