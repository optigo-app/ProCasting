import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentImageApi, CurrentImageState } from "../../recoil/Recoil";
import browserImageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import { uploadPhotos } from "../../../Utils/API/UploadPhotoApi";
import { toast } from "react-toastify";

const ImageUploader = ({ treeBatch, lableName, mode, uploadName }) => {
    const setImage = useSetRecoilState(CurrentImageState);
    const image = useRecoilValue(CurrentImageState)
    console.log('image: ', image);
    const setImageApiRes = useSetRecoilState(CurrentImageApi);

    const [isCameraAvailable, setIsCameraAvailable] = useState(false);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            setIsMobileDevice(
                /iphone|ipod|ipad|android/.test(userAgent)
            );
        };

        const checkCameraAvailability = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const hasCamera = devices.some(device => device.kind === 'videoinput');
            setIsCameraAvailable(hasCamera);
        };

        checkDeviceType();
        checkCameraAvailability();
    }, []);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);

        const uploadedFiles = files.map(async (file) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            return new Promise((resolve) => {
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 800;
                    const maxHeight = 600;

                    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob((blob) => {
                        // alert(`Original size: ${(file.size / 1024).toFixed(2)} KB`);
                        // alert(`Compressed size: ${(blob.size / 1024).toFixed(2)} KB`);

                        resolve({
                            id: Date.now() + Math.random(),
                            url: URL.createObjectURL(blob),
                            file: new File([blob], file.name, { type: file.type })
                        });
                    }, file.type, 0.7);
                };
            });
        });

        try {
            const compressedFiles = await Promise.all(uploadedFiles);
            setImage((prevImages) => [...prevImages, ...compressedFiles]);

            const response = await uploadPhotos(compressedFiles, treeBatch, mode, uploadName);
            if (response) {
                const imageUrl = response?.data?.data?.[0] || response?.data?.data?.[0];
                console.log('imageUrl: ', imageUrl);
                if (imageUrl) {
                    setImageApiRes(prevImages => [...prevImages, imageUrl]);
                }
            }
        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    };


    const handleButtonClick = () => {
        if (!isCameraAvailable) {
            toast.error("This device does not have a camera!");
        }
    };

    return (
        <div>
            <input
                type="file"
                id="fileInput"
                name="fileInput"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                // disabled={!isMobileDevice || !isCameraAvailable}
            />

            <label
                htmlFor="fileInput"
                style={{
                    minWidth: '110px',
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#dbdbdb",
                    borderRadius: "20px",
                    cursor: isMobileDevice && isCameraAvailable ? "pointer" : "not-allowed",
                    textAlign: "center",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                }}
                // onClick={handleButtonClick}
            >
                {lableName}
            </label>
        </div>
    );
};

export default ImageUploader;
