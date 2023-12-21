import React, { useEffect, useState } from 'react'
import './InvestMentFirst.css'
import QRCode from 'qrcode.react'
import { Button, Dialog, DialogTitle, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import greenImges from '../../assets/green.png'
import blueImges from '../../assets/blue.png'
import orangeImges from '../../assets/orange.png'
import { IoMdClose } from "react-icons/io";


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
    

    const navigation = useNavigate();

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
            setEnteredValues([...enteredValues, inputValue]);
            setInputValue('');
        }



    };
    useEffect(() => {

        if (enteredValues[0] === 'F1') {
            // setOpenYourBagDrawer(true)
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
        }else{
            setDefaultImg(true)
        }

    }, [enteredValues])


    const [enteredTime, setEnteredTime] = useState('');
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
          window.location.reload(); // This will refresh the page
        };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div>
                    <p style={{ fontSize: '25px', margin: '20px', fontWeight: 500 }}>Enter The Time..</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type='number' placeholder='Enetr Time..' style={{
                            height: '50px',
                            width: '250px',
                            marginInline: '30px'

                        }}
                            value={enteredTime}
                            onChange={handleInputChangen}
                        />
                        <button style={{
                            height: '50px',
                            margin: '30px 20px'
                        }} onClick={() => { handleDoneClick(); handleClose(); }}>Done</button>
                    </div>
                </div>
            </Dialog>

            <Drawer
                open={openYourBagDrawer}
                // onClose={() => {
                //     setOpenYourBagDrawer(false);
                // }}
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
                        <IoMdClose style={{ height: '40px', color: 'red', width: '40px', cursor: 'pointer' }} onClick={() => setOpenYourBagDrawer(false)} />
                    </div>
                    <img src={greenImg && greenImges || blueImg && blueImges || orangeImg && orangeImges} className='DrawerImg' />
                </div>
            </Drawer>
            <div>
                <p className='mainTitle'>PROCASTING-INVESTMENT PROCESS</p>
                <div style={{height : '50px'}}>

                {greenImg  && <button onClick={() => setOpenYourBagDrawer(true)} style={{float : 'right' , height : '50px' , width: '120px'}}>Open Image</button>} 
                 { blueImg && <button onClick={() => setOpenYourBagDrawer(true)} style={{float : 'right' , height : '50px' , width: '120px'}}>Open Image</button>}
                 {orangeImg  && <button onClick={() => setOpenYourBagDrawer(true)} style={{float : 'right' , height : '50px' , width: '120px'}}>Open Image</button>}
                </div>
                <div style={{ display: 'flex' }}>
                    <div className='investTopBox1'>
                        <QRCode value='Scan a QR code' style={{ height: '200px', width: '200px' }} />
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <input type='text' style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                                onChange={handleInputChange} />
                            <button style={{ height: '45px', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                                Go
                            </button>
                        </div>

                         <button style={{marginTop : '20px' , cursor : 'pointer' , height : '35px' , width : '100px'}} onClick={handleRefresh}>Clear All</button>
                    </div>
                    <div style={{ width: '30%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {enteredValues.map((value, index) => (
                            <div className='allScanInvestdataMain' >
                                <p className='allInvestScanData' key={index}>{value}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div>
                            <div style={{ display: 'flex', marginTop: '15px' }}>
                                <p className='investDestilInputTitleNew'>weight:</p>
                                <input type='text' value={'3000'} className='investDestilInput' />
                            </div>
                            <div style={{ display: 'flex', marginTop: '15px' }}>
                                <p className='investDestilInputTitleNew'>TDS:</p>
                                <input type='text' className='investDestilInput' />
                            </div>
                            <div style={{ display: 'flex', marginTop: '15px' }}>
                                <p className='investDestilInputTitleNew'>PHvalue:</p>
                                <input type='text' className='investDestilInput' />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                                <button className='investAddGlassBtn'>Save</button>
                            </div>
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

                <table style={{ backgroundColor: greenImg && '#b1d8b7' || blueImg && '#a396c8' || orangeImg && 'orange' || defaultImg && '#add8e6' , margin: '20px' }}>
                    <tr>
                        <th className='investTableRow'>Batch No:AB </th>
                    </tr>
                    <tr>
                        <th className='investTableRow'>78 Jobs </th>
                    </tr>
                    <tr>
                        <th className='investTableRow'>150 Grams </th>
                    </tr>
                    <tr>
                        <th className='investTableRow'>Wax Setting</th>
                    </tr>
                    <tr>
                        <th className='investTableRow'>Flask ID</th>
                    </tr>
                </table>
            </div>
        </div>
    )
}
