import React, { useEffect, useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { useSetRecoilState } from "recoil";
import { CurrentCamFlag, CurrentImageState } from "../../recoil/Recoil";
import CameraIcon from '@mui/icons-material/Camera';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import './imagewebcam.css';

const ImageWebCam = () => {
  const camera = useRef(null);
  const setImage = useSetRecoilState(CurrentImageState);
  const setImageFlag = useSetRecoilState(CurrentCamFlag);
  const [imageList, setImageList] = useState([]);
  const [cameraError, setCameraError] = useState(false);
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState(null);
  const [isBackCamera, setIsBackCamera] = useState(true);

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

  useEffect(() => {
    const getVideoDevices = async () => {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);

      const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back')) || videoDevices[0];
      if (backCamera) {
        setActiveDeviceId(backCamera.deviceId);
      }
    };

    getVideoDevices();
  }, []);


  const handleTakePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setImage(photo);
      setImageList([photo, ...imageList]);
      setImageFlag(false);
    }
  };

  const toggleCamera = () => {
    if (devices.length > 1) {
      const nextCameraId = isBackCamera ? devices.find(device => device.label.toLowerCase().includes('front'))?.deviceId : devices.find(device => device.label.toLowerCase().includes('back'))?.deviceId;
      if (nextCameraId) {
        setActiveDeviceId(nextCameraId);
        setIsBackCamera(!isBackCamera);
      } else {
        alert("No other camera available.");
      }
    } else {
      alert("Only one camera available.");
    }
  };

  return (
    <>
      {!cameraError ? (
        <div>
          <Camera
            ref={camera}
            numberOfCamerasCallback={setNumberOfCameras => setDevices.length}
            aspectRatio={4 / 3}
            videoSourceDeviceId={activeDeviceId}
            errorMessages={{
              noCameraAccessible: 'Camera device is not accessible or connected!',
              permissionDenied: 'Permission denied. Please refresh and give camera permission.',
              switchCamera: 'Cannot switch cameras as only one is accessible.',
              canvas: 'Canvas is not supported.',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', margin: '20px 0px' }}>
              <button onClick={handleTakePhoto} className="cameraclickflip">
                <CameraIcon />
              </button>
              <button onClick={toggleCamera} className="cameraclickflip">
                <FlipCameraIosIcon />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '18px', marginLeft: '12px', color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
            Camera device is not accessible or connected!
          </p>
        </div>
      )}
    </>
  );
};

export default ImageWebCam;
