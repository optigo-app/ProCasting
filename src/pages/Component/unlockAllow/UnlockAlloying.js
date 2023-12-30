import React, { useEffect, useRef, useState } from "react";
import "./UnlockAlloying.css";
import { Dialog, DialogContentText, DialogTitle, Drawer } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";


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

  const handleClose = () => {

    if (openPoupuNumber === 1) {

      setFirstTableData([...firtstTableData, enteredValuesPopup]);
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
        <p style={{ fontSize: '20px', margin: '10px', fontWeight: 500 }}>SCANE JOB</p>
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
          <button onClick={handleClose} style={{ margin: "-20px 0px 20px" }}>
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
              className="investDestilInput"
              value={flashCode}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">BATCH NO:</p>
            <input
              type="text"
              className="investDestilInput"
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
            <input type='text' disabled className='investDestilInput' style={{ outline: 'none', backgroundColor: '#eceded' }}
              value={enteredValues.length === 0 ? "" : "100"}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">DEPARTMENT:</p>
            <input
              type="text"
              value={enteredValues.length === 0 ? "" : "ALLOYING"}
              className="investDestilInput"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
            <button className="burnOutIssueBtn" onClick={handleClickOpen}>
              Unlock and Issue
            </button>
          </div>
        </div>
      </div>
      <div>
        {shotTableBtn && <button onClick={() => setShowTable(true)} style={{ marginInline: '17%', }}>MOVE TO TABLE</button>}
        {showTable && <div style={{ display: 'flex', marginInline: '16%' }}>

          <div className='tableDataMain' onClick={() => handleOpenPopup(1)}>
            <div style={{ display: 'flex' }}>
              <p style={{
                fontSize: '55px',
                color: '#ff5757',
                fontWeight: 700,
                margin: '10px'
              }}>AB</p>
              <p className="UnlockformDataTable">
                {firtstTableData.join(', ')}
              </p>
            </div>
          </div>

          <div className='tableDataMain' onClick={() => handleOpenPopup(2)}>
            <div style={{ display: 'flex' }}>
              <p style={{
                fontSize: '55px',
                color: '#ff5757',
                fontWeight: 700,
                margin: '10px'
              }}>BC</p>
              <p className="UnlockformDataTable">
                {secondTableData.join(', ')}
              </p>
            </div>
          </div>

          <div className='tableDataMain' onClick={() => handleOpenPopup(3)}>
          <div style={{ display: 'flex' }}>
              <p style={{
                fontSize: '55px',
                color: '#ff5757',
                fontWeight: 700,
                margin: '10px'
              }}>CD</p>
              <p className="UnlockformDataTable">
                {thirdTableData.join(', ')}
              </p>
            </div>
          </div>

          <div className='tableDataMain' onClick={() => handleOpenPopup(4)}>
          <div style={{ display: 'flex' }}>
              <p style={{
                fontSize: '55px',
                color: '#ff5757',
                fontWeight: 700,
                margin: '10px'
              }}>DE</p>
              <p className="UnlockformDataTable">
                {fourthTableData.join(', ')}
              </p>
            </div>
          </div>

        </div>}
      </div>
    </div>
  );
}
