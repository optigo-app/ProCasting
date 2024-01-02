import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./InvestMentFirst.css";
import { Button, Dialog, DialogTitle, Drawer } from "@mui/material";
import greenImges from "../../assets/green.png";
import blueImges from "../../assets/blue.png";
import orangeImges from "../../assets/orange.png";
import { IoMdClose } from "react-icons/io";
import Countdown from "react-countdown";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadcloud from '../../assets/uploadCloud.png'
import { useRecoilValue } from "recoil";
import { CurrentImageState } from "../../recoil/Recoil";
import ImageWebCam from "../imageTag/ImageWebCam";
import topLogo from '../../assets/oraillogo.png'
import { useNavigate } from "react-router-dom";

export default function InvestMentFirst() {

  const [inputValue, setInputValue] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeOut, setTiemOut] = useState(undefined);
  const [inputError, setInputError] = useState(false);
  const [openYourBagDrawer, setOpenYourBagDrawer] = useState(false);
  const [greenImg, setGreeImg] = useState(false);
  const [blueImg, setBlueImg] = useState(false);
  const [orangeImg, setOrangImg] = useState(false);
  const [defaultImg, setDefaultImg] = useState(false);
  const CurrentImageValue = useRecoilValue(CurrentImageState);
  const [weight, setWeight] = useState(false);
  const [TDS, setTDS] = useState(undefined);
  const [phValue, setPhValue] = useState(undefined);
  const [showTimmerBtn, setShowTimmerBtn] = useState(false);
  const [showTimmer, setShowTimmer] = useState(false);
  const [scanInp, setScanInp] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [enteredTime, setEnteredTime] = useState("");
  const [eviIndex, setEviIndex] = useState([]);
  const [weightInp, setWeightInp] = useState("");
  const [saveData, setSaveData] = useState(false);
  const [goBtnFlag, setGoBtnFlag] = useState(false)
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isImgUpload, setIsImgUpload] = useState(false)
  const [isImgShow, setIsImgShow] = useState(false)
  const [fileBase64, setFileBase64] = useState('')

  const invProRef = useRef(null)
  const fileInputRef = useRef(null);
  const naviagtion = useNavigate();
  
  console.log("enteredValues", enteredValues)
  console.log("enteredValueseviIndex", eviIndex)

  useEffect(() => {
    if (greenImg) {
      setWeightInp("3000");
    }
    if (blueImg) {
      setWeightInp("3000");
    }
    if (orangeImg) {
      setWeightInp("3000");
    }
  }, [greenImg, blueImg, orangeImg, weight, defaultImg]);

  useEffect(() => {
    if (!enteredValues[0]?.length) {
      setGreeImg(false);
      setBlueImg(false);
      setOrangImg(false);
    }
  }, [enteredValues])

  useEffect(() => {
    if (enteredValues[0]?.label === "F1") {
      setGreeImg(true);
    } else if (enteredValues[0]?.label === "F2") {
      setGreeImg(true);
    } else if (enteredValues[0]?.label === "F3") {
      setGreeImg(true);
    } else if (enteredValues[0]?.label === "F4") {
      setBlueImg(true);
    } else if (enteredValues[0]?.label === "F5") {
      setBlueImg(true);
    } else if (enteredValues[0]?.label === "F6") {
      setBlueImg(true);
    } else if (enteredValues[0]?.label === "F7") {
      setOrangImg(true);
    } else if (enteredValues[0]?.label === "F8") {
      setOrangImg(true);
    } else if (enteredValues[0]?.label === "F9") {
      setOrangImg(true);
    } else {
      setDefaultImg(true);
    }
  }, [enteredValues]);

  useEffect(() => {
    if (scanInp?.length) {
      setTimeout(() => {
        if (!openYourBagDrawer && isImageVisible) {
          setEnteredValues([...enteredValues, { label: scanInp }]);
        }
      }, 500);
    }
  }, [scanInp]);

  setTimeout(() => {
    if (scanInp?.length > 0) {
      setScanInp("");
    }
  }, 510);

  useEffect(() => {
    enteredValues.length > 0 && setWeightInp("2000");
  }, []);

  const handleScan = (data) => { };

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const toggleImageVisibility = () => {
    if (invProRef.current) {
      invProRef.current.focus();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGoButtonClick = () => {
    if (inputValue === "" || inputValue === undefined) {
      setInputError(true);
    } else {
      setInputError(false);
      setEnteredValues([...enteredValues, { label: inputValue }]);
      setInputValue("");
    }
  };

  const handleInputChangen = (e) => {
    setEnteredTime(e.target.value);
  };

  const handleDelayedFunction = () => {
    setTiemOut(true);
  };

  const handleDoneClick = () => {
    setTiemOut(false);
    let totalTi = enteredTime * 60000;
    setTimeout(handleDelayedFunction, totalTi);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClick();
    }
  };

  const notify = () => toast.success("SAVED SUCCESSFULLY");

  const saveDataHandle = () => {
    if (TDS === undefined || TDS === "") {
      alert("Enetr TDS");

    } else if (phValue === undefined || phValue === "") {
      alert("Enetr phValue");
      return
    } else {
      setSaveData(true);
      notify();
      const updateData = enteredValues?.map((ev, i) => {
        if (!ev["ImgBtn"]) {
          ev["ImgBtn"] = (
            <button
              onClick={() => {
                setIsImgUpload(true)
                setEviIndex(i)
              }}>
              Upload Image
            </button>
          );
        }
        return ev;
      });
      setEnteredValues(updateData);
      setShowTimmerBtn(true)
      setTDS("");
      setPhValue("");
    }
  };

  let TimeNotify = () => toast.error(`Time is Over!!!!`, { theme: "colored" });

  const Completionist = useCallback(() => {

    TimeNotify();

    const d = new Date();

    let hour =
      d.getHours().toString().length === 1 ? `0${d.getHours()}` : d.getHours();

    let min =
      d.getMinutes().toString().length === 1
        ? `0${d.getMinutes()}`
        : d.getMinutes();

    let sec =
      d.getSeconds().toString().length === 1
        ? `0${d.getSeconds()}`
        : d.getSeconds();

    return <div style={{ textTransform: 'uppercase' }}> Gloss of completion time : <span style={{ fontWeight: 'bold' }}>{hour}:{min}:{sec}</span></div>;

  }, []);

  const renderer = useCallback(({ minutes, seconds, completed }) => {
    if (completed && showTimmer) {
      return <Completionist />;
    } else {
      return (
        <span style={{ textAlign: 'center' }}>
          GLOSS OFF TIMER : <span style={{ fontWeight: 'bold' }}>{minutes}:{seconds}</span>
        </span>
      );
    }
  }, [showTimmer]);



  const handleStartTime = () => {
    setShowTimmer(true);
    // setEviIndex((pre) => [...pre, evi]);

    // const updatedData = enteredValues.map((d, index) => {
    //   if (!d.timer && evi === index) {
    //     d.timer = <Countdown date={Date.now() + 30000} renderer={renderer} />;
    //   }
    //   return d;
    // });
    // setEnteredValues(updatedData);
  };

  const handleRemoveItem = (indexToRemove) => {
    setOpenDelete(true);
    setSelectedIndex(indexToRemove);
  };

  const handelScanInp = (target) => {
    setScanInp(target)
  }

  const handleConfirmation = () => {
    setEnteredValues(enteredValues.filter((_, index) => index !== selectedIndex));
    setOpenDelete(false);
    if (enteredValues.length === 1) {
      window.location.reload();
    }
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0]; 

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //       const updatedData = enteredValues.map((d, index) => {
  //         if (eviIndex === index) {
  //           d.ImgUrl = base64String
  //         }
  //         return d;
  //       });
  //       setEnteredValues(updatedData);
  //       setFileBase64(base64String)
  //       // console.log('Base64 representation:', base64String);
  //     };
  //     reader.readAsDataURL(file);
  //   }

  // };

  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  useEffect(() => {
    if (CurrentImageValue.length > 0) {
      const updatedData = enteredValues.map((d, index) => {
        if (eviIndex === index) {
          d.ImgUrl = CurrentImageValue
        }
        return d;
      });
      setEnteredValues(updatedData);

      setIsImgUpload(false)
    }
  }, [CurrentImageValue])

  return (
    <div>
      <BarcodeScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment"
      />
      <ToastContainer />

      <Dialog fullWidth open={isImgUpload} onClose={() => setIsImgUpload(false)}>
        <ImageWebCam />
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <p style={{ fontSize: "25px", margin: "20px", fontWeight: 500 }}>
            Enter The Time..
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="number"
              placeholder="Enetr Time.."
              style={{
                height: "50px",
                width: "250px",
                marginInline: "30px",
              }}
              value={enteredTime}
              onChange={handleInputChangen}
              className="investinput"
            />
            <button
              style={{
                height: "50px",
                margin: "30px 20px",
              }}
              onClick={() => {
                handleDoneClick();
                handleClose();
              }}
            >
              Done
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ margin: "20px", paddingInline: "100px" }}
        >
          {"ARE YOU SURE TO DELETE ?"}
        </DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button onClick={handleConfirmation}>YES</Button>
          <Button onClick={handleClickOpenDelete}>NO</Button>
        </div>
      </Dialog>

      {/* <Dialog 
        className="uploadImage" 
        open={isImgUpload} 
        onClose={() =>{
          setIsImgUpload(false)
          setTimeout(()=>{
            setFileBase64('')
          },150)
        }}
        >
        <div
          style={{
            width: "360px",
            height: "390px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img src={!fileBase64.length ? uploadcloud : fileBase64 } style={{ width: "100%",height:'100%',objectFit: "contain" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e)}
            />
            <label htmlFor="fileInput">
              <button onClick={handleButtonClick}>Upload</button>
            </label>
          </div>
        </div>
      </Dialog> */}

      <Dialog
        className="showImage"
        open={isImgShow}
        onClose={() => setIsImgShow(false)}
      >
        <div
          style={{
            width: "auto",
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img
            // src={enteredValues[eviIndex]?.ImgUrl}
            src={fileBase64}
            style={{ width: "100%", objectFit: "cover" }}
          />
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e)}
            />
            <label htmlFor="fileInput">
              <button onClick={handleButtonClick}>Change Image</button>
            </label>
          </div> */}
        </div>
      </Dialog>

      <div>
        <div className="TopBtnDivMainOneV2">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='headerV2Title' > INVESTMENT PROCESS</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => naviagtion('/')}>
            <img src={topLogo} style={{ width: '75px', }} />
            <p style={{ fontSize: '25px', opacity: '0.6', margin: '0px 10px', fontWeight: 700, color: '#000435' }}>ProCasting</p>
            {/* <p className='infoTextInputONe'>E0025(BOB THOMAS)</p> */}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "0px",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              width: "65%",
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                // width: "80%",
                gap: "80px",
                // justifyContent: "space-around",
              }}
            >
              <div className="investTopBox1">
                <div
                  onClick={toggleImageVisibility}
                  style={{
                    width: "fit-content",
                    marginLeft: !isImageVisible && "45px",
                    position: "relative",
                  }}
                >
                  {isImageVisible ? (
                    <div>
                      <img
                        src={scaneCodeImage}
                        className="createImageQrCode"
                      />
                    </div>
                  ) : (
                    <div>
                      <img src={idle} />
                    </div>
                  )}
                  {!isImageVisible && (
                    <p
                      style={{
                        fontWeight: "bold",
                        marginLeft: "-40px",
                        marginTop: "-10px",
                      }}
                    >
                      {" "}
                      <span style={{ color: "red" }}>Click</span> On The Image
                      For Scan<span style={{ color: "red" }}>*</span>
                    </p>
                  )}
                  <input
                    style={{
                      width: "12px",
                      position: "absolute",
                      left: "50px",
                      top: "70px",
                      zIndex: -1,
                    }}
                    ref={invProRef}
                    onBlur={() => {
                      setIsImageVisible(false);
                    }}
                    onFocus={() => setIsImageVisible(true)}
                    value={scanInp}
                    onChange={(e) => handelScanInp(e.target.value)}
                    autoFocus
                  />
                  <button
                    style={{
                      position: "absolute",
                      left: "50px",
                      top: "70px",
                      zIndex: -1,
                    }}
                  >
                    c
                  </button>
                </div>
                <div style={{ display: "flex", marginTop: "5px" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    style={{ border: inputError && "1px solid red" }}
                    className="enterBrachItemBox"
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={showTimmerBtn}
                  />
                  <button
                    style={{
                      height: "47px",
                      width: "50px",
                      fontSize: "20px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={handleGoButtonClick}
                    disabled={showTimmerBtn}
                  >
                    Go
                  </button>
                </div>

                <button
                  style={{
                    marginTop: "20px",
                    cursor: "pointer",
                    height: "35px",
                    width: "100px",
                  }}
                  className="homeNoteTitleV2"
                  onClick={handleRefresh}
                >
                  Clear All
                </button>
              </div>
              <div className="investTopBox22">
                <div
                  style={{
                    // minWidth: "134px",
                    // width:'auto',
                    overflow: "auto",
                    height: "250px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  {enteredValues?.map((value, index) => (
                    <div className="allScanInvestdataMain">
                      <p className="allInvestScanData" key={index}>
                        {value?.label}
                      </p>
                      {!saveData && (
                        <RemoveCircleRoundedIcon
                          style={{
                            color: "#FF0000",
                            cursor: "pointer",
                            fontSize: "30px",
                          }}
                          onClick={() => handleRemoveItem(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="investTopBox3">
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">Weight:</p>
                  <input
                    type="number"
                    // value={
                    //   (greenImg && "3000") ||
                    //   (blueImg && "3000") ||
                    //   (orangeImg && "3000") ||
                    //   (weight && "") ||
                    //   (defaultImg && "")
                    // }
                    value={weightInp}
                    onChange={(e) => setWeightInp(e.target.value)}
                    className="investDestilInput1"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">TDS:</p>
                  <input
                    type="number"
                    className="investDestilInput1"
                    value={TDS}
                    onChange={(e) => setTDS(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">PHvalue:</p>
                  <input
                    type="number"
                    className="investDestilInput1"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "15px",
                  }}
                >
                  <button
                    // className="investAddGlassBtn"
                    onClick={saveDataHandle}
                  className="homeNoteTitleV2"

                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              {showTimmerBtn && (
                <div className="invest_btn_div">
                  {!showTimmer ? (
                    <button
                      className="invest_btn"
                      onClick={() => handleStartTime()}
                    >
                      Start Time
                    </button>
                  ) : (
                    <div
                      style={{
                        color: "#800000",
                        fontSize: "24px",
                        backgroundColor: "#efefef",
                        width: "100%",
                        padding: "6px",
                      }}
                    >
                      <Countdown
                        date={Date.now() + 30000}
                        renderer={renderer}
                      />
                    </div>
                  )}
                </div>
              )}
              <div
                style={{ display: "flex", marginTop: "5px", flexWrap: "wrap" }}
              >
                {enteredValues?.map((value, index) => (
                  <table
                    key={index}
                    style={{
                      backgroundColor:
                        (greenImg && "#b1d8b7") ||
                        (blueImg && "#a396c8") ||
                        (orangeImg && "orange") ||
                        (defaultImg && "#add8e6"),
                      margin: "5px",
                    }}
                  >
                    <tr>
                      <th className="not">{value?.label}</th>
                    </tr>
                    <tr>
                      <th className="investTableRow">
                        Batch No:{index === 0 && "AB"}
                        {index === 1 && "BC"}
                        {index === 2 && "CD"}{" "}
                      </th>
                    </tr>
                    <tr>
                      <th className="investTableRow">78 Jobs </th>
                    </tr>
                    <tr>
                      <th className="investTableRow">150 Grams </th>
                    </tr>
                    <tr>
                      <th
                        className={`investTableRow ${!showTimmerBtn && "sett"}`}
                      >
                        {(greenImg && "Wax Setting") ||
                          (blueImg && "Regular") ||
                          (orangeImg && "RPT")}
                      </th>
                    </tr>

                    {!value?.ImgUrl && (
                      // {!CurrentImageValue && (
                      <tr>
                        <th className="btncom">{value?.ImgBtn}</th>
                      </tr>
                    )}
                    {value?.ImgUrl && (
                      <tr>
                        <th className="btncom">
                          <button
                            onClick={() => {
                              setIsImgShow(true);
                              setEviIndex(index);
                              setFileBase64(value?.ImgUrl)
                            }}
                          >
                            Show Image
                          </button>
                        </th>
                      </tr>
                    )}

                    {/* <tr>
                    <th style={{ color: "red" }}>{value?.timer}</th>
                  </tr> */}
                  </table>
                ))}
              </div>
            </div>
          </div>

          <div className="investSideFixedImg">
            <img
              src={
                (greenImg && greenImges) ||
                (blueImg && blueImges) ||
                (orangeImg && orangeImges)
              }
              className="DrawerImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
