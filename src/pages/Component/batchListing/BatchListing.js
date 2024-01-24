import React, { useEffect } from 'react'
import './BatchListing.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import topLogo from '../../assets/oraillogo.png'
import { useNavigate } from 'react-router-dom';


export default function BatchListing() {

    const navigation = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = 'white';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className='batchMain'>
            <div className="TopBtnDivMainOneV2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className='headerV2Title' >PROCASTING-DASHBOARD</p>
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}
                    onClick={() => navigation("/")}
                >
                    <img src={topLogo} style={{ width: "75px" }} />
                    <p
                        style={{
                            fontSize: "25px",
                            opacity: "0.6",
                            margin: "0px 10px",
                            fontWeight: 500,
                        }}
                    >
                        <span style={{ color: "#00FFFF", opacity: "1" }}>Pro</span>Casting
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                            }}>AB</p>
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
                            }}>BC</p>
                            <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>(F2)</p>
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
                            }}>BC</p>
                            <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>(F2)</p>
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
                            }}>CD</p>
                            <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>(F3)</p>
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
