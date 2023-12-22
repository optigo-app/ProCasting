import React, { useState } from 'react'
import './UnlockAlloying.css'
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';

export default function UnlockAlloying() {


    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const containerStyle = {
        width: '170px',
        display: 'inline-block',
        overflow: 'hidden',
        alignItems: 'center'
    };

    const barcodeValue = '123456789012345678901234';
    const navigation = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGoButtonClick = () => {
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            setEnteredValues([...enteredValues, inputValue]);
            setInputValue('');
        }
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleGoButtonClick();
        }
    };

    return (
        <div>
            <p className='mainTitle' >PROCASTING-ALLOYING UNLOCK PROCESS</p>
            <div style={{ display: 'flex' }}>
                <div className='UnlockTopBox1'>
                    <div style={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
                        <div style={containerStyle}>
                            <Barcode
                                value={barcodeValue}
                                width={2}
                                height={100}
                                fontSize={16}
                                displayValue={false}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '5px' }}>
                        <input type='text' style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} onKeyDown={handleKeyDown} />
                        <button style={{ height: '45px', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                            Go
                        </button>
                    </div>

                </div>
                {/* <div style={{ width: '20%', display: 'flex', flexDirection: 'column', marginRight: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <p className='unlockRight'>0000001</p>
                </div> */}
                <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Flash Code:</p>
                        <input type='text' className='investDestilInput' value={'E0025'} />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Batch No:</p>
                        <input type='text' className='investDestilInput' value={'100E'} />
                    </div>
                    {/* <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Employee:</p>
                        <input type='text' className='investDestilInput' />
                    </div>
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Issue wight:</p>
                        <input type='text' className='investDestilInput' />
                    </div> */}
                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <p className='investDestilInputTitle'>Department:</p>
                        <input type='text' value={'ALLOYING'} className='investDestilInput' />
                        {/* <select className='investDestilInput'>
                            <option>Department1</option>
                            <option>Department2</option>
                            <option>Department3</option>
                            <option>Department4</option>
                        </select> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='burnOutIssueBtn' onClick={() => navigation('/batchListing')}>Unlock and Issue</button>
                    </div>
                </div>

            </div>

            {/* <table style={{ border: '1px solid', backgroundColor: '#add8e6', margin: '20px' }}>
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

            </table> */}
        </div>
    )
}
