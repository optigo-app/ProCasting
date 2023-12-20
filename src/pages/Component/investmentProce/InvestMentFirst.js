import React, { useState } from 'react'
import './InvestMentFirst.css'
import QRCode from 'qrcode.react'
import { Button, Dialog, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function InvestMentFirst() {

    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [open, setOpen] = useState(false);
    const [timeOut, setTiemOut] = useState(undefined);
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
        setEnteredValues([...enteredValues, inputValue]);
        setInputValue('');
    };

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
            <div>
                <p className='mainTitleIn' >Investment Process</p>
                <div style={{ display: 'flex' }}>
                    <div className='investTopBox1'>
                        <p className='mainTitleBarCode' >Create New Bar code</p>
                        <QRCode value='Scan a QR code' />
                        <div style={{ marginTop: '20px' }}>
                            <input type='text' className='enterBrachItemBox' value={inputValue}
                                onChange={handleInputChange} />
                            <button style={{ height: '35px', cursor: 'pointer' }} onClick={handleGoButtonClick}>
                                Go
                            </button>
                        </div>
                    </div>
                    <div className='investTopBox2' >
                        <p className='investTreeCount'>(5)Tree Count</p>
                        <div>
                            <p style={{ margin: '0px', fontSize: '25px', marginTop: '30px', textAlign: 'center' }}>Req Powder weight</p>
                            <p className='investPowder'>3000 gm</p>

                            <p style={{ margin: '0px', fontSize: '30px', marginTop: '30px', color: '#a6a6a6', textAlign: 'center' }}>Req Powder weight</p>
                            <p className='investReqPowder'>3000 gm</p>
                        </div>


                    </div>
                </div>

                <div>
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
                        {/* <input type='text' className='investDestilInput' /> */}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                        {timeOut === undefined ?
                            <button className='investAddGlassBtn' onClick={handleClickOpen}>Add Glass of time</button> :
                            timeOut === false ?
                                <h1>Time is Running</h1> : <h1>Time out</h1>}
                        <button className='investStartBtn' onClick={() => navigation('/burnOut')}>START</button>
                    </div>

                </div>

                <table style={{ backgroundColor: '#add8e6', margin: '20px' }}>
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
