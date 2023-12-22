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
            <p className='mainTitle'>PROCASTING</p>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <img src={Logo} className='logoImg' />
                </div>
                <div className='bothBtnDiv'>
                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/createTree')} />
                        <p className='NoteImgTitle'>NEW TREE</p>
                    </div>

                    <div className='NoteMain'>
                        <img src={Note} className='Noteimg' onClick={() => navigation('/createTree')} />
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
