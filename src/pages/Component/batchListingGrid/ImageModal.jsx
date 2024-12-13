import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import fallbackImage from "../../assets/castingtree.jpg";

const ImageDialog = ({ open, onClose, images }) => {
    const imageUrls = [
        ...(images?.Image && images.Image.trim() ? images.Image.split(",") : []),
        ...(images?.investmentphoto && images.investmentphoto.trim() ? images.investmentphoto.split(",") : []),
    ];


    const handleImageError = (event) => {
        event.target.src = fallbackImage;
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            PaperProps={{
                sx: {
                    width: "800px",
                    height: "600px",
                    backgroundColor: "#000",
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: "8px",
                },
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "#000",
                    zIndex: 10,
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent
                sx={{
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                }}
            >
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Pagination, Navigation]}
                    loop={false}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {imageUrls?.map((url, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <img
                                src={url}
                                alt={`image-${index}`}
                                onError={handleImageError}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </DialogContent>
        </Dialog>
    );
};

export default ImageDialog;
