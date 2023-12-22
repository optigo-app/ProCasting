import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import './CreateTree.css'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from '@mui/styles';
import { Dialog, TextField } from '@mui/material';
import profile from '../../assets/profile.webp'
import { useRecoilState, useRecoilValue } from 'recoil';
import { CurrentCamFlag, CurrentImageState } from '../../recoil/Recoil';
import ImageWebCam from '../imageTag/ImageWebCam';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Barcode from 'react-barcode';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import idle from '../../assets/idle.gif'
import BarcodeScanner from 'react-barcode-reader';

const useStyles = makeStyles({
    datePickerRoot: {
        width: '100%',
        marginTop: '10px',
    },
    datePickerInput: {
        backgroundColor: 'lightgray',
        borderRadius: '4px',
        padding: '8px',
        width: '100%',
        height: '20px'
    },
    inputRoot: {
        color: 'blue',
        '&::placeholder': {
            color: 'red',
        },
    },

});


export default function QRScanner() {
    const [inputValue, setInputValue] = useState(undefined);
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const [camFlag, setCamFlag] = useRecoilState(CurrentCamFlag)
    const [isImageVisible, setIsImageVisible] = useState(true);
    const navigation = useNavigate();
    const classes = useStyles();

    const CurrentImageValue = useRecoilValue(CurrentImageState);


    const handleScan = (data) => {
        setEnteredValues([...enteredValues, data]);
    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const toggleImageVisibility = () => {
        setIsImageVisible(!isImageVisible);
    };

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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleGoButtonClick();
        }
    };

    const handleMoreInfoShow = () => {

        let newData = ['1/1999', '2/1123', '1/3453', '2/121', '5/14523']


        setEnteredValues([...enteredValues, ...newData]);
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"ADD THE REMARK"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <textarea type='text' placeholder='Enter Remark' className='addReamrkTextBox' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ADD</Button>
                </DialogActions>
            </Dialog>
            <div>
                <BarcodeScanner
                    onScan={handleScan}
                    onError={handleError}
                    facingMode="environment"
                />
                <p className='mainTitle' >PROCASTING-CREATE NEW BATCH</p>
                <div style={{ display: 'flex', marginTop: '30px' }}>
                    <div className='allDataCreteDiv'>
                        <div style={{ display: 'flex' , justifyContent: 'center' ,alignItems:'center',gap: '5px' }}>
                            <input type='text' placeholder='Batch' className='infoTextInputBatch' />
                            <input type='text' placeholder='Enter Weight' className='infoTextInputWight' />
                            <input type='text' placeholder='Eneter Assign To' value={'E0025(ANDERSON PATRICK)'} className='infoTextInput' />
                            <input
                                type="date"
                                style={{
                                    border: "1px solid #e2e2e2",
                                    outline: "none",
                                    width: "25%",
                                    height: "45px",
                                    backgroundColor: '#d9d9d8',
                                    fontSize: '22px'
                                }}
                            />

                            <div style={{ width: "20%" }}>
                                <select className="selecGold" style={{ backgroundColor: '#d9d9d8' }}>
                                    <option className="selecGoldOption">GOLD 14K WHITE</option>
                                    <option className="selecGoldOption">GOLD 14K YELLOW</option>
                                    <option className="selecGoldOption">GOLD 18K WHITE</option>
                                    <option className="selecGoldOption">GOLD 18K YELLOW</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }} className='body_container'>
                    <div className={'createORMain'} >
                        <div onClick={toggleImageVisibility} style={{ width: 'fit-content', marginLeft: '30px' }}>
                            {isImageVisible ? <div>
                                <img src={scaneCodeImage} className='createImageQrCode' />
                            </div> :
                                <div>
                                    <img src={idle} />
                                </div>}
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <input type='text' style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                                onChange={handleInputChange} onKeyDown={handleKeyDown} />
                            <button style={{ height: '100%', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                                Go
                            </button>
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            <button className='uploadImageBtn' onClick={() => setCamFlag(true)} >uppload tree image</button>
                        </div>
                    </div>
                    <div className='allScaneDataMain'>
                        <p className='totalItemText'>{totalValues} Item Added</p>
                        <div style={{ height: '360px', alignItems: 'center', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                            {enteredValues.map((value, index) => (
                                <div className='allScandataMain' >
                                    <p className='allScanData' key={index}>{value}</p>
                                    <RemoveCircleRoundedIcon style={{ color: '#FF0000', cursor: 'pointer', fontSize: '30px' }} onClick={() => handleRemoveItem(index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='uplodedImageMain' >
                        <img src={CurrentImageValue} className='uplodedImage' />
                    </div>
                </div>

                <div className="bottomBtnDivMain">
                    <button className="showInfoBtn" onClick={handleMoreInfoShow}>
                        Show Info
                    </button>
                    <button
                        className="showInfoBtn"
                        onClick={() => navigation("/printQr")}
                    >
                        print OR
                    </button>
                    <button
                        className="showInfoBtn"
                        onClick={() => navigation("/addFlask")}
                    >
                        Show list
                    </button>
                    <button
                        className="showInfoBtn"
                        onClick={() => navigation("/addFlask")}
                    >
                        Save & New
                    </button>
                </div>
                <div style={{ marginTop: "10px" }}>
                    <p className="homeNoteTitle" onClick={handleClickOpen}>
                        Add Sp. Remark
                    </p>
                    <p className="homeNoteDesc">
                        Note*:
                        <b>
                            User Wired or Wireless Barcode/QR scanner,Not Use TAB Camera
                        </b>
                    </p>
                </div>
            </div>
            <Dialog
                open={camFlag}
                fullWidth={"sm"}
                onClose={() => setCamFlag(false)}
            >
                <ImageWebCam />
            </Dialog>
        </>
    );
}