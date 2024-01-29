import React, { useEffect, useRef, useState } from 'react'
import './BurnOut.css'
import { Dialog, DialogTitle, Drawer, Typography } from '@mui/material';
import greenImges from '../../assets/green.png'
import blueImges from '../../assets/blue.png'
import orangeImges from '../../assets/orange.png'
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import BarcodeScanner from 'react-barcode-reader';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import idle from '../../assets/idle.gif'
import topLogo from '../../assets/oraillogo.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function BurnOut() {
    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [greenImg, setGreeImg] = useState(false);
    const [blueImg, setBlueImg] = useState(false);
    const [orangeImg, setOrangImg] = useState(false);
    const [defaultImg, setDefaultImg] = useState(false);
    const [inputError, setInputError] = useState(false)
    const [openYourBagDrawer, setOpenYourBagDrawer] = useState(false);
    const [flashCode, setFlashCode] = useState('');
    const [open, setOpen] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [scanInp, setScanInp] = useState('');
    const invProRef = useRef(null)
    const navigation = useNavigate();

    useEffect(() => {
        if (enteredValues[0] === 'F1') {
            setGreeImg(true)
        } else if (enteredValues[0] === 'F2') {
            setGreeImg(true)

        } else if (enteredValues[0] === 'F3') {
            setGreeImg(true)

        } else if (enteredValues[0] === 'F4') {
            setBlueImg(true)
        } else if (enteredValues[0] === 'F5') {
            setBlueImg(true)

        } else if (enteredValues[0] === 'F6') {
            setBlueImg(true)

        } else if (enteredValues[0] === 'F7') {
            setOrangImg(true)
        } else if (enteredValues[0] === 'F8') {
            setOrangImg(true)
        } else if (enteredValues[0] === 'F9') {
            setOrangImg(true)
        } else {
            setDefaultImg(true)
        }

    }, [enteredValues])

    useEffect(() => {
        if (enteredValues.length === 1) {
            setOpenYourBagDrawer(true)
        }
    }, [enteredValues])

    useEffect(() => {
        if (scanInp?.length) {
            setTimeout(() => {
                // if (!openYourBagDrawer && isImageVisible) {
                if (isImageVisible) {
                    setEnteredValues([...enteredValues, scanInp]);

                    setFlashCode(scanInp)
                }
            }, 500)
        }
    }, [scanInp])

    setTimeout(() => {
        if (scanInp?.length > 0) {
            setScanInp('')
        }
    }, 510);

    const handleScan = (data) => {
        setEnteredValues([...enteredValues, data]);
    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handelScanInp = (target) => {
        setScanInp(target)
    }

    const toggleImageVisibility = () => {
        if (invProRef.current) {
            invProRef.current.focus();
        }
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setFlashCode(event.target.value);
    };

    const handleGoButtonClick = () => {
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            setEnteredValues([...enteredValues, inputValue]);
            setInputValue('');
        }
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
    const notify = () => toast.success("SAVED SUCCESSFULLY");

    const handleIssueJob = () => {
        if (enteredValues.length === 0) {
            alert('Enetr job first')
        } else {
            // window.location.reload();
            // setTimeout(()=>{
            // },500)
            notify();
            setFlashCode('');
            setEnteredValues([]);
            setGreeImg(false);
            setBlueImg(false);
            setOrangImg(false);
            // setOpen(true);
        }
    }

    return (
        <div>
            <BarcodeScanner
                onScan={handleScan}
                onError={handleError}
                facingMode="environment"
            />
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ marginInline: "45px" }}>
                    {"SAVE THE FLASK PROCESS"}
                </DialogTitle>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    <Button onClick={handleClose}>SAVE</Button>
                </div>
            </Dialog>
            <div className="TopBtnDivMainOneV2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className='headerV2Title' >BURNOUT PROCESS</p>
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}
                    onClick={() => navigation("/")}
                >
                    <img src={topLogo} style={{ width: "75px" }} />
                    <p
                        style={{
                            fontSize: "25px",
                            opacity: "0.6",
                            margin: "0px 10px",
                            fontWeight: 500,
                        }}
                    >
                        <span style={{ color: "#00FFFF", opacity: "1" }}>Pro</span>Casting
                    </p>
                </div>
            </div>
            <div className='burn_main_container' style={{ display: 'flex' }}>
                <div className="left_container" style={{ width: '75%' }}>
                    <div style={{ display: "flex", marginTop: "-10px", justifyContent: 'space-evenly' }}>
                        <div className="BurnTopBox1">
                            <div
                                onClick={toggleImageVisibility}
                                style={{ width: "fit-content", position: "relative" }}
                            >
                                {isImageVisible ? (
                                    <div style={{ marginRight: '60px' }}>
                                        <img src={scaneCodeImage} className="createImageQrCode" />
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img src={idle} />
                                    </div>
                                )}
                                {!isImageVisible && (
                                    <p
                                        style={{
                                            fontWeight: "bold",
                                            margin: "-5px 5px 15px 10px",
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
                                        left: "80px",
                                        top: "75px",
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
                                        left: "85px",
                                        top: "70px",
                                        zIndex: -1,
                                    }}
                                >
                                    c
                                </button>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <input type='text' value={inputValue} style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' onChange={handleInputChange} onKeyDown={handleKeyDown} />
                                <Button className='createGoBtn' style={{ color: 'white', backgroundColor: 'black', borderRadius: '0px' }} onClick={handleGoButtonClick} >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>GO</Typography>
                                </Button>
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

                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: "30px",
                                    alignItems: "center",
                                }}
                            >
                                <p className="investDestilInputTitle">FLASH CODE:</p>
                                <input
                                    type="text"
                                    className="burnoutInput"
                                    value={flashCode}
                                />
                            </div>
                            <div className="investDestilInputDiv">
                                <p className="investDestilInputTitle">BATCH NO:</p>
                                <input
                                    type="text"
                                    className="burnoutInput"
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
                            <button className="burnOutIssueBtn" onClick={handleIssueJob}>
                                BurnOut Issue
                            </button>
                        </div>
                        <div
                            style={{
                                width: "19%",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "-40px",
                                marginTop: "30px",
                                alignItems: "center",
                            }}
                        >
                            <p style={{ margin: "0px", fontSize: "20px", fontWeight: 500 }}>
                                Flask Count
                            </p>
                            <h1 className="burnCountFlask">{enteredValues.length}</h1>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h2 className="brunFurnaceId">furnace ID : F123</h2>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {enteredValues.map((value, index) => (
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
                                {/* <tr>
                                <th className='investTableRow'>Flask ID</th>
                            </tr> */}
                            </table>
                        ))}
                    </div>
                </div>
                <div className="investSideFixedImg" >
                   {(greenImg || blueImg || orangeImg)
                    &&
                   <img
                        src={
                            (greenImg && greenImges) ||
                            (blueImg && blueImges) ||
                            (orangeImg && orangeImges)|| undefined
                        }
                        alt={''}
                        //   style={{paddingRight:'10px'}}
                        className="DrawerImg"
                        style={{display:''}}
                    />}
                </div>
            </div>

            <div
                style={{
                    bottom: "10px",
                    textAlign: "center",
                    width: "100%",
                    color: "#a396c8",
                    fontSize: "18px",
                    fontWeight: 500,

                }}
            >
                {
                    "furnace Program number > #D (Diamond)  |   #W (WAX) |   #R1 Resin1    |    #R2 Resin2"
                }
            </div>
        </div>
    );
}
