import React, { useCallback, useEffect, useRef, useState } from "react";
import "./UnlockAlloying.css";
import { Dialog, DialogContentText, DialogTitle, Drawer } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Countdown from "react-countdown";
import { toast } from "react-toastify";


export default function UnlockAlloying() {
  const [inputValue, setInputValue] = useState("");
  const [inputValueHidden, setInputValueHidden] = useState("");
  const [inputValueHiddenPopup, setInputValueHiddenPopup] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [enteredValuesPopup, setEnteredValuesPopup] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [flashCode, setFlashCode] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isImageVisiblePopup, setIsImageVisiblePopup] = useState(true);
  const [shotTableBtn, setShowTableBtn] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [showTimmer, setShowTimmer] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openPoupuNumber, setOpenPopupNumber] = useState(undefined);
  const [firtstTableData, setFirstTableData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [thirdTableData, setThirdTableData] = useState([]);
  const [fourthTableData, setFourthTableData] = useState([]);

  const scanRef = useRef(null);


  useEffect(() => {
    if (scanRef.current) {
      scanRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (inputValueHidden.length) {
        setEnteredValues([...enteredValues, inputValueHidden]);
      }
    }, 500);
  }, [inputValueHidden]);


  setTimeout(() => {
    if (inputValueHidden.length) {
      setInputValueHidden("");
    }
  }, 510);

  useEffect(() => {
    console.log('inout', inputValueHiddenPopup);
    setTimeout(() => {
      if (inputValueHiddenPopup.length) {
        setEnteredValuesPopup([...enteredValuesPopup, inputValueHiddenPopup]);
      }
    }, 500);
  }, [inputValueHiddenPopup]);


  setTimeout(() => {
    if (inputValueHiddenPopup.length) {
      setInputValueHiddenPopup("");
    }
  }, 510);

  useEffect(() => {
    setEnteredValues([]);
    setEnteredValuesPopup([]);
  }, []);



  const handleScan = (data) => { };

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const toggleImageVisibility = () => {
    if (scanRef.current) {
      scanRef.current.focus();
    }
  };

  const handleClickOpen = () => {

    if (flashCode === '' || flashCode === undefined) {
      alert('SCANE JOB FIRST')
    } else {
      // setOpen(true);
      setShowTableBtn(true)
    }

  };

  const handleOpenPopup = (val) => {
    setOpen(true);
    setOpenPopupNumber(val)

  }
  const generateFormattedString = (data) => {
    // return `(${data.map(value => `(${value})`).join(', ')})`;
  };



  const handleAddData = () => {

    if (openPoupuNumber === 1 && enteredValuesPopup.length !== 0) {

      setFirstTableData([...firtstTableData, enteredValuesPopup]);
      // handelclick();
      // let updateTable = firtstTableData.map((data , index) => {
      //   if(!data.timer && openPoupuNumber === index){
      //     data.timer = <Countdown date={Date.now() + 30000} renderer={renderer} />
      //   }
      //   return data;
      // })
      // setFirstTableData(updateTable);
      setShowTimmer(true);

    } else if (openPoupuNumber === 2) {
      setSecondTableData([...secondTableData, enteredValuesPopup]);
    } else if (openPoupuNumber === 3) {
      setThirdTableData([...thirdTableData, enteredValuesPopup]);
    } else if (openPoupuNumber === 4) {
      setFourthTableData([...fourthTableData, enteredValuesPopup]);
    }
    setOpen(false);
    setEnteredValuesPopup([])
  };
  console.log('fistTsbl....',firtstTableData);

  const handleClose = () => {
    setOpen(false);
    setEnteredValuesPopup([])
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setFlashCode(event.target.value);
  };

  const handleInputChangeHidden = (event) => {
    setInputValueHidden(event.target.value);
    setFlashCode(event.target.value);
  };

  const handleInputChangeHiddenPopup = (event) => {
    setInputValueHiddenPopup(event.target.value);
  };

  const handleGoButtonClick = () => {
    if (inputValue === "" || inputValue === undefined) {
      setInputError(true);
    } else {
      setInputError(false);
      setEnteredValues([...enteredValues, inputValue]);
      setInputValue("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClick();
    }
  };

  const handleConfirmation = () => {
    setFirstTableData(firtstTableData.filter((_, index) => index !== selectedIndex));
    setOpenDelete(false);
  };

  const handleRemoveItem = (indexToRemove) => {
    setOpenDelete(true);
    setSelectedIndex(indexToRemove);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


  const renderer = useCallback(({ minutes, seconds, completed }) => {
    if (completed && showTimmer) {
      return <Completionist />;
    } else {
      return (
        <span style={{ textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>{seconds}</span>
          {/* GLOSS OFF TIMER : <span style={{ fontWeight: 'bold' }}>{minutes}:{seconds}</span> */}
        </span>
      );
    }
  }, [showTimmer]);

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

  return (
    <div>
      <BarcodeScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment"
      />

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ margin: '20px', paddingInline: '100px' }}>
          {"ARE YOU SURE TO DELETE ?"}
        </DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button onClick={handleConfirmation}>YES</Button>
          <Button onClick={handleClickOpenDelete}>NO</Button>
        </div>
      </Dialog>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p style={{ fontSize: '20px', margin: '10px', fontWeight: 500 }}>SCANE FLASK</p>
        <DialogTitle style={{ display: 'flex', height: '400px', width: '500px' }}>
          <div
            onClick={toggleImageVisibility}
            style={{ width: "fit-content", position: "relative", marginLeft: !isImageVisiblePopup && "46px" }}
          >
            {isImageVisiblePopup ? (
              <div>
                <img src={scaneCodeImage} className="createImageQrCode" />
              </div>
            ) : (
              <div>
                <img src={idle} />
              </div>
            )}
            {!isImageVisiblePopup && (
              <p style={{ fontSize: '15px', fontWeight: "bold", marginLeft: "-40px", marginTop: '-10px' }}>
                {" "}
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
              </p>
            )}
            <input
              type="text"
              value={inputValueHiddenPopup}
              onChange={handleInputChangeHiddenPopup}
              style={{
                width: "20px",
                position: "absolute",
                left: "50px",
                top: "70px",
                zIndex: -1,
              }}
              ref={scanRef}
              onBlur={() => {
                setIsImageVisiblePopup(false);
              }}
              onFocus={() => setIsImageVisiblePopup(true)}
              autoFocus
            />
            <button style={{
              position: "absolute",
              left: "50px",
              top: "70px",
              zIndex: -1,
            }}>c</button>
          </div>
          <div style={{ width: '250px', height: '350px', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {enteredValuesPopup?.map((value, index) => (
              <div className="allScanInvestdataMain">
                <p className="allInvestScanData" key={index}>
                  {value}
                </p>
                <RemoveCircleRoundedIcon
                  style={{
                    color: "#FF0000",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            ))}
          </div>
        </DialogTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleAddData} style={{ margin: "-20px 0px 20px" }}>
            ADD TO TABLE
          </button>
        </div>
      </Dialog>
      <div className="TopBtnDivMainOne">
        <p
          style={{
            margin: "0px",
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: 500,
          }}
        >
          ALLOYING UNLOCK PROCESS
        </p>
      </div>

      {/* <button onClick={handelclick}>{realTime ? "pause" : "start"}</button> */}
      {/* {com ? <div>{Completionist()}</div> : <div>{time}</div>} */}

      <div className="UnlockContainer">
        <div className="UnlockTopBox1">
          <div
            onClick={toggleImageVisibility}
            style={{ width: "fit-content", position: "relative", marginLeft: !isImageVisible && "46px" }}
          >
            {isImageVisible ? (
              <div>
                <img src={scaneCodeImage} className="createImageQrCode" />
              </div>
            ) : (
              <div>
                <img src={idle} />
              </div>
            )}
            {!isImageVisible && (
              <p style={{ fontWeight: "bold", marginLeft: "-40px", marginTop: '-10px' }}>
                {" "}
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
              </p>
            )}
            <input
              type="text"
              value={inputValueHiddenPopup}
              onChange={handleInputChangeHidden}
              style={{
                width: "20px",
                position: "absolute",
                left: "50px",
                top: "70px",
                zIndex: -1,
              }}
              ref={scanRef}
              onBlur={() => {
                setIsImageVisible(false);
              }}
              onFocus={() => setIsImageVisible(true)}
              autoFocus
            />
            <button style={{
              position: "absolute",
              left: "50px",
              top: "70px",
              zIndex: -1,
            }}>c</button>
          </div>
          <div style={{ display: "flex", marginTop: "5px" }}>
            <input
              type="text"
              style={{ border: inputError && "1px solid red" }}
              className="enterBrachItemBox"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            <button
              style={{
                height: "98%",
                width: "55px",
                marginLeft: "5px",
                fontSize: "20px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={handleGoButtonClick}
            >
              Go
            </button>
          </div>
        </div>

        <div className="UnlockTopBox2">
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">FLASH CODE:</p>
            <input
              type="text"
              className="unlovcDestilInput"
              value={flashCode}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">BATCH NO:</p>
            <input
              type="text"
              className="unlovcDestilInput"
              value={
                enteredValues.length === 0
                  ? ""
                  : enteredValues.length === 1
                    ? "AB"
                    : enteredValues.length === 2
                      ? "BC"
                      : "CD"
              }
            />
          </div>
          <div className="investDestilInputDiv">
            <p className='investDestilInputTitle'>WEIGHT:</p>
            <input type='text' disabled className='unlovcDestilInput' style={{ outline: 'none', backgroundColor: '#eceded' }}
              value={enteredValues.length === 0 ? "" : "100"}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">DEPARTMENT:</p>
            <input
              type="text"
              value={enteredValues.length === 0 ? "" : "ALLOYING"}
              className="unlovcDestilInput"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
            <button className="burnOutIssueBtn" onClick={handleClickOpen}>
              Unlock and Issue
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '-30px' }}>
        {shotTableBtn && <button onClick={() => setShowTable(true)} style={{ marginInline: '18%', height: '45px', marginTop: '-50px', width: '200px', }}>MOVE TO TABLE</button>}
        {showTable &&
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>

            {firtstTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(1)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="unlockTableTitle">TABLE 1</p>
                {firtstTableData?.length !== 0 &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <p className="unlockTableTitleNum" >{time}</p> */}
                    <p className="unlockTableTitleText">Minutes Remaining</p>
                  </div>
                }
              </div>
              <p className="UnlockformDataTable">
                {firtstTableData?.length !== 0 && firtstTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {firtstTableData.map((data, index) =>
                  <div className='tableDataMain' onClick={() => handleOpenPopup(1)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p className="unlockTableTitle">TABLE 1</p>
                      {firtstTableData?.length !== 0 &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/* <p className="unlockTableTitleNum">{time}</p> */}
                          <Countdown date={Date.now() + 30000} renderer={renderer} />

                          <p className="unlockTableTitleText">Minutes Remaining</p>
                        </div>
                      }
                    </div>
                    <p className="UnlockformDataTable">
                      {firtstTableData?.length !== 0 && data.join(', ')}
                    </p>
                  </div>)}
              </div>
            }

            {secondTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(2)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="unlockTableTitle">TABLE 2</p>
                {secondTableData?.length !== 0 &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="unlockTableTitleNum" >10</p>
                    <p className="unlockTableTitleText">Minutes Remaining</p>
                  </div>
                }
              </div>
              <p className="UnlockformDataTable">
                {secondTableData?.length !== 0 && secondTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {secondTableData.map((data, index) =>
                  <div className='tableDataMain' onClick={() => handleOpenPopup(2)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p className="unlockTableTitle">TABLE 2</p>
                      {secondTableData?.length !== 0 &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p className="unlockTableTitleNum" >10</p>
                          <p className="unlockTableTitleText">Minutes Remaining</p>
                        </div>
                      }
                    </div>
                    <p className="UnlockformDataTable">
                      {secondTableData?.length !== 0 && data.join(', ')}
                    </p>
                  </div>)}
              </div>
            }

            {thirdTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(3)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="unlockTableTitle">TABLE 3</p>
                {thirdTableData?.length !== 0 &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="unlockTableTitleNum" >10</p>
                    <p className="unlockTableTitleText">Minutes Remaining</p>
                  </div>
                }
              </div>
              <p className="UnlockformDataTable">
                {thirdTableData?.length !== 0 && thirdTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {thirdTableData.map((data, index) =>
                  <div className='tableDataMain' onClick={() => handleOpenPopup(3)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p className="unlockTableTitle">TABLE 3</p>
                      {thirdTableData?.length !== 0 &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p className="unlockTableTitleNum">10</p>
                          <p className="unlockTableTitleText">Minutes Remaining</p>
                        </div>
                      }
                    </div>
                    <p className="UnlockformDataTable">
                      {thirdTableData?.length !== 0 && data.join(', ')}
                    </p>
                  </div>)}
              </div>
            }


            {fourthTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(4)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="unlockTableTitle">TABLE 4</p>
                {fourthTableData?.length !== 0 &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="unlockTableTitleNum" >10</p>
                    <p className="unlockTableTitleText">Minutes Remaining</p>
                  </div>
                }
              </div>
              <p className="UnlockformDataTable">
                {fourthTableData?.length !== 0 && fourthTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {fourthTableData.map((data, index) =>
                  <div className='tableDataMain' onClick={() => handleOpenPopup(4)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p className="unlockTableTitle">TABLE 4</p>
                      {fourthTableData?.length !== 0 &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p className="unlockTableTitleNum">10</p>
                          <p className="unlockTableTitleText">Minutes Remaining</p>
                        </div>
                      }
                    </div>
                    <p className="UnlockformDataTable">
                      {fourthTableData?.length !== 0 && data.join(', ')}
                    </p>
                  </div>)}
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}
