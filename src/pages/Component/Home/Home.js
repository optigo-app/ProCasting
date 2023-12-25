import React, { useEffect, useState } from 'react'
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
    const [scannedValue, setScannedValue] = useState(undefined);
    const [scannedValueError, setScannedValueError] = useState(false);

    const navigation = useNavigate();

    const handleScan = (data) => {

    };
    
    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handleClose = () => {

        if(scannedValue === undefined || scannedValue === ''){
            setScannedValueError(true)
        }else{
            setScannedValueError(false)
            setScannedValue('AB')
        }
        // setOpen(false);

        // navigation('/createTree')
        // navigation('/createTreeOne')
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    useEffect(() => {
        document.body.style.backgroundColor = 'lightblue';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div >

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
                <DialogTitle id="alert-dialog-title">
                    {"SCAN TREE"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ width: '300px' }}>
                        <img src={scaneCodeImage} className='createImageQrCode' />
                    </DialogContentText>
                    <div style={{display  :'flex'}}>
                        <input type='text' value={scannedValue} onChange={(text) => setScannedValue(text)} className='scaneTreeInputBox'/>
                        {scannedValueError && <p style={{color: 'red' , fontSize : '18px'  ,margin : '5px'}}>FIRST SCAN TREE</p>}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CONTINUE</Button> 
                </DialogActions>
            </Dialog>
            <p className='mainTitle'>PROCASTING</p>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <img src={Logo} className='logoImg' />
                </div>
                <div className='bothBtnDiv'>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={handleClickOpen} />
                        <p className='NoteImgTitle'>NEW TREE</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={handleClickOpen} />
                        <p className='NoteImgTitle'>EDIT TREE</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/addFlask')} />
                        <p className='NoteImgTitle'>BIND FLASK</p>
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
