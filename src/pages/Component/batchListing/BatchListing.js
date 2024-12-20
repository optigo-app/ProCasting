import React, { useEffect, useState } from 'react';
import './BatchListing.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import topLogo from '../../assets/oraillogo.png';
import { useNavigate } from 'react-router-dom';
import { CommonAPI } from '../../../Utils/API/CommonApi';
import { toast } from 'react-toastify';
import CardSkeleton from './BatchListingSkelton';
import BackButton from '../../../Utils/BackButton';
import { Tabs, Tab, Box, Badge } from '@mui/material';

export default function BatchListing() {
    const navigation = useNavigate();
    const [batchList, setBatchList] = useState([]);
    const [burnoutList, setBurnoutList] = useState([]);
    console.log('burnoutList: ', burnoutList);
    const [investmentList, setInvestmentList] = useState([]);
    console.log('investmentList: ', investmentList);
    const [unlockList, setUnlockList] = useState([]);
    console.log('unlockList: ', unlockList);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

                    // Categorize the batches by status
                    const burnout = [];
                    const investment = [];
                    const unlock = [];

                    transformedData.forEach(item => {
                        if (item?.status?.toLowerCase().includes('burnout')) {
                            burnout.push(item);
                        }
                        if (item?.status?.toLowerCase().includes('investment')) {
                            investment.push(item);
                        }
                        if (item?.status?.toLowerCase().includes('unlock')) {
                            unlock.push(item);
                        }
                    });

                    setBurnoutList(burnout);
                    setInvestmentList(investment);
                    setUnlockList(unlock);
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

    const renderBatchList = (backgroundColor, data) => {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                {!loading ? (
                    <>
                        {data?.map((item, index) => (
                            <div className='batchLsitBoxMain' key={index} style={{ backgroundColor }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                                        <p style={{ fontSize: '55px', color: '#5bafe3', fontWeight: 700, margin: '0px' }}>10</p>
                                        <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Total Time</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ fontSize: '55px', color: '#de0f3f', fontWeight: 700, margin: '0px' }}>8</p>
                                        <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Remaining</p>
                                    </div>
                                    <div>
                                        <BsThreeDotsVertical style={{ height: '25px', width: '25px', margin: '10px', cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <p style={{ color: '#6257e3', fontWeight: 500, margin: '0px', paddingLeft: '10px', textTransform: 'capitalize' }}>{item?.status}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ fontSize: '55px', color: '#ff5757', fontWeight: 700, margin: '0px' }}>{item?.ScanBatch}</p>
                                        <p style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>({item?.flaskbarcode})</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p style={{ fontSize: '55px', color: '#9ebd5e', fontWeight: 700, margin: '0px' }}>{item?.Barcode}</p>
                                        <p style={{ fontSize: '20px', margin: '0px', fontWeight: 600, width: '100px', color: '#a9a9a9' }}>(hello)</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className='cardSkeltonCard'>
                        <CardSkeleton />
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className='batchMain'>
            <div className="TopBtnDivMainOneV2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BackButton />
                    <p className='headerV2Title'>PROCASTING-DASHBOARD</p>
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}
                    onClick={() => navigation("/homeone")}
                >
                    <img src={topLogo} style={{ width: "75px" }} />
                    <p style={{ fontSize: "25px", opacity: "0.6", margin: "0px 10px", fontWeight: 500 }}>
                        <span style={{ color: "#00FFFF", opacity: "1" }}>Pro</span>Casting
                    </p>
                </div>
            </div>

            <Box sx={{ width: '100%', margin: '15px 0px' }}>
                {/* Centering the tabs using sx prop */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="batch tabs"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: 'fit-content',
                        margin: '0 auto',
                        backgroundColor: '#f0f0f0',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        '& .MuiTabs-flexContainer': {
                            justifyContent: 'center',
                        },
                        '& .MuiTab-root': {
                            padding: '0',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: '12px',
                            minWidth: '130px',
                            margin: '0px 8px',
                        },
                        '& .MuiTab-root.Mui-selected': {
                            backgroundColor: '#5bafe3',
                            color: 'white',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <Tab
                        label={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ paddingRight: '5px' }}>Investment</p><Badge badgeContent={investmentList?.length} color="primary" sx={{ marginLeft: '8px' }} /></div>}
                        style={{ position: 'relative' }}
                    />
                    <Tab label={<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <p style={{ paddingRight: '5px' }}>Burnout</p><Badge badgeContent={burnoutList?.length} color="primary" sx={{ marginLeft: '8px' }} /></div>} />
                    <Tab label={<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <p style={{ paddingRight: '5px' }}>Unlock</p><Badge badgeContent={unlockList?.length} color="primary" sx={{ marginLeft: '8px' }} /></div>} />
                </Tabs>

                <div role="tabpanel" hidden={value !== 0}>
                    {value === 0 && renderBatchList('#d1d3d83d', investmentList)}
                </div>
                <div role="tabpanel" hidden={value !== 1}>
                    {value === 1 && renderBatchList('#ffb06b3d', burnoutList)}
                </div>
                <div role="tabpanel" hidden={value !== 2}>
                    {value === 2 && renderBatchList('#a7d6a552', unlockList)}
                </div>
            </Box>
        </div>
    );
}
