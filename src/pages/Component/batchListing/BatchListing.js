import React, { useEffect } from 'react'
import './BatchListing.css'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function BatchListing() {

    useEffect(() => {
        document.body.style.backgroundColor = '#6f6f6f';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className='batchMain'>
            <p className='mainAlloyingTitleIn' >Batch Listing</p>

            <div style={{display : 'flex' ,flexWrap: 'wrap' }}>
                <div className='batchLsitBoxMain'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#5bafe3',
                                fontWeight: 700,
                                margin: '0px'
                            }}>10</p>
                            <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Total Time</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#de0f3f',
                                fontWeight: 700,
                                margin: '0px'
                            }}>8</p>
                            <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Remaining</p>
                        </div>
                        <div>
                            <BsThreeDotsVertical style={{ height: '25px', width: '25px', margin: '10px', cursor: 'pointer' }} />
                        </div>
                    </div>
                    <p style={{ color: '#6257e3', fontWeight: 500, margin: '0px' }}>Investment process issue</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#ff5757',
                                fontWeight: 700,
                                margin: '0px'
                            }}>AE</p>
                            <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>(F1)</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#9ebd5e',
                                fontWeight: 700,
                                margin: '0px'
                            }}>E001</p>
                            <p style={{ fontSize: '20px', margin: '0px', fontWeight: 600, width: '100px', color: '#e0f19c' }}>(hello)</p>
                        </div>
                    </div>
                </div>

                <div className='batchLsitBoxMain'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#5bafe3',
                                fontWeight: 700,
                                margin: '0px'
                            }}>10</p>
                            <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Total Time</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#de0f3f',
                                fontWeight: 700,
                                margin: '0px'
                            }}>8</p>
                            <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Remaining</p>
                        </div>
                        <div>
                            <BsThreeDotsVertical style={{ height: '25px', width: '25px', margin: '10px', cursor: 'pointer' }} />
                        </div>
                    </div>
                    <p style={{ color: '#6257e3', fontWeight: 500, margin: '0px' }}>Investment process issue</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#ff5757',
                                fontWeight: 700,
                                margin: '0px'
                            }}>AE</p>
                            <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>(F1)</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#9ebd5e',
                                fontWeight: 700,
                                margin: '0px'
                            }}>E001</p>
                            <p style={{ fontSize: '20px', margin: '0px', fontWeight: 600, width: '100px', color: '#e0f19c' }}>(hello)</p>
                        </div>
                    </div>
                </div>

                <div className='batchLsitBoxMain'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#5bafe3',
                                fontWeight: 700,
                                margin: '0px'
                            }}>10</p>
                            <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Total Time</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#de0f3f',
                                fontWeight: 700,
                                margin: '0px'
                            }}>8</p>
                            <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Remaining</p>
                        </div>
                        <div>
                            <BsThreeDotsVertical style={{ height: '25px', width: '25px', margin: '10px', cursor: 'pointer' }} />
                        </div>
                    </div>
                    <p style={{ color: '#6257e3', fontWeight: 500, margin: '0px' }}>Investment process issue</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#ff5757',
                                fontWeight: 700,
                                margin: '0px'
                            }}>AE</p>
                            <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>(F1)</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{
                                fontSize: '55px',
                                color: '#9ebd5e',
                                fontWeight: 700,
                                margin: '0px'
                            }}>E001</p>
                            <p style={{ fontSize: '20px', margin: '0px', fontWeight: 600, width: '100px', color: '#e0f19c' }}>(hello)</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
