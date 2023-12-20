import React, { useState } from 'react'
import './AddFlask.css'
import QRCode from 'qrcode.react'
import { useNavigate } from 'react-router-dom';

export default function AddFlask() {

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
    return (
        <div>
            <p className='mainTitle' >Tree Bind with Flask</p>
            <div style={{ display: 'flex', margin: '60px', width: '30%', flexDirection: 'column' }}>
                <QRCode value='Scan a QR code' />
                <div style={{ marginTop: '20px' }}>
                    <input type='text' className='enterBrachItemBox' value={inputValue}
                        onChange={handleInputChange} />
                    <button style={{ height: '35px', cursor: 'pointer' }} onClick={handleGoButtonClick}>
                        Go
                    </button>
                </div>
            </div>

            <div className='addDeatilMain'>
                <p className='addFlaskTitle'>Flask ID</p>
                <input type='text' className='addflaskInput' />
            </div>
            <div className='addDeatilMain'>
                <p className='addFlaskTitle'>Diameter</p>
                <input type='text' className='addflaskInput' />
            </div>
            <div className='addDeatilMain'>
                <p className='addFlaskTitle'>capacity</p>
                <input type='text' className='addflaskInput' />
            </div>

            <div style={{ marginLeft: '50px' ,marginTop: '50px'}}>
                <button className='addSaveBtn' onClick={() => navigation('/investmentFirst')}>Save</button>
                <button className='addSaveNewBtn'>Save & New</button>
            </div>
        </div>
    )
}
