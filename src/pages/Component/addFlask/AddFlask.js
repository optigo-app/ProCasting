import React, { useState } from 'react'
import './AddFlask.css'
import QRCode from 'qrcode.react'
import { useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';

export default function AddFlask() {

    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const [inputErrorMax, setInputErrorMax] = useState(false)
    const navigation = useNavigate();
    const containerStyle = {
        width: '170px',
        display: 'inline-block',
        overflow: 'hidden',
        alignItems: 'center'
    };
    const barcodeValue = '123456789012345678901234';

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGoButtonClick = () => {
        if (enteredValues.length < 2) {
            if (inputValue === '' || inputValue === undefined) {
                setInputError(true)
            } else {
                // alert(enteredValues[0])
                setInputError(false)
                setEnteredValues([...enteredValues, inputValue]);
                setInputValue('');
            }
        } else {
            setInputErrorMax(true)
        }

    };

    const saveData = () => {

        setEnteredValues([])
        setInputErrorMax(false)

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleGoButtonClick();
        }
    };


    console.log(enteredValues);

    return (
        <div>
            <p className='mainTitle' >PROCASTING-TREE BIND WITH FLASK</p>
            <div className='addFLaskMain'>
                <div className='addFlaskQRMAin' >
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
                    {inputErrorMax && <h3 style={{ color: 'red', margin: '0px' }}>First save data..</h3>}

                </div>
                <div className='addFlaskDeatilMain'>
                    <div className='addDeatilMain'>
                        {/* <p className='addFlaskTitle'>Flask ID</p> */}
                        <input type='text' placeholder='Flask ID' value={enteredValues[0]?.length ? enteredValues[0] : ''} className='addflaskInputID' />
                        <input type='text' placeholder='Flask ID' value={enteredValues[1]?.length ? enteredValues[1] : ''} className='addflaskInputID' style={{ marginLeft: '20px' }} />
                    </div>
                    <div className='addDeatilMain'>
                        <input type='text' className='addflaskInput' value={enteredValues[0]?.length ? '2.8' : ''} />
                        <input type='text' className='addflaskInput' value={enteredValues[1]?.length ? '16' : ''} style={{ marginLeft: '20px' }} />
                    </div>
                    <div className='addDeatilMain'>
                        <input type='text' className='addflaskInput' value={enteredValues[0]?.length ? '1000' : ''} />
                        <input type='text' className='addflaskInput' value={enteredValues[1]?.length ? '100 Gram' : ''} style={{ marginLeft: '20px' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <button className='addSaveNewBtn' onClick={saveData} >Save & New</button>
                        {/* onClick={() => navigation('/investmentFirst')} */}
                    </div>
                </div>
            </div>



        </div>
    )
}
