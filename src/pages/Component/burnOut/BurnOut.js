import QRCode from 'qrcode.react'
import React, { useState } from 'react'
import './BurnOut.css'
import { useNavigate } from 'react-router-dom';

export default function BurnOut() {


    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const navigation = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGoButtonClick = () => {
        setEnteredValues([...enteredValues, inputValue]);
        setInputValue('');
    };
    return (
        <div>
            <p className='mainTitle'>PROCASTING-BURNOUT PROCESS</p>
            <div style={{ display: 'flex' }}>
                <div className='BurnTopBox1'>
                    <QRCode value='Scan a QR code' style={{ height: '200px', width: '200px' }}/>
                    <div style={{display:'flex', marginTop: '20px' }}>
                        <input type='text' className='enterBrachItemBox' value={inputValue}
                            onChange={handleInputChange} />
                        <button style={{ height: '47px', width: '50px', fontSize: '20px', fontWeight: 600, cursor: 'pointer' }} onClick={handleGoButtonClick}>
                            Go
                        </button>
                    </div>
                </div>
                <div style={{ width: '20%', display: 'flex', flexDirection: 'column', marginRight: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500 }}>Flask Count</p>
                    <h1 className='burnCountFlask'>1</h1>
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
                        <p className='investDestilInputTitle'>Department:</p>
                        <select className='investDestilInput'>
                            <option>Department1</option>
                            <option>Department2</option>
                            <option>Department3</option>
                            <option>Department4</option>
                        </select>
                        {/* <input type='text' className='investDestilInput' /> */}
                    </div>
                    <button className='burnOutIssueBtn' onClick={() => navigation('/unlock')}>Issue Job</button>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <h2 className='brunFurnaceId'>furnace ID : XXX</h2>
            </div>

            <div style={{display: 'flex'}}>
                <table style={{border:'1px solid', backgroundColor: '#add8e6', margin: '20px' }}>
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
                <table style={{border:'1px solid', backgroundColor: '#add8e6', margin: '20px' }}>
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
        </div>
    )
}
