import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import './CreateTree.css'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function QRScanner() {
    const [scannedResult, setScannedResult] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const navigation = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGoButtonClick = () => {
        setEnteredValues([...enteredValues, inputValue]); // Add the input value to the entered values array
        setInputValue(''); // Clear the input field after adding the value
    };

    const totalValues = enteredValues.length;
    const handleScan = (data) => {
        if (data) {
            setScannedResult(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleRemoveItem = (indexToRemove) => {
        setEnteredValues(enteredValues.filter((_, index) => index !== indexToRemove));
    };

    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            <p className='mainTitle' >Create New Batch</p>
            <div className='Header'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <button className='headerTwoListBtn' onClick={() => navigation('/addFlask')}>New Tree</button>
                    <button className='headerTwoListBtn'>Show List</button>
                </div>
            </div>

            {/* <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <p>Scanned Result: {scannedResult}</p> */}
            <div style={{ display: 'flex', marginTop: '30px' }}>
                <div className='allDataCreteDiv'>
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <div className='createInfoMain'>
                            <p className='infoTextTitle'>Date  :</p>
                            <input type='text' className='infoTextInput' />
                        </div>

                        <div className='createInfoMain'>
                            <p className='infoTextTitle'>Batch  :</p>
                            <input type='text' placeholder='Batch' className='infoTextInput' />
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <div className='createInfoMain'>
                            <p className='infoTextTitle'>Weight  :</p>
                            <input type='text' className='infoTextInput' />
                        </div>

                        <div className='createInfoMain'>
                            <p className='infoTextTitle'>Assign To  :</p>
                            <input type='text' className='infoTextInput' />
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <div className='createInfoMain'>
                            <p className='infoTextTitle'>Metal Color:</p>
                            <input type='text' className='infoTextInput' />
                        </div>
                        <div className='createInfoMain'>
                            <p className='infoTextTitle'>Metal Type :</p>
                            <input type='text' className='infoTextInput' />
                        </div>
                    </div>
                </div>
                <div className='uploadBtnMain'>
                    <input
                        type="file"
                        accept="image/*"
                        capture="camera"
                        onChange={handleImageUpload}
                    />
                    {/* <button className='uploadTreeBtn'>Upload Tree Image</button> */}
                    <button className='printQRbtn'>Print QR</button>
                </div>
            </div>
            <div style={{ display: 'flex',marginTop: '20px' }}>
                <div style={{ display: 'flex', margin: '60px', width: '30%', flexDirection: 'column' }}>
                    <QRCode value='Scan a QR code' />
                    <div style={{ marginTop: '20px' }}>
                        <input type='text' className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} />
                        <button style={{ height: '35px', cursor: 'pointer' }} onClick={handleGoButtonClick}>
                            Go
                        </button>

                    </div>

                    <button className='showInfoBtn'>Show Info</button>

                </div>
                <div className='allScaneDataMain'>
                    <p className='totalItemText'>{totalValues} Item Added</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {enteredValues.map((value, index) => (
                            <ul className='allScanDataUl'>
                                <li className='allScanDataLi' key={index}>{value}</li>
                                <IoMdClose style={{ height: '25px', width: '25px', cursor: 'pointer' }} onClick={() => handleRemoveItem(index)} />
                            </ul>
                        ))}
                    </div>
                </div>
            </div>


            <div style={{ position: 'absolute', bottom: '30px' }}>
                <p className='homeNoteTitle'>Add Sp. Remark</p>
                <p className='homeNoteDesc'>Note*:<b>User Wired or Wireless Barcode/QR scanner,Not Use TAB Camera</b></p>
            </div>
        </div>
    );
}