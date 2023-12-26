import React, { useEffect, useState ,useRef} from 'react'
import './InvestMentFirst.css'
import { Button, Dialog, DialogTitle, Drawer } from '@mui/material';
import greenImges from '../../assets/green.png'
import blueImges from '../../assets/blue.png'
import orangeImges from '../../assets/orange.png'
import { IoMdClose } from "react-icons/io";
import Countdown from "react-countdown";

import BarcodeScanner from 'react-barcode-reader';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import idle from '../../assets/idle.gif'


export default function InvestMentFirst() {

  const [inputValue, setInputValue] = useState('');
  const [enteredValues, setEnteredValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeOut, setTiemOut] = useState(undefined);
  const [inputError, setInputError] = useState(false)
  const [openYourBagDrawer, setOpenYourBagDrawer] = useState(false);
  const [greenImg, setGreeImg] = useState(false);
  const [blueImg, setBlueImg] = useState(false);
  const [orangeImg, setOrangImg] = useState(false);
  const [defaultImg, setDefaultImg] = useState(false);
  const [weight, setWeight] = useState(false);
  const [TDS, setTDS] = useState(undefined);
  const [phValue, setPhValue] = useState(undefined);
  const [showTimmerBtn, setShowTimmerBtn] = useState(false);
  const [scanInp, setScanInp] = useState('');
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [enteredTime, setEnteredTime] = useState('');
   const[eviIndex,setEviIndex]=useState([]);

  const invProRef = useRef(null)

  const handleScan = (data) => {
    // setEnteredValues([...enteredValues, data]);
  };

  const handleError = (error) => {
    console.error('Error while scanning:', error);
  };


  console.log("eviIndex", eviIndex);

  const toggleImageVisibility = () => {
    // setIsImageVisible(!isImageVisible);
    if (invProRef.current ) {
      invProRef.current.focus();
  }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGoButtonClick = () => {
    if (inputValue === '' || inputValue === undefined) {
      setInputError(true)
    } else {
      setInputError(false)
      setEnteredValues([...enteredValues, { label: inputValue }]);
      setInputValue('');
    }

  };


  useEffect(() => {

    if (enteredValues[0]?.label === 'F1') {
      // setOpenYourBagDrawer(true)
      setGreeImg(true)
    } else if (enteredValues[0]?.label === 'F2') {
      setGreeImg(true)

    } else if (enteredValues[0]?.label === 'F3') {
      setGreeImg(true)

    } else if (enteredValues[0]?.label === 'F4') {
      setBlueImg(true)
    } else if (enteredValues[0]?.label === 'F5') {
      setBlueImg(true)

    } else if (enteredValues[0]?.label === 'F6') {
      setBlueImg(true)

    } else if (enteredValues[0]?.label === 'F7') {
      setOrangImg(true)
    } else if (enteredValues[0]?.label === 'F8') {
      setOrangImg(true)
    } else if (enteredValues[0]?.label === 'F9') {
      setOrangImg(true)
    } else {
      setDefaultImg(true)
    }

  }, [enteredValues])

  useEffect(() => {

    if (enteredValues?.length === 1) {
      setOpenYourBagDrawer(true)
    }

  }, [enteredValues])


  const handleInputChangen = (e) => {
    setEnteredTime(e.target.value);
  };
  const handleDelayedFunction = () => {
    setTiemOut(true);
  };
  const handleDoneClick = () => {
    setTiemOut(false)
    let totalTi = enteredTime * 60000
    setTimeout(handleDelayedFunction, totalTi);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleGoButtonClick();
    }
  };

  const saveDataHandle = () => {
    if (TDS === undefined || TDS === '') {
      alert('Enetr TDS')
    } else if (phValue === undefined || phValue === '') {
      alert('Enetr phValue')
    } else {
      const updateData = enteredValues?.map((ev, i) => {
        if (!ev["btncom"]) {
          ev["btncom"] = (
            <button onClick={() => handleStartTime(i)} >Start Time</button>
          );
        }
        return ev
      })
      setEnteredValues(updateData)
      console.log("enteredValues", enteredValues);
      setShowTimmerBtn(true)
      setTDS('')
      setPhValue('')
    }
  }


  const Completionist = () => {
    const d = new Date();
    let hour = d.getHours().toString().length === 1 ? `0${d.getHours()}` : d.getHours();
    let min = d.getMinutes().toString().length === 1 ? `0${d.getMinutes()}` : d.getMinutes();
    let sec = d.getSeconds().toString().length === 1 ? `0${d.getSeconds()}` : d.getSeconds()
    return `${hour}:${min}:${sec}`;
  }


  const handleStartTime = (evi) => {
    setEviIndex((pre) => [...pre, evi])

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Completionist />;
      } else {
        return (
          <span>
            {minutes}:{seconds}
          </span>
        );
      }
    };

    const updatedData = enteredValues.map((d, index) => {
      if (!d.timer && evi === index) {
        d.timer = <Countdown date={Date.now() + 30000} renderer={renderer} />;
      }
      return d;
    });

    setEnteredValues(updatedData);
  }

    const handelScanInp = (target) =>{
      setScanInp(target)
    }

    useEffect(()=>{
      if(scanInp?.length){
          setTimeout(()=>{
            if(!openYourBagDrawer && isImageVisible) {
              setEnteredValues([...enteredValues, {label:scanInp}]);
            }
          },500)
      }
  },[scanInp])

    setTimeout(() => {
      if(scanInp?.length>0){
        setScanInp('')
      }
  }, 510);


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

      <Drawer
        open={openYourBagDrawer}
        onClose={() => {
            setOpenYourBagDrawer(false);
        }}
        anchor="right"
        elevation={0}
        className="searchCustomDrawer"
        sx={{
          "& .MuiBackdrop-root": { backgroundColor: "transparent" },
          zIndex: 111,
        }}
      >
        <div>
          <div>
            <IoMdClose
              style={{
                height: "40px",
                color: "red",
                width: "40px",
                cursor: "pointer",
              }}
              onClick={() => setOpenYourBagDrawer(false)}
            />
          </div>
          <img
            src={
              (greenImg && greenImges) ||
              (blueImg && blueImges) ||
              (orangeImg && orangeImges)
            }
            className="DrawerImg"
          />
        </div>
      </Drawer>
      <div>
        <div className="TopBtnDivMainOne">
          <p style={{ margin: '0px', marginLeft: '10px', fontSize: '20px', fontWeight: 500 }}>INVESTMENT PROCESS</p>
        </div>

        <div style={{ height: "50px", position: 'absolute', right: '0px' }}>
          {greenImg && (
            <button
              onClick={() => setOpenYourBagDrawer(true)}
              style={{ float: "right", height: "50px", width: "120px" }}
            >
              Open Image
            </button>
          )}
          {blueImg && (
            <button
              onClick={() => setOpenYourBagDrawer(true)}
              style={{ float: "right", height: "50px", width: "120px" }}
            >
              Open Image
            </button>
          )}
          {orangeImg && (
            <button
              onClick={() => setOpenYourBagDrawer(true)}
              style={{ float: "right", height: "50px", width: "120px" }}
            >
              Open Image
            </button>
          )}
        </div>
        <div style={{ display: "flex", marginTop: '0px' }}>
          <div className="investTopBox1">
            <div onClick={toggleImageVisibility} style={{ width: 'fit-content', marginLeft: '45px',position:'relative' }}>
              {isImageVisible ? <div>
                <img src={scaneCodeImage} className='createImageQrCode' style={{marginRight:'25px'}} />
              </div> :
                <div>
                  <img src={idle} />
                </div>}
                {!isImageVisible && (
              <p style={{ fontWeight: "bold", marginLeft: "-40px",marginTop:'-10px' }}>
                {" "}
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
              </p>
            )}
                <input style={{width:'12px',position:'absolute',left:'50px',top:'70px',zIndex:-1}} ref={invProRef} onBlur={()=>{setIsImageVisible(false)}} onFocus={()=>setIsImageVisible(true)} value={scanInp} onChange={(e)=>handelScanInp(e.target.value)} autoFocus/>
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <input
                type="text"
                onKeyDown={handleKeyDown}
                style={{ border: inputError && "1px solid red" }}
                className="enterBrachItemBox"
                value={inputValue}
                onChange={handleInputChange}
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
          <div
            style={{
              width: "30%",
              overflow: "auto",
              height: "350px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {enteredValues?.map((value, index) => (
              <div className="allScanInvestdataMain">
                <p className="allInvestScanData" key={index}>
                  {value?.label}
                </p>
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: "flex", marginTop: "15px" }}>
              <p className="investDestilInputTitleNew">weight:</p>
              <input
                type="text"
                value={
                  (greenImg && "3000") ||
                  (blueImg && "3000") ||
                  (orangeImg && "3000") ||
                  (weight && "") ||
                  (defaultImg && "")
                }
                className="investDestilInput"
              />
            </div>
            <div style={{ display: "flex", marginTop: "15px" }}>
              <p className="investDestilInputTitleNew">TDS:</p>
              <input
                type="text"
                className="investDestilInput"
                value={TDS}
                onChange={(e) => setTDS(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", marginTop: "15px" }}>
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
              <button className="investAddGlassBtn" onClick={saveDataHandle}>
                Save
              </button>
            </div>
          </div>

          {/* <div className='investTopBox2' >
                        <p className='investTreeCount'>(5)Tree Count</p>
                        <div>
                            <p style={{ margin: '0px', fontSize: '25px', marginTop: '30px', textAlign: 'center' }}>Req Powder weight</p>
                            <p className='investPowder'>3000 gm</p>

                            <p style={{ margin: '0px', fontSize: '30px', marginTop: '30px', color: '#a6a6a6', textAlign: 'center' }}>Req Powder weight</p>
                            <p className='investReqPowder'>3000 gm</p>
                        </div>
                    </div> */}
        </div>

        {/* <div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Flash Code:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Batch No:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Employee:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Department:</p>
                        <select className='investDestilInput'>
                            <option>Department1</option>
                            <option>Department2</option>
                            <option>Department3</option>
                            <option>Department4</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                        {timeOut === undefined ?
                            <button className='investAddGlassBtn' onClick={handleClickOpen}>Add Glass of time</button> :
                            timeOut === false ?
                                <h1>Time is Running</h1> : <h1>Time out</h1>}
                        <button className='investStartBtn' onClick={() => navigation('/burnOut')}>START</button>
                    </div>
                </div> */}
        <div style={{ display: "flex", marginTop: '-70px', flexWrap: "wrap" }}>
          {enteredValues?.map((value, index) => (
            <table
              key={index}
              style={{
                backgroundColor:
                  (greenImg && "#b1d8b7") ||
                  (blueImg && "#a396c8") ||
                  (orangeImg && "orange") ||
                  (defaultImg && "#add8e6"),
                margin: "20px",
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
                <th className="investTableRow">{value?.label}</th>
              </tr>
              <tr>
                <th className='btncom' style={{ display: eviIndex?.includes(index) ? "none" : 'block' }}>{value?.btncom}</th>
              </tr>
              <tr>
                <th style={{ color: 'red' }}>{value?.timer}</th>
              </tr>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
}
