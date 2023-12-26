import React, { useEffect, useRef, useState } from "react";
import "./UnlockAlloying.css";
import { Dialog, DialogContentText, DialogTitle, Drawer } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";

export default function UnlockAlloying() {
  const [inputValue, setInputValue] = useState("");
  const [inputValueHidden, setInputValueHidden] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [flashCode, setFlashCode] = useState("");
  const [open, setOpen] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
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
    setEnteredValues([]);
  }, []);

  const handleScan = (data) => {};

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const toggleImageVisibility = () => {
    if (scanRef.current) {
      scanRef.current.focus();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setFlashCode(event.target.value);
  };

  const handleInputChangeHidden = (event) => {
    setInputValueHidden(event.target.value);
    setFlashCode(event.target.value);
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

  return (
    <div>
      <BarcodeScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"UNLOCK SUCCESSFULLY"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose} style={{ margin: "-20px 0px 20px" }}>
            DONE
          </Button>
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
      <div style={{ display: "flex" }}>
        <div className="UnlockTopBox1">
          <div
            onClick={toggleImageVisibility}
            style={{ width: "fit-content", position: "relative",marginLeft:!isImageVisible && "46px" }}
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
              <p style={{ fontWeight: "bold", marginLeft: "-40px",marginTop:'-10px'}}>
                {" "}
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
              </p>
            )}
            <input
              type="text"
              value={inputValueHidden}
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

        <div style={{ marginTop: "10px" }}>
          <div style={{ display: "flex", marginTop: "15px" }}>
            <p className="investDestilInputTitle">Flash Code:</p>
            <input
              type="text"
              className="investDestilInput"
              value={flashCode}
            />
          </div>
          <div style={{ display: "flex", marginTop: "15px" }}>
            <p className="investDestilInputTitle">Batch No:</p>
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
          {/* <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Employee:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Issue wight:</p>
                        <input type='text' className='investDestilInput' />
                    </div> */}
          <div style={{ display: "flex", marginTop: "15px" }}>
            <p className="investDestilInputTitle">Department:</p>
            <input
              type="text"
              value={enteredValues.length === 0 ? "" : "ALLOYING"}
              className="investDestilInput"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="burnOutIssueBtn" onClick={handleClickOpen}>
              Unlock and Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
