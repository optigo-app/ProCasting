import React, { useEffect, useRef, useState } from 'react';
import './BatchListing.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import topLogo from '../../assets/oraillogo.png';
import { useNavigate } from 'react-router-dom';
import { CommonAPI } from '../../../Utils/API/CommonApi';
import { toast } from 'react-toastify';
import CardSkeleton from './BatchListingSkelton';
import BackButton from '../../../Utils/BackButton';
import { Tabs, Tab, Box, Badge } from '@mui/material';
import { useCountdownTimer } from '../../../Utils/TimerHook';

export default function BatchListing() {
    const navigation = useNavigate();
    const [batchList, setBatchList] = useState([]);
    const [burnoutList, setBurnoutList] = useState([]);
    const [investmentList, setInvestmentList] = useState([]);
    const [investmentIssue, setInvestmentIssue] = useState([]);
    const [investmentReturn, setInvestmentReturn] = useState([]);
    const [unlockList, setUnlockList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [subValue, setSubValue] = useState(0);
    const [Completed, setCompleted] = useState(false);
    const [mode, setMode] = useState('');
    const [itemId, setItemId] = useState('');
    const [isBlinking, setIsBlinking] = useState();

    const handleChange = (event, newValue) => {
        setLoading(true);
        setValue(newValue);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    const handleSubChange = (event, newValue) => {
        setSubValue(newValue);
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
                    con: `{"id":"","mode":"TREELIST","appuserid":""}`,
                    p: encodedBodyParam,
                    f: "formname (album)"
                };

                const res = await CommonAPI(body);
                if (res) {
                    const ListData = res?.Data?.rd;
                    const transformedData = ListData?.map(item => ({
                        ...item,
                        ScanBatch: item['Batch#']?.split(' ')[0],
                    }));

                    const sortedData = transformedData.sort((a, b) => {
                        const aHasIssue = a.status.toLowerCase().includes("issue");
                        const bHasIssue = b.status.toLowerCase().includes("issue");
                        return bHasIssue - aHasIssue;
                    });

                    setBatchList(sortedData);

                    const burnout = [];
                    const investment = [];
                    const unlock = [];
                    const issue = [];
                    const returns = [];

                    sortedData.forEach(item => {
                        if (item?.status?.toLowerCase().includes('burnout')) burnout.push(item);
                        if (item?.status?.toLowerCase().includes('investment')) {
                            investment.push(item);
                            item.status.toLowerCase().includes('issue') ? issue.push(item) : returns.push(item);
                        }
                        if (item?.status?.toLowerCase().includes('unlock')) unlock.push(item);
                    });

                    setBurnoutList(burnout);
                    setInvestmentList(investment);
                    setInvestmentIssue(issue);
                    setInvestmentReturn(returns);
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

    console.log(batchList, "kjdkskj");

    function formatDate(date) {
        return new Date(date).toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    }

    console.log('insbds', investmentReturn)

    useEffect(() => {
        if (Completed) {
            if (mode === 'investment') {
                const filterData = investmentList?.find((investment, index) => index === itemId)?.["Batch#"];
                const batchKey = filterData;
                const castuniqueno = batchKey?.split(' ')[1]?.replace(/[()]/g, '');

                // Update investmentList with status change
                const updatedInvestment = investmentList?.map(investment =>
                    investment["Batch#"]?.split(' ')[1]?.replace(/[()]/g, '') === castuniqueno
                        ? { ...investment, status: "Investment Return" }
                        : investment
                );

                const burnout = [];
                const investment = [];
                const unlock = [];
                const issue = [];
                const returns = [];

                updatedInvestment?.forEach(item => {
                    if (item?.status?.toLowerCase().includes('burnout')) burnout.push(item);
                    if (item?.status?.toLowerCase().includes('investment')) {
                        investment.push(item);
                        item.status.toLowerCase().includes('issue') ? issue.push(item) : returns.push(item);
                    }
                    if (item?.status?.toLowerCase().includes('unlock')) unlock.push(item);
                });

                setBurnoutList(burnout);
                setInvestmentList(investment);
                setInvestmentIssue(issue);
                setInvestmentReturn(returns);
                setUnlockList(unlock);
                console.log('updatedInvestment: ', updatedInvestment);
                setInvestmentList(updatedInvestment);

            } else if (mode === 'burnout') {
                const filterData = burnoutList?.find((investment, index) => index === itemId)?.["Batch#"];
                const batchKey = filterData;
                const castuniqueno = batchKey?.split(' ')[1]?.replace(/[()]/g, '');

                // Update burnoutList with status change
                const updatedBurnout = burnoutList?.map(burnout =>
                    burnout["Batch#"]?.split(' ')[1]?.replace(/[()]/g, '') === castuniqueno
                        ? { ...burnout, status: "Burnout Return" }
                        : burnout
                );
                console.log('updatedBurnout: ', updatedBurnout);
                setBurnoutList(updatedBurnout);
            }
        }
    }, [mode, Completed]);

    const TimerComponent = ({ startDate, mode, hours, minutes, seconds, onBlink, indexId, data }) => {

        const { timeLeft, isCompleted } = useCountdownTimer(startDate, mode, hours, minutes, seconds);

        const hasBlinked = useRef(false);
        const hasStateUpdated = useRef(false);

        useEffect(() => {
            if (!isCompleted && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds <= 10 && timeLeft.seconds > 0) {
                if (!hasBlinked.current) {
                    onBlink(indexId);
                    hasBlinked.current = true;
                }
            }

            if (isCompleted && !hasStateUpdated.current) {
                setCompleted(true);
                setMode(mode);
                setItemId(indexId);
                onBlink(null);
                hasStateUpdated.current = true;
            }

            return () => {
                hasBlinked.current = false;
                hasStateUpdated.current = false;
            };
        }, [isCompleted, timeLeft, indexId, mode, investmentList, burnoutList, onBlink, setInvestmentList, setBurnoutList]);

        return (
            <div>
                {!isCompleted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <p className={`${isBlinking === indexId ? 'blink_text' : ''}`} style={{ fontSize: '45px', fontWeight: 600, color: '#de0f3f' }}>
                            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                        </p>
                        <p style={{ fontSize: '15px', fontWeight: 600, width: '100px' }}>Minutes Remaining</p>
                    </div>
                ) : (
                    <div className="card-container">
                        <p className={`${isBlinking === indexId ? 'blink_text' : ''}`} style={{ fontSize: '20px', fontWeight: 600, color: '#de0f3f', marginRight: '5px' }}>
                            {(() => {
                                const issueIds = data.map(item => item?.procasting_process_statusid);
                                const priorityOrder = [3, 4, 6, 7];
                                const matchedId = priorityOrder.find(id => issueIds.includes(id));

                                let message = '';
                                switch (matchedId) {
                                    case 3:
                                        message = 'Waiting for Investment Return';
                                        break;
                                    case 4:
                                        message = 'Waiting for Burnout';
                                        break;
                                    case 6:
                                        message = 'Waiting for Casting Unlock';
                                        break;
                                    case 7:
                                        message = 'Waiting for Quanching';
                                        break;
                                    default:
                                        message = '';
                                }

                                return message ? (
                                    <span style={{ display: 'block', marginBottom: '10px' }}>
                                        {message}
                                    </span>
                                ) : null;
                            })()}
                        </p>
                    </div>
                )}
            </div>


        );
    };

    const renderBatchList = (backgroundColor, data, mode) => {
        console.log('mode: ', mode);
        const Initmfg = JSON.parse(localStorage.getItem('initmfg')) || {};
        let hours = 0,
            minutes = 0,
            seconds = 0;

        if (mode === 'unlock') {
            hours = Initmfg?.alloyingHH || 0;
            minutes = Initmfg?.alloyingMM || 0;
            seconds = Initmfg?.alloyingSS || 0;
        } else if (mode === 'burnout') {
            hours = Initmfg?.burnoutHH || 0;
            minutes = Initmfg?.burnoutMM || 0;
            seconds = Initmfg?.burnoutSS || 0;
        } else if (mode === 'investment') {
            hours = Initmfg?.investmentHH || 0;
            minutes = Initmfg?.investmentMM || 0;
            seconds = Initmfg?.investmentSS || 0;
        }

        const handleBlink = (index) => {
            setIsBlinking(index);
        };


        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {!loading ? (
                    <>
                        {data && data?.map((item, index) => (
                            <div
                                className={`batchLsitBoxMain ${isBlinking === index ? 'blink' : ''}`}
                                key={index}
                                style={{
                                    backgroundColor: backgroundColor,
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                                        <p className={`${isBlinking === index ? 'blink_text' : ''}`} style={{ fontSize: '55px', color: '#5bafe3', fontWeight: 700, margin: '0px' }}>
                                            10
                                        </p>
                                        <p style={{ fontSize: '20px', fontWeight: 600, width: '100px' }}>Minutes Total Time</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <TimerComponent
                                            startDate={mode === 'investment' ? item?.investmentDate : mode === 'burnout' ? item?.burnoutDate : item?.investmentstartdate}
                                            mode={mode}
                                            hours={hours}
                                            minutes={minutes}
                                            seconds={seconds}
                                            onBlink={handleBlink}
                                            indexId={index}
                                            data={data}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p className={`${isBlinking === index ? 'blink_text' : ''}`} style={{ color: '#6257e3', fontWeight: 500, margin: '0px', paddingLeft: '10px', textTransform: 'capitalize' }}>
                                        {item?.status}
                                    </p>
                                    <p className={`${isBlinking === index ? 'blink_text' : ''}`}
                                        style={{
                                            color: item?.procastingstatusid == 1 ? '#39b44c' : 
                                            item?.procastingstatusid == 2 ? '#5427df' : 
                                            item?.procastingstatusid == 3 ? 'orange' : '#ff5757',
                                            fontWeight: 500,
                                            margin: '0px',
                                            paddingRight: '10px',
                                            textTransform: 'capitalize'
                                        }}>
                                        {item?.procastingstatus}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p className={`${isBlinking === index ? 'blink_text' : ''}`} style={{ fontSize: '55px', color: '#ff5757', fontWeight: 700, margin: '0px' }}>
                                            {item?.ScanBatch}
                                        </p>
                                        <p className={`${isBlinking === index ? 'blink_text' : ''}`} style={{ fontSize: '30px', fontWeight: 600, width: '100px', color: '#cb6ce6' }}>
                                            ({item?.flaskbarcode})
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p className={`${isBlinking === index ? 'blink_text' : ''}`} style={{ fontSize: '55px', color: '#9ebd5e', fontWeight: 700, margin: '0px' }}>
                                            {item?.serialjobs}
                                        </p>
                                        <div>
                                            <p className={`${isBlinking === index ? 'blink_text' : ''}`} style={{ padding: '0', margin: '0', fontSize: '20px', fontWeight: 600, color: '#cb6ce6' }}>
                                                ({item?.MetalType}{" "}{item?.MetalColor})
                                            </p>
                                            <p className={`${isBlinking === index ? 'blink_text' : ''}`} style={{ padding: '0', margin: '0', fontSize: '20px', fontWeight: 600, color: '#7d7f85' }}>
                                                ({item?.TreeWt}gm)
                                            </p>
                                        </div>
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
            <div className='topMainHeader'>
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
                <div style={{ marginBlock: '15px' }}>
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
                </div>
            </div>
            <Box sx={{ width: '100%', }}>
                <div role="tabpanel" hidden={value !== 0}>
                    {value === 0 && (
                        <>
                            <Tabs
                                value={subValue}
                                onChange={handleSubChange}
                                centered
                                sx={{
                                    borderRadius: '8px',
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#5bafe3',
                                    },
                                }}
                            >
                                <Tab
                                    label={`Investment Issue (${investmentIssue.length})`}
                                    sx={{
                                        fontWeight: 600,
                                        color: '#7d7f85',
                                        '&.Mui-selected': {
                                            color: '#000',
                                        },
                                    }}
                                />
                                <Tab
                                    label={`Investment Return (${investmentReturn.length})`}
                                    sx={{
                                        fontWeight: 600,
                                        color: '#7d7f85',
                                        '&.Mui-selected': {
                                            color: '#000',
                                        },
                                    }}
                                />
                            </Tabs>


                            {subValue === 0 && renderBatchList('#d1d3d83d', investmentIssue, 'investment')}
                            {subValue === 1 && renderBatchList('#d1d3d83d', investmentReturn, 'investment')}
                        </>
                    )}
                </div>
                <div role="tabpanel" hidden={value !== 1}>
                    {value === 1 && renderBatchList('#ffb06b3d', burnoutList, 'burnout')}
                </div>
                <div role="tabpanel" hidden={value !== 2}>
                    {value === 2 && renderBatchList('#a7d6a552', unlockList, 'unlock')}
                </div>
            </Box>
        </div>
    );
}
