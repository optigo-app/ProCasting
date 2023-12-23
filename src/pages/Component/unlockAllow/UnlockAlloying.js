import React, { useState } from 'react'
import './UnlockAlloying.css'
import { Dialog, DialogContentText, DialogTitle, Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import BarcodeScanner from 'react-barcode-reader';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import idle from '../../assets/idle.gif'

export default function UnlockAlloying() {


    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const [flashCode, setFlashCode] = useState('');
    const [open, setOpen] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(true);

    const handleScan = (data) => {
        setEnteredValues([...enteredValues, data]);
    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const toggleImageVisibility = () => {
        setIsImageVisible(!isImageVisible);
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

    const handleGoButtonClick = () => {
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            setEnteredValues([...enteredValues, inputValue]);
            setInputValue('');
        }
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
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
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                </DialogContent>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleClose} style={{ margin: '-20px 0px 20px' }}>DONE</Button>

                </div>
            </Dialog>
            <p className='mainTitle' >PROCASTING-ALLOYING UNLOCK PROCESS</p>
            <div style={{ display: 'flex' }}>
                <div className='UnlockTopBox1'>
                    <div onClick={toggleImageVisibility} style={{ width: 'fit-content', marginLeft: '20px' }}>
                        {isImageVisible ? <div>
                            <img src={scaneCodeImage} className='createImageQrCode' />
                        </div> :
                            <div>
                                <img src={idle} />
                            </div>}
                    </div>
                    <div style={{ display: 'flex', marginTop: '5px' }}>
                        <input type='text' style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} onKeyDown={handleKeyDown} />
                        <button style={{ height: '45px', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                            Go
                        </button>
                    </div>

                </div>
                {/* <div style={{ width: '20%', display: 'flex', flexDirection: 'column', marginRight: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <p className='unlockRight'>0000001</p>
                </div> */}
                <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Flash Code:</p>
                        <input type='text' className='investDestilInput' value={flashCode} />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Batch No:</p>
                        <input type='text' className='investDestilInput' value={enteredValues.length === 0 ? '' : enteredValues.length === 1 ? 'AB' : enteredValues.length === 2 ? 'BC' : 'CD'} />
                    </div>
                    {/* <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Employee:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Issue wight:</p>
                        <input type='text' className='investDestilInput' />
                    </div> */}
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Department:</p>
                        <input type='text' value={enteredValues.length === 0 ? '' : 'ALLOYING'} className='investDestilInput' />
                        {/* <select className='investDestilInput'>
                            <option>Department1</option>
                            <option>Department2</option>
                            <option>Department3</option>
                            <option>Department4</option>
                        </select> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='burnOutIssueBtn' onClick={handleClickOpen}>Unlock and Issue</button>
                        {/* <button className='burnOutIssueBtn' onClick={() => navigation('/batchListing')}>Unlock and Issue</button> */}
                    </div>
                </div>

            </div>

            {/* <table style={{ border: '1px solid', backgroundColor: '#add8e6', margin: '20px' }}>
                <tr>
                    <th className='BurnTableRow'>Batch No:AB </th>
                </tr>
                <tr>
                    <th className='burnTdata'>78 Jobs </th>
                </tr>
                <tr>
                    <th className='burnTdata'>150 Grams </th>
                </tr>
                <tr>
                    <th className='burnTdata'>Wax Setting</th>
                </tr>

            </table> */}
        </div>
    )
}
