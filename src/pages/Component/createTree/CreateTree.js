import React, { useEffect, useRef, useState } from 'react';
import './CreateTree.css'
import { useNavigate } from 'react-router-dom';

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
import ProfileImg from '../../assets/profile.webp'
import BarcodeScanner from 'react-barcode-reader';
import castingTree from '../../assets/castingtree.jpg'

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
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [todayDate, setTodayDate] = useState('');
    const [inpFocus, setInpFocus] = useState('');
    const navigation = useNavigate();
    const classes = useStyles();

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const CurrentImageValue = useRecoilValue(CurrentImageState);
    const [inputWightValue, setInputWeightValue] = useState('');

    // console.log("scan",isImageVisible);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setTodayDate(today)
    }, [])


    useEffect(() => {
        if (inputRef.current && isImageVisible) {
          inputRef.current.focus();
        }
    }, [isImageVisible]);
    

    const handelscanvalue = (target) =>{
        setInpFocus(target)
    }

 
    setTimeout(()=>{
        if(inpFocus?.length>0){
            setInpFocus('')
        }
    },510)
    

    console.log("inputRef",inpFocus);

    useEffect(()=>{
        if (isImageVisible === true && inpFocus?.length > 0) {
            setTimeout(()=>{
                let data = inpFocus;
                setEnteredValues([...enteredValues, data]);
            },500)
        }
    },[isImageVisible,inpFocus])

    useEffect(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      }, [enteredValues])

    const handleScan = (data) => {
        if(isImageVisible===true){
            setEnteredValues([...enteredValues, data]);
        }
        console.log("data",data);
        if(data.length){
        }
    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
        setIsImageVisible(false)
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

    const handleInputWeightChange = (event) => {
        const { value } = event.target;
        const newValue = value.replace(/\D/g, '').slice(0, 3);
        setInputWeightValue(newValue);
    };

    const handleSaveNew = () => {
        window.location.reload();
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

            <BarcodeScanner
                onScan={()=>handleScan()}
                onError={()=>handleError()}
            />
            <div>
                <div className="TopBtnDivMain">
                    <p className='infoTextInput'>E0025</p>
                    <p className='infoTextInputSelectGod'>GOLD 14K WHITE</p>
                    <input
                        value={todayDate}
                        onChange={(e) => setTodayDate(e.target.value)}
                        type="date"
                        style={{
                            border: "1px solid #b8b8b8",
                            borderRadius: '5px',
                            outline: "none",
                            width: "auto",
                            height: "42px",
                            color: 'black',
                            backgroundColor: 'white',
                            fontSize: '25px'
                        }}
                    />
                    <input type='text' placeholder='Batch' className='infoTextInputBatch' />
                    <input type='number' value={inputWightValue} onChange={handleInputWeightChange} placeholder='Tree Weight' className='infoTextInputWight' />
                </div>
                <div style={{ display: 'flex', marginTop: '30px', flexWrap: 'wrap' }} className='body_container'>
                    <div className='scaneUploadMain'>
                        <div className='createORMain' >
                            <div onClick={toggleImageVisibility} style={{ width: 'fit-content', marginLeft: '30px' }}>
                                {isImageVisible ? <div>
                                    <img src={scaneCodeImage} className='createImageQrCode' />
                                </div> :
                                    <div>
                                        <img src={idle} />
                                </div>}
                                <div>
                            
                                {!isImageVisible && <p style={{fontWeight:'bold',marginLeft:'-40px'}}> <span style={{color:'red'}}>Click</span> On The Image For Scan<span style={{color:'red'}}>*</span></p>}
                                <input style={{width:'20px',position:'absolute',top:'150px',left:'110px',zIndex:-1}} value={inpFocus} onChange={(e)=>handelscanvalue(e.target.value)}  ref={inputRef}/>
                            </div>
                        </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <input type='text' style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                                    onChange={handleInputChange} onKeyDown={handleKeyDown} />
                                <button style={{ height: '98%', width: '45px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                                    Go
                                </button>
                            </div>
                            <p className="homeNoteTitle" onClick={handleClickOpen}>
                                Add Sp. Remark
                            </p>
                        </div>
                        <div className='allScaneDataMain'>
                            <div style={{ display: 'flex' }}>
                                <p className='totalItemText'>{totalValues}</p>
                                <p className='totalItemTextTrue'>{totalValues}</p>
                                <p className='totalItemTextFail'>{'0'}</p>

                            </div>
                            <div className='CreateDataMain' ref={containerRef}>
                                {enteredValues.map((value, index) => (
                                    <div className='allScandataMain' >
                                        <p className='allScanData' key={index}>{value}</p>
                                        <RemoveCircleRoundedIcon style={{ color: '#FF0000', cursor: 'pointer', fontSize: '30px' }} onClick={() => handleRemoveItem(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='uplodedImageMain' >
                        <img src={CurrentImageValue ? CurrentImageValue : castingTree} className={CurrentImageValue ? 'uplodedImage' : 'uplodedImageProfile'} />
                        <div style={{ marginTop: '5px' }}>
                            <button className='uploadImageBtn' onClick={() => setCamFlag(true)} >Upload Tree</button>
                        </div>
                    </div>
                </div>

                <div className='createFooterMain'>
                    <div className="bottomBtnDivMain">
                        <button className="showInfoBtn" onClick={handleMoreInfoShow}>
                            Show Info
                        </button>
                        <button
                            className="showInfoBtn"
                            onClick={() => navigation("/printQr")}
                        >
                            Print QR
                        </button>
                        <button
                            className="showInfoBtn"
                            onClick={() => navigation("/batchListingGrid")}
                        >
                            Show List
                        </button>
                        <button
                            className="showInfoBtn"
                            onClick={handleSaveNew}
                        >
                            Save & New
                        </button>
                    </div>
                    <div>
                        <p className="homeNoteDesc">
                            Note*:
                            <b>
                                Use Wired or Wireless Barcode/QR scanner,Not Use TAB Camera
                            </b>
                        </p>
                    </div>
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