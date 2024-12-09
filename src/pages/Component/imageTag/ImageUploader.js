import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { CurrentImageState } from "../../recoil/Recoil";
import browserImageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import { uploadPhotos } from "../../../Utils/API/UploadPhotoApi";

const ImageUploader = ({ treeBatch, lableName, }) => {
    const setImage = useSetRecoilState(CurrentImageState);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const uploadedFiles = files.map((file) => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(file),
            file: file,
        }));

        setImage((prevImages) => [...prevImages, ...uploadedFiles]);
    };


    return (
        <div>
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />

            <label
                htmlFor="fileInput"
                style={{
                    minWidth: '110px',
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#dbdbdb",
                    borderRadius: "20px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                }}
            >
                {lableName}
            </label>
        </div>
    );
};

export default ImageUploader;
