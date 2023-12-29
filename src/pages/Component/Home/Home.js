import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
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
import BarcodeScanner from 'react-barcode-reader';

export default function Home() {

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

    useEffect(() => {
        document.body.style.backgroundColor = 'lightblue';
        return () => {
            document.body.style.backgroundColor = '';
        };

    }, []);

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
            navigation('/createTreeOne')
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
        <div>
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
                <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {"SCAN TREE"} {editLocalVal === false && <button onClick={() => printQR('/printQr')}>PRINT QR</button>}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ width: '300px' }}>
                        <img src={scaneCodeImage} className='createImageQrCode' />
                        <input type='text' autoFocus value={scannedValue} ref={scanRef} onChange={(text) => setScannedValue(text.target.value)} style={{ width: '2px', position: 'absolute', zIndex: '-1' }} />
                    </DialogContentText>
                    <div style={{ display: 'flex' }}>
                        <input type='text' disabled value={scannedValue} onChange={(text) => setScannedValue(text)} className='scaneTreeInputBox' />
                        {scannedValueError && <p style={{ color: 'red', fontSize: '18px', margin: '5px' }}>FIRST SCAN TREE</p>}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContiue}>CONTINUE</Button>
                </DialogActions>
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
                <DialogContent style={{display: 'flex' }}>
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

            <p className='mainTitle'>PROCASTING</p>
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
                        <img src={Note} className='Noteimg' onClick={handleClickOpen} />
                        <p className='NoteImgTitle'>INVESTMENT</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={handleClickOpen} />
                        <p className='NoteImgTitle'>BURN OUT</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={handleClickOpen} />
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
            </div>
        </div>
    )
}
