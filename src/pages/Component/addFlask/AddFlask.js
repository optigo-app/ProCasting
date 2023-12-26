import React, { useEffect, useRef, useState } from "react";
import "./AddFlask.css";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";

export default function AddFlask() {
  const [inputValue, setInputValue] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [inputErrorMax, setInputErrorMax] = useState(false);
  const [scanInp, setScanInp] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(true);
  const invProRef = useRef(null);

  useEffect(() => {
    invProRef.current.focus();
  }, [invProRef]);

  useEffect(() => {
    setTimeout(() => {
      if (scanInp.length) {
        setEnteredValues([...enteredValues, scanInp]);
      }
    }, 500);
  }, [scanInp]);

  setTimeout(() => {
    if (scanInp?.length > 0) {
      setScanInp('')
    }
  }, 510);


  const handleScan = (data) => { };

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const toggleImageVisibility = () => {
    if (invProRef.current) {
      invProRef.current.focus();
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGoButtonClick = () => {
    if (enteredValues.length < 2) {
      if (inputValue === "" || inputValue === undefined) {
        setInputError(true);
      } else {
        // alert(enteredValues[0])
        setInputError(false);
        setEnteredValues([...enteredValues, inputValue]);
        setInputValue("");
      }
    } else {
      setInputErrorMax(true);
    }
  };

  const saveData = () => {
    setEnteredValues([])
    setInputErrorMax(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClick();
    }
  };

  const handelScanInp = (target) => {
    setScanInp(target)
  }

  return (
    <div>
      <BarcodeScanner onScan={handleScan} onError={handleError} />
      <p className="mainTitle">PROCASTING-TREE BIND WITH FLASK</p>
      <div className="addFLaskMain">
        <div className="addFlaskQRMAin">
          <div
            onClick={toggleImageVisibility}
            style={{
              width: "fit-content",
              marginLeft: "30px",
              position: "relative",
            }}
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
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "-40px",
                  marginTop: "-10px",
                }}
              >
                {" "}
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
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
              onFocus={() => {
                setIsImageVisible(true);
                invProRef.current?.focus();
              }}
              value={scanInp}
              onChange={(e) => handelScanInp(e.target.value)}
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
                width: "50px",
                fontSize: "20px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={handleGoButtonClick}
            >
              Go
            </button>
          </div>
          {inputErrorMax && (
            <h3 style={{ color: "red", margin: "0px" }}>First save data..</h3>
          )}
        </div>
        <div className="addFlaskDeatilMain">
          <div className="addDeatilMain">
            {/* <p className='addFlaskTitle'>Flask ID</p> */}
            <input
              type="text"
              placeholder="Flask ID"
              value={enteredValues[0]?.length ? enteredValues[0] : ""}
              className="addflaskInputID"
            />
            <input
              type="text"
              placeholder="Tree ID"
              value={enteredValues[1]?.length ? enteredValues[1] : ""}
              className="addflaskInputID"
              style={{ marginLeft: "20px" }}
            />
          </div>
          <div className="addDeatilMain">
            <input
              type="text"
              className="addflaskInput"
              value={enteredValues[0]?.length ? "2.8" : ""}
            />
            <input
              type="text"
              className="addflaskInput"
              value={enteredValues[1]?.length ? "16" : ""}
              style={{ marginLeft: "20px" }}
            />
          </div>
          <div className="addDeatilMain">
            <input
              type="text"
              className="addflaskInput"
              value={enteredValues[0]?.length ? "1000" : ""}
            />
            <input
              type="text"
              className="addflaskInput"
              value={enteredValues[1]?.length ? "100 Gram" : ""}
              style={{ marginLeft: "20px" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button className="addSaveNewBtn" onClick={saveData}>
              Save & New
            </button>
            {/* onClick={() => navigation('/investmentFirst')} */}
          </div>
        </div>
      </div>
    </div>
  );
}
