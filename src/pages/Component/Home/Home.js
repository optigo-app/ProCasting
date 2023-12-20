import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/oraillogo.png'

export default function Home() {

    const navigation = useNavigate();
    return (
        <div>
            <div>
                <p className='mainTitle' >PROCASTING CREATE NEW BATCH</p>
                <div style={{display : 'flex' , justifyContent : 'center'}}>
                    <img src={Logo} className='logoImg' />
                </div>
                {/* <div className='Header'>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button className='headerShoeListBtn'>Show List</button>
                    </div>
                </div> */}

                <div>
                    {/* <div className='homeQRbtnDiv'>
                </div> */}

                    <div className='bothBtnDiv'>
                        <button className='homeNewTree' onClick={() => navigation('/createTree')}>New Tree</button>
                        <button className='homeEditTree'>Edit </button>
                    <button className='homeORBtn'>Print </button>

                    </div>
                </div>

                {/* <div style={{position: 'absolute' ,bottom: '30px'}}>
                <p className='homeNoteTitle'>Add Sp. Remark</p>
                <p className='homeNoteDesc'>Note*:<b>User Wired or Wireless Barcode/QR scanner,Not Use TAB Camera</b></p>
            </div> */}
            </div>
        </div>
    )
}
