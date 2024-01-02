import React, { useEffect, useRef, useState } from 'react'
import './HomeOne.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/oraillogo.png'
import Note from '../../assets/note.jpg'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@mui/material';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import proLogo from '../../assets/proLogo.png'
import BarcodeScanner from 'react-barcode-reader';

import slider6 from '../../assets/slider/Grid.png'
import slider5 from '../../assets/slider/alloying.png'
import slider2 from '../../assets/slider/bindflask.png'
import slider4 from '../../assets/slider/burnout.png'
import slider7 from '../../assets/slider/dashboard.png'
import slider3 from '../../assets/slider/investment.png'
import slider1 from '../../assets/slider/tree.png'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const fullScreenStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // background: 'yellow',
    background: '#f1f1f1',
    // background: ' linear-gradient(90deg, #b08efe 0%, #a79afe 9%, #a5bffd 100%)',
};

export default function HomeOne() {

    const [open, setOpen] = useState(false);
    const [openTree, setOpenTree] = useState(false);
    const [scannedValue, setScannedValue] = useState();
    const [scannedValueError, setScannedValueError] = useState(false);
    const [editLocalVal, setEditLocalVal] = useState(false)
    const scanRef = useRef(null);
    const navigation = useNavigate();

    useEffect(() => {
        if (scanRef.current) {
            scanRef.current.focus()
        }
    }, [])

    // useEffect(() => {
    //     document.body.style.backgroundColor = 'lightblue';
    //     return () => {
    //         document.body.style.backgroundColor = '';
    //     };

    // }, []);

    const handleScan = (data) => {
        setScannedValue(data)
        setScannedValueError(false)
    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handleClickOpen = () => {
        setEditLocalVal(false)
        setOpen(true);
        localStorage.setItem('EditTreePage', false)


    };
    const handleClickOpenEdit = () => {
        setEditLocalVal(true)
        setOpen(true);
        localStorage.setItem('EditTreePage', true)
    };
    const handleClose = () => {
        setOpen(false);
        setScannedValue('');
        setScannedValueError(false);
    };
    const handleCloseContiue = () => {
        if (scannedValue === undefined || scannedValue === '') {
            setScannedValueError(true)
        } else {
            setScannedValueError(false)
            setScannedValue('AB')
            navigation('/createTreeOneV2')
            // navigation(editTree === false ? '/createTreeOne' : '/createTreeOne', { state: { editTree: editTree ? 'true' : 'false' } })
        }
    }

    const printQR = (url) => {
        window.open(url)
    }

    const handleClickOpenTree = () => {
        setOpenTree(true);
    };
    const handleCloseTree = () => {
        setOpenTree(false);
    };
    return (
        <div style={fullScreenStyle}>
            <BarcodeScanner
                onScan={handleScan}
                onError={handleError}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <p style={{ display: 'flex', fontWeight: 500, fontSize: '35px', margin: '20px 20px 0px 20px', justifyContent: 'space-between' }}>
                    {"Scan Tree"}
                    {/* {editLocalVal === false && <button onClick={() => printQR('/printQr')}>PRINT QR</button>} */}
                </p>
                <p style={{ marginInline: '20px',width:'400px', fontSize: '18px', color: 'black', marginTop: '0px', marginBottom: '0px' }}>Scan this tree then get the value it's set the auto then click the continue button end create tree</p>
                <div className='homePopupMainBox'>
                    <DialogContentText id="alert-dialog-description" style={{paddingTop: '30px'}}>
                        <img src={scaneCodeImage} className='createImageQrCode' />
                        <input type='text' autoFocus value={scannedValue} ref={scanRef} onChange={(text) => setScannedValue(text.target.value)} style={{ width: '2px', position: 'absolute', zIndex: '-1' }} />
                    </DialogContentText>
                    <div>
                        <input type='text' disabled value={scannedValue} onChange={(text) => setScannedValue(text)} className='scaneTreeInputBox' />
                        {scannedValueError && <p style={{ color: 'red', fontSize: '18px', margin: '5px' }}>FIRST SCAN TREE</p>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '25px' }}>
                        <button onClick={handleCloseContiue} className='homePopupContineBtn'>CONTINUE</button>
                    </div>
                </div>

            </Dialog>
            <Dialog
                open={openTree}
                onClose={handleCloseTree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {"SELECT TREE"}
                </DialogTitle>
                <DialogContent style={{ display: 'flex' }}>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => printQR('/printQr')} />
                        <p className='NoteImgTitle'>NEW TREE</p>
                    </div>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={handleClickOpen} />
                        <p className='NoteImgTitle'>ADD TREE</p>
                    </div>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={handleClickOpenEdit} />
                        <p className='NoteImgTitle'>EDIT TREE</p>
                    </div>
                </DialogContent>
            </Dialog>
            <div className='HomeOneMain'>

                <div className='homeSideBar1'>
                    <div className='homeOneSider1TitleMain'>
                        <p className='homeOneSider1Title' onClick={handleClickOpenTree}>Tree</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/addFlask')}>Bind Flask</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/investmentFirst')}>Investment</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/burnOut')}>Burn Out</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/unlock')}>Unlock</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/batchListingGrid')}>Show List</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/batchListing')}>DashBoard</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <img src={proLogo} className='logoImgHomeOne' />
                    </div>
                </div>
                <div className='homeSideBar2'>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Carousel
                            showArrows={false}
                            infiniteLoop={true}
                            showThumbs={false}
                            showStatus={false}
                            autoPlay={true}
                            interval={3000}
                            // showIndicators={false}
                            swipeable={true}
                            emulateTouch={false}
                            className='cao'
                        >
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img src={slider1} className='caurImg' alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>

                                <img src={slider2} alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>

                                <img src={slider3} alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>

                                <img src={slider4} alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>

                                <img src={slider5} alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img src={slider6} alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img src={slider7} alt='banner Images...' />
                            </div>
                        </Carousel>
                    </div>

                    {/* <img src={Logo} className='logoImgHomeOne' /> */}
                </div>
            </div>
            {/* <p className='mainTitle'>PROCASTING</p>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <img src={Logo} className='logoImg' />
                </div>
                <div className='bothBtnDiv'>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={handleClickOpenTree} />
                        <p className='NoteImgTitle'>TREE</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/addFlask')} />
                        <p className='NoteImgTitle'>BIND FLASK</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/investmentFirst')} />
                        <p className='NoteImgTitle'>INVESTMENT</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/burnOut')} />
                        <p className='NoteImgTitle'>BURN OUT</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/unlock')} />
                        <p className='NoteImgTitle'>UNLOCK</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/batchListingGrid')} />
                        <p className='NoteImgTitle'>SHOW LIST</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/batchListing')} />
                        <p className='NoteImgTitle'>DASHBOARD</p>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
