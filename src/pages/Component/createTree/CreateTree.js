import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import './CreateTree.css'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';

const useStyles = makeStyles({
    datePickerRoot: {
        width: '100%',
        marginTop: '10px',
        //   height: '20%'
    },
    datePickerInput: {
        backgroundColor: 'lightgray',
        borderRadius: '4px',
        padding: '8px',
        width: '100%',
        height: '20px'
    },

    inputRoot: {
        color: 'blue', // Change color to desired value
        '&::placeholder': {
            color: 'red', // Change placeholder color to desired value
        },
    },

});


export default function QRScanner() {
    const [inputValue, setInputValue] = useState(undefined);
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const navigation = useNavigate();
    const classes = useStyles();


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGoButtonClick = () => {
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            setEnteredValues([...enteredValues, inputValue]); // Add the input value to the entered values array
            setInputValue(''); // Clear the input field after adding the value
        }

    };

    const totalValues = enteredValues.length;

    const handleRemoveItem = (indexToRemove) => {
        setEnteredValues(enteredValues.filter((_, index) => index !== indexToRemove));
    };

    return (

        <div>
            {/* <button className='headerTwoListBtn' onClick={() => navigation('/addFlask')}>New Tree</button> */}
            <p className='mainTitle' >PROCASTING CREATE NEW BATCH</p>
            <div style={{ display: 'flex', marginTop: '30px' }}>
                <div className='allDataCreteDiv'>
                    <div style={{ display: 'flex' }}>
                        <input type='text' placeholder='Batch' className='infoTextInput' />
                        <input type='text' placeholder='Enter Weight' className='infoTextInput' />
                        <input type='text' placeholder='Eneter Assign To' value={'E0025(ANDERSON PATRICK)'} className='infoTextInput' />
                    </div>
                    <div style={{ display: 'flex', paddingInline: '10px' }}>
                        <div style={{ width: '50%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className={classes.datePickerRoot}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params.inputProps}
                                            placeholder="Choose date" // Placeholder text
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{ width: '50%' }}>
                            <select className='selecGold'>
                                <option className='selecGoldOption'>GOLD 14K WHITE</option>
                                <option className='selecGoldOption'>GOLD 14K YELLOW</option>
                                <option className='selecGoldOption'>GOLD 18K WHITE</option>
                                <option className='selecGoldOption'>GOLD 18K YELLOW</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div className='createORMain'>
                    <QRCode value='Scan a QR code' style={{ height: '200px', width: '200px' }} />
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <input type='text' style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} />
                        <button style={{ height: '45px', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                            Go
                        </button>
                    </div>
                    <div>
                    <button className='uploadImageBtn' onClick={() => navigation('/addFlask')}>uppload tree image</button>

                    </div>

                </div>
                <div className='allScaneDataMain'>
                    <p className='totalItemText'>{totalValues} Item Added</p>
                    <div style={{ height: '540px', overflow: 'scroll', display: 'flex', flexDirection: 'column' }}>
                        {enteredValues.map((value, index) => (
                            <div className='allScandataMain' >
                                <p className='allScanData' key={index}>{value}</p>
                                <IoMdClose style={{ height: '40px', color: 'red', width: '40px', cursor: 'pointer' }} onClick={() => handleRemoveItem(index)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='bottomBtnDivMain'>
                <button className='showInfoBtn'>Show Info</button>
                <button className='showInfoBtn' onClick={() => navigation('/addFlask')}>print OR</button>
                <button className='showInfoBtn' onClick={() => navigation('/addFlask')}>Show list</button>
            </div>
            <div style={{ marginBottom: '30px' ,marginTop: '20px' }}>
                <p className='homeNoteTitle'>Add Sp. Remark</p>
                <p className='homeNoteDesc'>Note*:<b>User Wired or Wireless Barcode/QR scanner,Not Use TAB Camera</b></p>
            </div>
        </div>
    );
}