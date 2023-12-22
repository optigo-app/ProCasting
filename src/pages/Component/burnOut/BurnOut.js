import QRCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import './BurnOut.css'
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@mui/material';

import greenImges from '../../assets/green.png'
import blueImges from '../../assets/blue.png'
import orangeImges from '../../assets/orange.png'
import { IoMdClose } from "react-icons/io";
import Barcode from 'react-barcode';

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
    const containerStyle = {
        width: '170px',
        display: 'inline-block',
        overflow: 'hidden',
        alignItems: 'center'
    };

    const barcodeValue = '123456789012345678901234';

    const navigation = useNavigate();

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

    return (
        <div>
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
            <p className='mainTitle'>PROCASTING-BURNOUT PROCESS</p>
            <div style={{ height: '50px' }}>

                {greenImg && <button onClick={() => setOpenYourBagDrawer(true)} style={{ float: 'right', height: '50px', width: '120px' }}>Open Image</button>}
                {blueImg && <button onClick={() => setOpenYourBagDrawer(true)} style={{ float: 'right', height: '50px', width: '120px' }}>Open Image</button>}
                {orangeImg && <button onClick={() => setOpenYourBagDrawer(true)} style={{ float: 'right', height: '50px', width: '120px' }}>Open Image</button>}
            </div>
            <div style={{ display: 'flex' }}>
                <div className='BurnTopBox1'>
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
                    <div style={{ display: 'flex', marginTop: '5px' }}>
                        <input type='text' onKeyDown={handleKeyDown} style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} />
                        {/* <input type='text' className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} /> */}
                        <button style={{ height: '47px', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                            Go
                        </button>
                    </div>
                    <button style={{ marginTop: '20px', cursor: 'pointer', height: '35px', width: '100px' }} onClick={handleRefresh}>Clear All</button>
                </div>
                <div style={{ width: '20%', display: 'flex', flexDirection: 'column', marginRight: '20px', marginTop: '30px', alignItems: 'center' }}>
                    <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500 }}>Flask Count</p>
                    <h1 className='burnCountFlask'>{enteredValues.length}</h1>
                </div>
                <div>
                    <div style={{ display: 'flex', marginTop: '30px' }}>
                        <p className='investDestilInputTitle'>Flash Code:</p>
                        <input type='text' className='investDestilInput' value={flashCode} />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Batch No:</p>
                        <input type='text' className='investDestilInput' value={enteredValues.length === 0 ? '' : enteredValues.length === 1 ? 'AB' : enteredValues.length === 2 ? 'BC' : 'CD'} />
                    </div>
                    <button className='burnOutIssueBtn' onClick={() => navigation('/unlock')}>Issue Job</button>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2 className='brunFurnaceId'>furnace ID : F123</h2>
            </div>

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
                        {/* <tr>
                            <th className='investTableRow'>Flask ID</th>
                        </tr> */}
                    </table>
                ))}
            </div>
        </div>
    )
}
