import React, { useEffect, useState, useRef } from "react";
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
  const invProRef = useRef(null);


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

  useEffect(()=>{
    if(!enteredValues[0]?.length){
      setGreeImg(false);
      setBlueImg(false);
      setOrangImg(false);
    }
  },[enteredValues])

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

  const handleScan = (data) => {};

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
      // const updateData = enteredValues?.map((ev, i) => {
      //   if (!ev["btncom"]) {
      //     ev["btncom"] = (
      //       <button onClick={() => handleStartTime(i, ev)}>Start Time</button>
      //     );
      //   }
      //   return ev;
      // });
      // setEnteredValues(updateData);
      setShowTimmerBtn(true)
      setTDS("");
      setPhValue("");
    }
  };

  const Completionist = () => {

    toast.error(`Time is Over!!!!`, { theme: "colored" });

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

    return <div>{`Gloss of completion time : ${hour}:${min}:${sec}`}</div>;

  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed && showTimmer) {
      return <Completionist />;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  

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
    setEnteredValues(
      enteredValues.filter((_, index) => index !== indexToRemove)
    );
  };

  const handelScanInp = (target) => {
    setScanInp(target);
  };

  return (
    <div>
      <BarcodeScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment"
      />
      <ToastContainer />
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
      <div>
        <div className="TopBtnDivMainOne">
          <p
            style={{
              margin: "0px",
              marginLeft: "10px",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            INVESTMENT PROCESS
          </p>
        </div>
        <div style={{ display: "flex", marginTop: "0px",justifyContent:'space-around' }}>
          <div
            style={{ 
              width: "70%", 
              display: "flex", 
              flexDirection: "column", 
              marginLeft:'10px'
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                gap:'50px',
                justifyContent: "space-around",
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
                        style={{ marginRight: "25px" }}
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
                    type="text"
                    // value={
                    //   (greenImg && "3000") ||
                    //   (blueImg && "3000") ||
                    //   (orangeImg && "3000") ||
                    //   (weight && "") ||
                    //   (defaultImg && "")
                    // }
                    value={weightInp}
                    onChange={(e) => setWeightInp(e.target.value)}
                    className="investDestilInput"
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
                    type="text"
                    className="investDestilInput"
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
                    type="text"
                    className="investDestilInput"
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
                    className="investAddGlassBtn"
                    onClick={saveDataHandle}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{ display: "flex", marginTop: "15px", flexWrap: "wrap",flexDirection:'column'}}
            >
              {showTimmerBtn && <div className="invest_btn_div">
                {!showTimmer
                ? 
                <button className="invest_btn" onClick={()=>handleStartTime()}>
                 Start Time 
                </button>
                : 
                <div style={{color:'red',fontSize:'24px',fontWeight:'bold',backgroundColor:'#060600',width:'100%',textAlign:'center'}}>
                  <Countdown date={Date.now() + 30000} renderer={renderer} />
                </div>
                }
              </div>}
              <div style={{ display: "flex", marginTop: "15px", flexWrap: "wrap"}}>
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
                    <th className="investTableRow">
                      {(greenImg && "Wax Setting") ||
                        (blueImg && "Regular") ||
                        (orangeImg && "RPT")}
                    </th>
                  </tr>
                  <tr>
                    <th className="not">{value?.label}</th>
                  </tr>
                  {/* <tr>
                    <th
                      className="btncom"
                      style={{
                        display: eviIndex?.includes(index) ? "none" : "block",
                      }}
                    >
                      {value?.btncom}
                    </th>
                  </tr>
                  <tr>
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
