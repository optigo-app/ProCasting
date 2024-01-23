import React, { useEffect, useRef, useState } from 'react';
import './CreateTree.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Menu, MenuItem, TextField } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CurrentCamFlag, CurrentImageState } from '../../recoil/Recoil';
import ImageWebCam from '../imageTag/ImageWebCam';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import idle from '../../assets/idle.gif'
import topLogo from '../../assets/oraillogo.png'
import BarcodeScanner from 'react-barcode-reader';
import castingTree from '../../assets/castingtree.jpg'
import EditTreeImg from '../../assets/tree.jpg'
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoPrint } from "react-icons/io5";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CreateTreeOneV2() {
    const [inputValue, setInputValue] = useState(undefined);
    const [inputValueHidden, setInputValueHidden] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const [camFlag, setCamFlag] = useRecoilState(CurrentCamFlag)
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [todayDate, setTodayDate] = useState('');
    const navigation = useNavigate();
    const CurrentImageValue = useRecoilValue(CurrentImageState);
    const [inputWightValue, setInputWeightValue] = useState('');
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [treeFlag, setTreeFlag] = useState(false)
    const ScanRef = useRef(null)
    const [addLsit, setAddLsit] = useState(false);
    const [editTreeImg, setEditTreeImg] = useState(false)
    const [remark, setReamrk] = useState(undefined);
    const [showEnteredValue, setShowEnteredValue] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const openProMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseProMenu = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setTodayDate(today)
        setIsImageVisible(true)
    }, [])

    useEffect(() => {
        if (inputValueHidden.length) {
            setTimeout(() => {
                if (!isImageVisible) {
                    setEnteredValues([...enteredValues, inputValueHidden]);
                }
            }, 500)
        }
    }, [inputValueHidden])

    useEffect(() => {
        setEditTreeImg(JSON.parse(localStorage.getItem('EditTreePage')))
    }, [])

    useEffect(() => {
        if (editTreeImg) setInputWeightValue('100')
    }, [editTreeImg])

    const handleScan = (data) => { };
    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClickOpenDelete = () => {
        setOpenDelete(false);
    };

    const handleRemoveItem = (indexToRemove) => {
        setOpenDelete(true);
        setSelectedIndex(indexToRemove);
        // setEnteredValues(enteredValues.filter((_, index) => index !== indexToRemove));
    };

    const handleConfirmation = () => {
        setEnteredValues(enteredValues.filter((_, index) => index !== selectedIndex));
        setOpenDelete(false);
    };


    const handleClose = () => {
        setOpen(false);
        setShowEnteredValue(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputChangeHidden = (event) => {
        setInputValueHidden(event.target.value);
    };

    setTimeout(() => {
        if (inputValueHidden?.length > 0) {
            setInputValueHidden('')
        }
    }, 510);

    const handleGoButtonClick = () => {
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            if (isImageVisible) setEnteredValues([...enteredValues, inputValue]);
            setInputValue('');
        }
    };

    const totalValues = enteredValues.length;


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
        if (value?.length) {
            setTreeFlag(true)
        } else {
            setTreeFlag(false)
        }
        const newValue = value.replace(/\D/g, '').slice(0, 5);
        setInputWeightValue(newValue);
    };

    useEffect(() => {
        if (!inputWightValue) {
            setTreeFlag(true)
        } else {
            setTreeFlag(false)
        }
    }, [inputWightValue])

    const handleSaveNew = () => {
        window.location.reload();
    }

    const toggleImageVisibility = () => {
        // let safe = ScanRef.current


        if (ScanRef.current && !treeFlag) {
            ScanRef.current.focus();
        }

    };
    const handleChange = (event) => {
        setReamrk(event.target.value); // Update the remark state with the textarea value
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
                        <textarea type='text' onChange={handleChange} placeholder='Enter Remark' className='addReamrkTextBox' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ADD</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ margin: '20px', paddingInline: '100px' }}>
                    {"ARE YOU SURE TO DELETE ?"}
                </DialogTitle>
                <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleConfirmation}>YES</Button>
                    <Button onClick={handleClickOpenDelete}>NO</Button>
                </DialogActions>
            </Dialog>

            <BarcodeScanner
                onScan={handleScan}
                onError={handleError}
            />

            <div>
                <div className="TopBtnDivMainOneV2">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CgProfile style={{ height: '30px', width: '30px', marginLeft: '15px' }} onClick={handleClick} />



                        <p className='headerV2Title' >CREATE NEW BATCH</p>
                        
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openProMenu}
                            onClose={handleCloseProMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <div style={{  }}>
                                {/* <CgProfile style={{ height: '25px', width: '25px', marginLeft: '15px' }} /> */}
                                <p style={{ margin: '0px 5px',color:'#b8b8b8' ,fontWeight: 500, margin: '7px', fontSize: '20px' }}>Bob Thomas</p>
                                <p style={{ margin: '0px 5px',color:'#b8b8b8', fontWeight: 500, margin: '7px',textAlign:'center', fontSize:'20px' }}>E0025</p>
                            </div>
                            {/* <MenuItem onClick={handleClose}>E0025</MenuItem> */}
                            {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        </Menu>
                    </div>
                    <div>
                    {totalValues !== 0 && <p className='FixedGoldColorText'>GOLD 14K WHITE</p>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={topLogo} style={{ width: '75px',}} />
                        <p style={{ fontSize: '25px', opacity: '0.6', margin: '0px 10px', fontWeight: 700,color:'#000435' }} onClick={()=>navigation('/')} >ProCasting</p>
                        {/* <p className='infoTextInputONe'>E0025(BOB THOMAS)</p> */}
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '0px', flexWrap: 'wrap' }} className='body_container'>
                    <div className='scaneUploadMain'>
                        <div className='createORMain' >
                            <div onClick={toggleImageVisibility} style={{ width: 'fit-content', marginLeft:isImageVisible?'30px':'2px', position: 'relative' }}>
                                {!isImageVisible ? <div>
                                    <img src={scaneCodeImage} className='createImageQrCode' />
                                </div> :
                                    <div style={{marginLeft:'12px'}}>
                                        <img src={idle} />
                                    </div>}
                                <div>
                                    {isImageVisible && <p style={{ fontWeight: 'bold', marginLeft: '-30px',marginTop:'-12px' }}> <span style={{ color: 'red' }}>Click</span> On The Image For Scan<span style={{ color: 'red' }}>*</span></p>}
                                    <input type='text' id="hiddeninp" ref={ScanRef} onBlur={() => { setIsImageVisible(true) }} onFocus={() => setIsImageVisible(false)} value={inputValueHidden} onChange={handleInputChangeHidden} style={{ width: '20px', position: 'absolute', top: '80px', left: '50px', zIndex: -1 }} />
                                    <button style={{
                                        position: "absolute",
                                        left: "50px",
                                        top: "70px",
                                        zIndex: -1,
                                    }}>c</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <input type='text' value={inputValue} style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' onChange={handleInputChange} onKeyDown={handleKeyDown} />
                                <button className='createGoBtn' onClick={handleGoButtonClick} >
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
                                    width: "150px",
                                    height: "35px",
                                    color: 'black',
                                    backgroundColor: 'white',
                                    fontSize: '21px',
                                    marginTop: '15px'
                                }}
                            />
                            <input type='text' placeholder='Batch' value={'AB'} style={{ marginTop: '15px' }} className='infoTextInputBatch' />
                            <span style={{ display: 'flex', flexDirection: 'column' }}>
                                <input type='number' value={inputWightValue} style={{ marginTop: '15px', border: treeFlag && '1px solid red' }} onChange={handleInputWeightChange} placeholder='Tree Weight' className='infoTextInputWight' />
                                {treeFlag && <small style={{ color: 'red', marginLeft: '6px' }}>enter tree weight*</small>}
                            </span>
                            <button
                                className="saveEndNewBtn"
                                onClick={handleSaveNew}
                            >
                                Save & New
                            </button>
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
                    <div className='uplodedImageMain'>
                        <img src={CurrentImageValue ? CurrentImageValue : editTreeImg === true ? EditTreeImg : castingTree} className={CurrentImageValue ? 'uplodedImage' : editTreeImg === true ? 'uploadDefaultImg' : 'uplodedImageProfile'} />
                        <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-around' }}>
                            <button className='uploadImageBtnV2' onClick={() => setCamFlag(true)} >{editTreeImg === true ? 'Edit Tree' : 'Upload Tree'}</button>
                            <button className="homeNoteTitleV2" onClick={handleClickOpen}>
                                Remark
                            </button>
                        </div>
                    </div>
                </div>
                <button className="showInfoBtn" onClick={handleMoreInfoShow}>
                    <IoInformationCircleSharp style={{ color: 'white', height: '25px', width: '25px', marginLeft: '-7px' }} />
                </button>
                <button
                    className="printQRBtn"
                    onClick={() => navigation("/printQr")}
                >
                    <IoPrint style={{ color: 'white', height: '25px', width: '25px', marginLeft: '-7px' }} />
                </button>
                <div className='createFooterMain'>
                    {showEnteredValue && <p className='homeRemarkDesc'><b>Remark : </b>{remark}</p>}
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