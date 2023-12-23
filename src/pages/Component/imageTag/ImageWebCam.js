import React, { useEffect, useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { useSetRecoilState } from "recoil";
import { CurrentCamFlag, CurrentImageState } from "../../recoil/Recoil";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CameraIcon from '@mui/icons-material/Camera';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import './imagewebcam.css';

const ImageWebCam = () => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const setImage=useSetRecoilState(CurrentImageState)
  const setImageflag=useSetRecoilState(CurrentCamFlag)
  const [image1, setImage1] = useState([]);
  const [cameraError, setCameraError] = useState(false);

  console.log("cameraError",cameraError);

  

  useEffect(() => {
    const checkCameraAccessibility = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        setCameraError(true);
      }
    };

    checkCameraAccessibility();
  }, []);


  return (
    <>
    { !cameraError && <div>
      <Camera
        ref={camera}
        numberOfCamerasCallback={setNumberOfCameras}
        aspectRatio={4/3}
        facingMode={'environment'}
        errorMessages={
            {
                noCameraAccessible: '',
                permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                switchCamera:
                'It is not possible to switch camera to different one because there is only one video device accessible.',
                canvas: 'Canvas is not supported.'
              }
        }
        
      />
      <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{display:'flex',gap:'12px',margin:'20px 0px'}}>
          <button
            onClick={() => {
              if (camera.current) {
                const photo = camera.current.takePhoto();
                console.log(photo);
                setImage(photo);
                setImage1([photo, ...image1]);
                setImageflag(false)
              }
            }}
            className="cameraclickflip"
          >
            <CameraIcon/>
          </button>
          <button
            disabled={numberOfCameras <= 1}
            onClick={() => {
              if (camera.current) {
                const result = camera.current.switchCamera();
                console.log(result);
              }
            }}
            className="cameraclickflip"
          >
            <FlipCameraIosIcon/>
          </button>
        </div>
      </div>
    </div>
    }
    {
        cameraError && 
        <div >
            <div style={{textAlign:'end',marginRight:'12px',marginTop:'7px'}}>
                <HighlightOffIcon style={{fontSize:'35px'}} onClick={()=>setImageflag(false)}/>
            </div>
            <p style={{fontSize:'18px',marginLeft:'12px',color:'red'}}>
            camera device is not accessible or connected!!!
            </p>
        </div>
    }
    </>
  );
};

export default ImageWebCam;
