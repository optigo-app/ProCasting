import React, { useEffect, useState } from 'react'
import './BatchListing.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import topLogo from '../../assets/oraillogo.png'
import { useNavigate } from 'react-router-dom';
import { CommonAPI } from '../../../Utils/API/CommonApi';
import { toast } from 'react-toastify';
import CardSkeleton from './BatchListingSkelton';
import BackButton from '../../../Utils/BackButton';


export default function BatchListing() {

    const navigation = useNavigate();
    const [batchList, setBatchList] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        document.body.style.backgroundColor = 'white';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
        const fetchBatchData = async () => {
            setLoading(true);
            try {
                const deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;
                const bodyparam = { deviceToken: deviceT };
                const encodedBodyParam = btoa(JSON.stringify(bodyparam));
                const body = {
                    con: `{\"id\":\"\",\"mode\":\"TREELIST\",\"appuserid\":\"\"}`,
                    p: encodedBodyParam,
                    f: "formname (album)"
                };

                const res = await CommonAPI(body);
                if (res) {
                    const ListData = res?.Data?.rd;

                    const transformedData = ListData?.map(item => {
                        const batchKey = item['Batch#'];
                        const scanBatch = batchKey?.split(' ')[0];

                        return {
                            ...item,
                            ScanBatch: scanBatch
                        };
                    });

                    setBatchList(transformedData);
                }
            } catch (err) {
                console.error("GETTREELIST ERROR", err);
                toast.error("Something went wrong, please try again!");
            } finally {
                setLoading(false);
            }
        };
        fetchBatchData();
    }, []);

    console.log('batchList', batchList)

    return (
        <div className='batchMain'>
            <div className="TopBtnDivMainOneV2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BackButton />
                    <p className='headerV2Title' >PROCASTING-DASHBOARD</p>
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}
                    onClick={() => navigation("/homeone")}
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

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {!loading ? (
                    <>
                        {batchList?.map((item, index) => (
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
                                <p style={{ color: '#6257e3', fontWeight: 500, margin: '0px', paddingLeft: '10px', textTransform: 'capitalize' }}>{item?.status}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{
                                            fontSize: '55px',
                                            color: '#ff5757',
                                            fontWeight: 700,
                                            margin: '0px'
                                        }}>{item?.ScanBatch}</p>
                                        <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>({item?.flaskbarcode})</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p style={{
                                            fontSize: '55px',
                                            color: '#9ebd5e',
                                            fontWeight: 700,
                                            margin: '0px'
                                        }}>{item?.Barcode}</p>
                                        <p style={{ fontSize: '20px', margin: '0px', fontWeight: 600, width: '100px', color: '#a9a9a9' }}>(hello)</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) :
                    <div className='cardSkeltonCard'>
                        <CardSkeleton />
                    </div>
                }
            </div>

        </div>
    )
}
