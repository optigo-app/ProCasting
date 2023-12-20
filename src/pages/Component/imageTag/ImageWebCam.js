import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";

const ImageWebCam = () => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);

  return (
    <div>
      <Camera
        ref={camera}
        numberOfCamerasCallback={setNumberOfCameras}
        aspectRatio={4/3}
      />
      <div>
        <div style={{display:'flex',border:'1px solid red'}}>
      <img src={image} alt="Image preview" style={{width:'100%',objectFit:'cover'}}/>
        </div>

<div>

      <button
         onClick={() => {
             if (camera.current) {
                 const photo = camera.current.takePhoto();
              console.log(photo);
              setImage(photo);
            }
        }}
        >
        Take Photo
      </button>
      <button
        disabled={numberOfCameras <= 1}
        onClick={() => {
            if (camera.current) {
                const result = camera.current.switchCamera();
                console.log(result);
            }
        }}
        >
        Change Camera
      </button>
    </div>
      </div>


    {/* <iframe src="https://example.com/camera-pro-iframe" allow="camera;"/> */}
    </div>
  );
};

export default ImageWebCam;
