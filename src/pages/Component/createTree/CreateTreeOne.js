import React, { useEffect, useRef, useState } from 'react';
import './CreateTree.css'
import { useLocation, useNavigate } from 'react-router-dom';

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
import EditTreeImg from '../../assets/tree.jpg'

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


export default function CreateTreeOne() {
    const [inputValue, setInputValue] = useState(undefined);
    const [inputValueHidden, setInputValueHidden] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const [camFlag, setCamFlag] = useRecoilState(CurrentCamFlag)
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [todayDate, setTodayDate] = useState('');
    const navigation = useNavigate();
    const hiddenInputRef = useRef(null);
    const CurrentImageValue = useRecoilValue(CurrentImageState);
    const [inputWightValue, setInputWeightValue] = useState('');
    const [open, setOpen] = useState(false);
    const [treeFlag,setTreeFlag] = useState(false)
    const ScanRef = useRef(null)    const [addLsit, setAddLsit] = useState(false);
    const location = useLocation();
    const [editTreeImg, setEditTreeImg] = useState(false)


    useEffect(() => {

        const today = new Date().toISOString().split('T')[0];
        setTodayDate(today)
        setIsImageVisible(true)
    }, [])
    useEffect(() => {
        setEditTreeImg(JSON.parse(localStorage.getItem('EditTreePage')))
    }, [])
    useEffect(() => {
    if(editTreeImg) setInputWeightValue('100')
    }, [editTreeImg])


    console.log('editrrr', editTreeImg);

    // alert(location?.state?.editTree)
    const handleScan = (data) => {

        // if (isImageVisible === true) {
        //     setEnteredValues([...enteredValues, data]);
        // }
        // setEnteredValues([...enteredValues, data]);

    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
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

    const handleInputChangeHidden = (event) => {

        setInputValueHidden(event.target.value);

        console.log("dattttaaaaaaaaaaaaaaa",event.target.value);
       
        
    };

    useEffect(()=>{
        if(inputValueHidden.length){
            setTimeout(()=>{
                if(!isImageVisible){
                    setEnteredValues([...enteredValues, inputValueHidden]);
                }
            },500)
        }
    },[inputValueHidden])

    setTimeout(() => {
        if(inputValueHidden?.length>0){
            setInputValueHidden('')
        }
    }, 510);

    const handleGoButtonClick = () => {
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            setEnteredValues([...enteredValues, inputValue]);
            setInputValue('');
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

        if (addLsit === false) {
            setAddLsit(true);
            let newData = ['1/1999', '2/1123', '1/3453', '2/121', '5/14523']
            setEnteredValues([...enteredValues, ...newData]);
        }

    }

    const handleInputWeightChange = (event) => {
        const { value } = event.target;
        if(value?.length){
            setTreeFlag(true)
        }
        const newValue = value.replace(/\D/g, '').slice(0, 3);
        setInputWeightValue(newValue);
    };

    const handleSaveNew = () => {
        window.location.reload();
    }

    // const inputField = document.getElementById("hiddeninp");
    // useEffect(()=>{
    //     if (document.activeElement === inputField) {
    //       console.log("Input field is currently focused.");
    //     } else {
    //       console.log("Input field is not focused.");
      
    //     }
    // },[inputField,document.activeElement])

    console.log("ScanRef.current",ScanRef.current );
    console.log("treeFlag",treeFlag);
    const toggleImageVisibility = () => {
        // setIsImageVisible(!isImageVisible);
        if (ScanRef.current && treeFlag) {
            ScanRef.current.focus();
        }
    };


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
                onScan={handleScan}
                onError={handleError}
                
            />
            <div>
                <div className="TopBtnDivMainOne">
                    <div>
                        <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500 }}>CREATE NEW BATCH</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className='infoTextInputONe'>E0025(BOB THOMAS)</p>
                        {totalValues !== 0 && <p className='infoTextInputONe'>GOLD 14K WHITE</p>}
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '15px', flexWrap: 'wrap' }} className='body_container'>
                    <div className='scaneUploadMain'>
                        <div className='createORMain' >
                            <div onClick={toggleImageVisibility} style={{ width: 'fit-content', marginLeft: '30px',position:'relative'}}>
                                {!isImageVisible ? <div>
                                    <img src={scaneCodeImage} className='createImageQrCode' />
                                </div> :
                                    <div>
                                        <img src={idle}  />
                                    </div>}
                                <div>
                                {isImageVisible && <p style={{fontWeight:'bold',marginLeft:'-40px'}}> <span style={{color:'red'}}>Click</span> On The Image For Scan<span style={{color:'red'}}>*</span></p>}
                                    <input type='text' id="hiddeninp" ref={ScanRef} onBlur={()=>{setIsImageVisible(true)}} onFocus={()=>setIsImageVisible(false)} value={inputValueHidden} onChange={handleInputChangeHidden} style={{ width: '20px', position: 'absolute', top: '80px', left: '50px',zIndex:-1}} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <input type='text' value={inputValue} style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' onChange={handleInputChange} onKeyDown={handleKeyDown} />
                                <button style={{ height: '98%', width: '55px', marginLeft: '5px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                                    Go
                                </button>
                            </div>
                            <input
                                value={todayDate}
                                onChange={(e) => setTodayDate(e.target.value)}
                                type="date"
                                style={{
                                    border: "1px solid #b8b8b8",
                                    borderRadius: '5px',
                                    outline: "none",
                                    width: "210px",
                                    height: "42px",
                                    color: 'black',
                                    backgroundColor: 'white',
                                    fontSize: '25px',
                                    marginTop: '15px'
                                }}
                            />
                            <input type='text' placeholder='Batch' value={'AB'} style={{ marginTop: '15px' }} className='infoTextInputBatch' />
                            <input type='number' value={inputWightValue} style={{ marginTop: '15px',border: !treeFlag && '1px solid red' }} onChange={handleInputWeightChange} placeholder='Tree Weight' className='infoTextInputWight' />

                        </div>
                        <div className='allScaneDataMain'>
                            <div style={{ display: 'flex' }}>
                                <p className='totalItemText'>{totalValues}</p>
                                <p className='totalItemTextTrue'>{totalValues}</p>
                                <p className='totalItemTextFail'>{'0'}</p>

                            </div>
                            <div className='CreateDataMain'>
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
                        {editTreeImg === true ? <img src={EditTreeImg} style={{ height: '430px' ,objectFit: 'contain' }} className={CurrentImageValue ? 'uplodedImage' : 'uplodedImageProfile'} /> :
                            <img src={CurrentImageValue ? CurrentImageValue : castingTree} className={CurrentImageValue ? 'uplodedImage' : 'uplodedImageProfile'} />}


                        <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-around' }}>
                            <button className='uploadImageBtn' onClick={() => setCamFlag(true)} >Upload Tree</button>
                            <p className="homeNoteTitle" style={{ margin: '0px', fontSize: '23px' }} onClick={handleClickOpen}>
                                Remark
                            </p>
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