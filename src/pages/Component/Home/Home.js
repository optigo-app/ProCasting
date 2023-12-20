import React, { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/oraillogo.png'
import Note from '../../assets/note.jpg'

export default function Home() {

    const navigation = useNavigate();
    useEffect(() => {
        document.body.style.backgroundColor = 'lightblue';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div >
            <p className='mainTitle' >PROCASTING CREATE NEW BATCH</p>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <img src={Logo} className='logoImg' />
                </div>
                <div className='bothBtnDiv'>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/createTree')}/>
                        <p className='NoteImgTitle'>NEW THREE</p>
                        {/* <button className='homeNewTree' >New Tree</button> */}
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' />
                        <p className='NoteImgTitle'>Edit THREE</p>
                        {/* <button className='homeNewTree' onClick={() => navigation('/createTree')}>New Tree</button> */}
                    </div>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' />
                        <p className='NoteImgTitle'>SHOW LIST</p>
                        {/* <button className='homeNewTree' onClick={() => navigation('/createTree')}>New Tree</button> */}
  
                    </div>
                    {/* <button className='homeEditTree'>Edit Tree</button>
                    <button className='headerShoeListBtn'>Show List</button> */}
                </div>
            </div>
        </div>
    )
}
