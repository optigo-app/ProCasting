import React, { useState } from 'react'
import './UnlockAlloying.css'
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

export default function UnlockAlloying() {


    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const navigation = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGoButtonClick = () => {
        setEnteredValues([...enteredValues, inputValue]);
        setInputValue('');

    }

    return (
        <div>
            <p className='mainAlloyingTitleIn' >Alloying unlock Process</p>
            <div style={{ display: 'flex' }}>
                <div className='UnlockTopBox1'>
                    <QRCode value='Scan a QR code' />
                    <div style={{ marginTop: '20px' }}>
                        <input type='text' className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} />
                        <button style={{ height: '35px', cursor: 'pointer' }} onClick={handleGoButtonClick}>
                            Go
                        </button>
                    </div>
                </div>
                <div style={{ width: '20%', display: 'flex', flexDirection: 'column', marginRight: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <p className='unlockRight'>0000001</p>
                </div>
                <div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Flash Code:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Batch No:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Employee:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Issue wight:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Department:</p>
                        <select className='investDestilInput'>
                            <option>Department1</option>
                            <option>Department2</option>
                            <option>Department3</option>
                            <option>Department4</option>
                        </select>
                        {/* <input type='text' className='investDestilInput' /> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='burnOutIssueBtn' onClick={() => navigation('/batchListing')}>Unlock and Issue</button>
                    </div>
                </div>

            </div>

            <table style={{ border: '1px solid', backgroundColor: '#add8e6', margin: '20px' }}>
                <tr>
                    <th className='BurnTableRow'>Batch No:AB </th>
                </tr>
                <tr>
                    <th className='burnTdata'>78 Jobs </th>
                </tr>
                <tr>
                    <th className='burnTdata'>150 Grams </th>
                </tr>
                <tr>
                    <th className='burnTdata'>Wax Setting</th>
                </tr>

            </table>
        </div>
    )
}
