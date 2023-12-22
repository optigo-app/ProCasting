import React, { useEffect, useState } from 'react'
import './InvestMentFirst.css'
import QRCode from 'qrcode.react'
import { Button, Dialog, DialogTitle, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import greenImges from '../../assets/green.png'
import blueImges from '../../assets/blue.png'
import orangeImges from '../../assets/orange.png'
import { IoMdClose } from "react-icons/io";
import Barcode from 'react-barcode';


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
    const containerStyle = {
        width: '170px',
        display: 'inline-block',
        overflow: 'hidden',
        alignItems: 'center'
    };

    const barcodeValue = '123456789012345678901234';
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
        } else {
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
            setShowTimmerBtn(true)
            setTDS('')
            setPhValue('')
        }
    }

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
                <div style={{ height: '50px' }}>

                    {greenImg && <button onClick={() => setOpenYourBagDrawer(true)} style={{ float: 'right', height: '50px', width: '120px' }}>Open Image</button>}
                    {blueImg && <button onClick={() => setOpenYourBagDrawer(true)} style={{ float: 'right', height: '50px', width: '120px' }}>Open Image</button>}
                    {orangeImg && <button onClick={() => setOpenYourBagDrawer(true)} style={{ float: 'right', height: '50px', width: '120px' }}>Open Image</button>}
                </div>
                <div style={{ display: 'flex' }}>
                    <div className='investTopBox1'>
                        <div style={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
                            <div style={containerStyle}>
                                <Barcode
                                    value={barcodeValue}
                                    width={2}
                                    height={100}
                                    fontSize={16}
                                    displayValue={false}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <input type='text' onKeyDown={handleKeyDown} style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                                onChange={handleInputChange} />
                            <button style={{ height: '47px', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                                Go
                            </button>
                        </div>

                        <button style={{ marginTop: '20px', cursor: 'pointer', height: '35px', width: '100px' }} onClick={handleRefresh}>Clear All</button>
                    </div>
                    <div style={{ width: '30%', overflow: 'auto', height: '350px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {enteredValues.map((value, index) => (
                            <div className='allScanInvestdataMain' >
                                <p className='allInvestScanData' key={index}>{value}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div style={{ display: 'flex', marginTop: '15px' }}>
                            <p className='investDestilInputTitleNew'>weight:</p>
                            <input type='text' value={greenImg && '3000' || blueImg && '3000' || orangeImg && '3000' || weight && '' || defaultImg && ''} className='investDestilInput' />
                        </div>
                        <div style={{ display: 'flex', marginTop: '15px' }}>
                            <p className='investDestilInputTitleNew'>TDS:</p>
                            <input type='text' className='investDestilInput' value={TDS} onChange={(e) => setTDS(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', marginTop: '15px' }}>
                            <p className='investDestilInputTitleNew'>PHvalue:</p>
                            <input type='text' className='investDestilInput' value={phValue} onChange={(e) => setPhValue(e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                            <button className='investAddGlassBtn' onClick={saveDataHandle}>Save</button>
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
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {enteredValues.map((value, index) => (
                        <table key={index} style={{ backgroundColor: greenImg && '#b1d8b7' || blueImg && '#a396c8' || orangeImg && 'orange' || defaultImg && '#add8e6', margin: '20px' }}>
                            <tr>
                                <th className='investTableRow'>Batch No:{index === 0 && 'AB'}{index === 1 && 'BC'}{index === 2 && 'CD'} </th>
                            </tr>
                            <tr>
                                <th className='investTableRow'>78 Jobs </th>
                            </tr>
                            <tr>
                                <th className='investTableRow'>150 Grams </th>
                            </tr>
                            <tr>
                                <th className='investTableRow'>{greenImg && 'Wax Setting' || blueImg && 'Regular' || orangeImg && 'RPT'}</th>
                            </tr>
                            <tr>
                                <th className='investTableRow'>Flask ID</th>
                            </tr>
                            {showTimmerBtn &&
                                <div>
                                    <button style={{ height: '40px', width: '120px' }}>Start Time</button>
                                </div>
                            }
                        </table>
                    ))}
                </div>

            </div>
        </div>
    )
}
