import React, { useEffect, useRef, useState } from 'react'
import './HomeOne.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../assets/oraillogo.png'
import Note from '../../assets/note.jpg'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@mui/material';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import proLogo from '../../assets/proLogo.png'
import BarcodeScanner from 'react-barcode-reader';

import slider6 from '../../assets/slider/Grid.png'
import slider5 from '../../assets/slider/alloying.png'
import slider2 from '../../assets/slider/bindflask.png'
import slider4 from '../../assets/slider/burnout.png'
import slider7 from '../../assets/slider/dashboard.png'
import slider3 from '../../assets/slider/investment.png'
import slider1 from '../../assets/slider/tree.png'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CommonAPI } from '../../../Utils/API/CommonApi'
import { toast } from 'react-toastify'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { CurrentImageApi, CurrentImageState } from '../../recoil/Recoil'
import { fetchTreeGridList } from '../../../Utils/API/TreelistAPI'
import BatchDataJson from '../../../Utils/BatchData.json'
import { fetchBatchList } from '../../../Utils/API/BatchValApi'

const fullScreenStyle = {
    // minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // background: 'yellow',
    background: '#f1f1f1',
    // background: ' linear-gradient(90deg, #b08efe 0%, #a79afe 9%, #a5bffd 100%)',
};


export default function HomeOne() {
    const location = useLocation();
    const navigate = useNavigate();
    const setCurrentImageValue = useSetRecoilState(CurrentImageState);
    const setImageApiUrl = useSetRecoilState(CurrentImageApi);
    const [initMfg, setInitMfg] = useState();
    const [empInfo, setEmpInfo] = useState();
    const [treeList, setTreeList] = useState([]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [openTree, setOpenTree] = useState(false);
    const [scannedValue, setScannedValue] = useState();
    const [scannedValue1, setScannedValue1] = useState();
    const [suggestionValue, setsuggestionValue] = useState(false);
    const [scannedValueError, setScannedValueError] = useState(false);
    const [scannedValueError1, setScannedValueError1] = useState(false);
    const [editLocalVal, setEditLocalVal] = useState(false)
    const scanRef = useRef(null);
    const navigation = useNavigate();
    const setInvestImage = useSetRecoilState(CurrentImageState)

    useEffect(() => {
        if (scanRef.current) {
            scanRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setCurrentImageValue([]);
        setImageApiUrl([]);
        const queryParams = new URLSearchParams(location.search);
        const openModal = queryParams.get('openModal') === 'true';

        if (!openModal) {
            setOpenTree(false);
        } else {
            setOpenTree(true);
        }
    }, [location, navigate]);


    useEffect(() => {
        setInvestImage('')
    }, [])

    // useEffect(() => {
    //     document.body.style.backgroundColor = 'lightblue';
    //     return () => {
    //         document.body.style.backgroundColor = '';
    //     };

    // }, []);

    const handleScan = (data) => {
        setScannedValue(data)
        setScannedValueError(false)
    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handleClickOpen = () => {
        setEditLocalVal(false)
        setOpen1(true);
        localStorage.setItem('EditTreePage', false)
    };

    const handleClickOpenEdit = () => {
        setEditLocalVal(true)
        setOpen(true);
        localStorage.setItem('EditTreePage', true)
    };

    const handleClose = () => {
        setOpen(false);
        setScannedValue('');
        setScannedValueError(false);
    };

    const ValidBatch = async () => {
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken
        let empData = JSON.parse(localStorage.getItem("getemp"))

        let bodyparam = { CastBatchNo: scannedValue1, deviceToken: deviceT }

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

        let body = {
            "con": `{\"id\":\"\",\"mode\":\"VALDTREEBATCH\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (album)"
        }

        await CommonAPI(body).then((res) => {
            if (res?.Data?.rd[0]?.stat === 1) {
                navigation('/createTreeOneV2', { state: { mode: false, CastBatch: scannedValue1?.toUpperCase() } })
            } else {
                toast.error(res?.Data?.rd[0]?.stat_msg)
            }
        })


    };

    // useEffect(() => {
    //     const getTreeQrData = async () => {
    //         try {
    //             const response = await fetchTreeGridList();
    //             if (response?.Data?.rd[0]?.stat !== 0) {

    //                 const ListData = response?.Data?.rd;

    //                 const transformedData = ListData?.map(item => {
    //                     const batchKey = item['Batch#'];
    //                     const scanBatch = batchKey?.split(' ')[0];
    //                     const castuniqueno = batchKey?.split(' ')[1]?.replace(/[()]/g, '');
    //                     const status = item?.status;

    //                     return {
    //                         ScanBatch: scanBatch,
    //                         castuniqueno: castuniqueno,
    //                         status: status,
    //                     };
    //                 });

    //                 setTreeList(transformedData);
    //                 const commaSeparatedValues = transformedData?.map(item => item?.ScanBatch)?.join(', ');

    //                 const filteredCombinations = BatchDataJson?.combinations?.filter(
    //                     combo => !commaSeparatedValues?.includes(combo?.toUpperCase())
    //                 );

    //                 setScannedValue1(filteredCombinations[0])
    //                 // let showSuggestion = [];
    //                 // if (suggestionValue) {
    //                 //     if (scannedValue1) {
    //                 //         showSuggestion = filteredCombinations?.filter(val =>
    //                 //             val.includes(scannedValue1)
    //                 //         )?.slice(0, 5);
    //                 //     }
    //                 //     if (scannedValue1)
    //                 //         setTreeList(showSuggestion);
    //                 // }
    //             } else {
    //                 setTreeList([]);
    //             }
    //         } catch (error) {
    //             console.error("Error:", error);
    //         }
    //     };
    //     getTreeQrData();
    // }, [scannedValue1])


    useEffect(() => {
        const getTreeQrData = async () => {
            try {
                const master = sessionStorage?.getItem('gridMaster')
                const masterdata = JSON?.parse(master)?.Data?.rd2;
                console.log('masterdata: ', masterdata);
                const response = await fetchBatchList();
                if (response?.Data?.rd[0]?.stat !== 0) {

                    const ListData = response?.Data?.rd;

                    const transformedData = ListData?.map(item => {
                        const scanBatch = item?.CastBatchNo;
                        const castuniqueno = item?.CastUniqueno;
                        const status = masterdata?.find(procastingid => procastingid?.id === item?.procasting_process_statusid)?.procasting_process_statusname || '';
                        return {
                            ScanBatch: scanBatch,
                            castuniqueno: castuniqueno,
                            status: status,
                        };
                    });

                    console.log('transformedData: ', transformedData);
                    setTreeList(transformedData);
                    const commaSeparatedValues = transformedData?.map(item => item?.ScanBatch)?.join(', ');

                    const filteredCombinations = BatchDataJson?.combinations?.filter(
                        combo => !commaSeparatedValues?.includes(combo?.toUpperCase())
                    );

                    setScannedValue1(filteredCombinations[0])
                } else {
                    setTreeList([]);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getTreeQrData();
    }, [scannedValue1])


    const handleSuggestionClick = (suggestion) => {
        setScannedValue1(suggestion);
        setTreeList([]);
        setsuggestionValue(true)
    };


    const handleCloseContiue1 = (e) => {
        if (e.key === 'Enter') {
            if (scannedValue1 === undefined || scannedValue1 === '') {
                setScannedValueError1(true)
            } else {
                setScannedValueError1(false)
                // setScannedValue('AB')
                ValidBatch()
                // navigation('/createTreeOneV2',{state:{mode:false,CastBatch:scannedValue1?.toUpperCase()}})
                // navigation(editTree === false ? '/createTreeOne' : '/createTreeOne', { state: { editTree: editTree ? 'true' : 'false' } })
            }
        }
    }

    const handleCloseContiue11 = () => {
        if (scannedValue1 === undefined || scannedValue1 === '') {
            setScannedValueError1(true)
        } else {
            setScannedValueError1(false)
            // setScannedValue('AB')
            ValidBatch()
            // navigation('/createTreeOneV2',{state:{mode:false,CastBatch:scannedValue1?.toUpperCase()}})
            // navigation(editTree === false ? '/createTreeOne' : '/createTreeOne', { state: { editTree: editTree ? 'true' : 'false' } })
        }
    }

    const handleCloseContiueedit = (e) => {
        debugger
        if (e.key === 'Enter') {
            if (scannedValue === undefined || scannedValue === '') {
                setScannedValueError(true)
            } else {
                treeList?.map((item) => {
                    if (item?.castuniqueno == scannedValue) {
                        if ((item?.status)?.toLowerCase() !== 'process in casting') {
                            return toast.error("This Batch is already Processed");
                        }
                        setScannedValueError(false)
                        navigation('/createTreeOneV2', { state: { mode: true, CastBatch: scannedValue?.toUpperCase() } })
                    }
                })
                // setScannedValueError(false)
                // // setScannedValue('AB')
                // navigation('/createTreeOneV2', { state: { mode: true, CastBatch: scannedValue?.toUpperCase() } })
                // // navigation(editTree === false ? '/createTreeOne' : '/createTreeOne', { state: { editTree: editTree ? 'true' : 'false' } })
            }
        }
    }

    const handleCloseContiueedit1 = (e) => {
        debugger
        if (scannedValue === undefined || scannedValue === '') {
            setScannedValueError(true)
        } else {
            treeList?.map((item) => {
                if (item?.castuniqueno == scannedValue) {
                    if ((item?.status)?.toLowerCase() !== 'process in casting') {
                        return toast.error("This Batch is already Processed");
                    }
                    setScannedValueError(false)
                    navigation('/createTreeOneV2', { state: { mode: true, CastBatch: scannedValue?.toUpperCase() } })
                }
            })
            // setScannedValueError(false)
            // // setScannedValue('AB')
            // navigation('/createTreeOneV2', { state: { mode: true, CastBatch: scannedValue?.toUpperCase() } })
            // // navigation(editTree === false ? '/createTreeOne' : '/createTreeOne', { state: { editTree: editTree ? 'true' : 'false' } })
        }

    }

    const printQR = (url) => {
        window.open(url)
    }

    const handleClickOpenTree = () => {
        setOpenTree(true);
    };

    const handleCloseTree = () => {
        setOpenTree(false);
        navigate('/homeone', { replace: true });
    };

    useEffect(() => {

        const GET_EMP_PROCASTINGSTAUS = async (mode) => {

            let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

            let bodyparam = { "deviceToken": `${deviceT}` }

            let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

            let body = {
                "con": `{\"id\":\"\",\"mode\":\"${mode}\",\"appuserid\":\"\"}`,
                "p": `${ecodedbodyparam}`,
                "f": "formname (album)"
            }

            await CommonAPI(body).then((res) => {
                if (res) {
                    if (mode === "GETEMP") {
                        localStorage.setItem("getemp", JSON.stringify(res?.Data?.rd[0]))
                        setEmpInfo(res?.Data?.rd[0])
                    }
                    if (mode === "GETPROCASTINGSTAUS") {
                        localStorage.setItem("getprocastingstatus", JSON.stringify(res?.Data?.rd))
                    }
                    // if(mode === "TREELIST"){
                    //     localStorage.setItem("treelist",JSON.stringify(res?.Data?.rd))
                    // }
                }
            }).catch((err) => console.log("GET_EMP_PROCASTINGSTAUS_CASTJOBLIST", err))

        }

        GET_EMP_PROCASTINGSTAUS("GETEMP")
        GET_EMP_PROCASTINGSTAUS("GETPROCASTINGSTAUS")

    }, [])

    // logic to user permision wise page access
    // const pages = [
    //     { id: 2, pagename: "Bind Flask" },
    //     { id: 3, pagename: "Investment" },
    //     { id: 4, pagename: "Burn Out" },
    //     { id: 7, pagename: "Show List" }
    // ];

    // const allTitles = [
    //     { title: "Tree", onClick: handleClickOpenTree },
    //     { title: "Bind Flask", onClick: () => navigation('/addFlask') },
    //     { title: "Investment", onClick: () => navigation('/investmentFirst') },
    //     { title: "Burn Out", onClick: () => navigation('/burnOut') },
    //     { title: "Unlock", onClick: () => navigation('/unlock') },
    //     { title: "Show List", onClick: () => navigation('/batchListingGrid') },
    //     { title: "DashBoard", onClick: () => navigation('/batchListing') }
    // ];

    // const filteredTitles = allTitles.filter(titleObj =>
    //     pages.some(page => page.pagename === titleObj.title)
    // );

    return (
        <div>
            <BarcodeScanner
                onScan={handleScan}
                onError={handleError}
            />
            <Dialog
                open={open1}
                onClose={() => setOpen1(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='scanTreeDilogMain'

            >
                <p style={{ display: 'flex', fontWeight: 500, fontSize: '35px', margin: '20px 20px 0px 20px', justifyContent: 'space-between' }}>
                    {"Add Tree"}
                    {/* {editLocalVal === false && <button onClick={() => printQR('/printQr')}>PRINT QR</button>} */}
                </p>
                <p style={{ marginInline: '20px', width: '400px', fontSize: '18px', color: 'black', marginTop: '0px', marginBottom: '0px' }}>Click 'Continue' to complete the tree setup.</p>
                <div className='homePopupMainBox1'>
                    {/* <DialogContentText id="alert-dialog-description" style={{ paddingTop: '30px' }}>
                        <img src={scaneCodeImage} className='createImageQrCode' />
                        <input type='text' autoFocus value={scannedValue} ref={scanRef} onChange={(text) => setScannedValue(text.target.value)} onKeyDown={handleCloseContiue1} style={{ width: '2px', position: 'absolute', zIndex: '-1' }} />
                    </DialogContentText> */}
                    {/* <div>
                        <input type='text'
                            value={scannedValue1}
                            autoFocus    
                            onChange={(e) => setScannedValue1(e.target.value)}
                            onKeyDown={handleCloseContiue1}
                            className='scaneTreeInputBox1' />
                        {scannedValueError1 && <p style={{ color: 'red', fontSize: '18px', margin: '5px' }}>FIRST SCAN TREE</p>}
                    </div> */}
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={scannedValue1}
                            autoFocus
                            onChange={(e) => setScannedValue1(e.target.value)}
                            onKeyDown={handleCloseContiue1}
                            className='scaneTreeInputBox1'
                            disabled
                        />
                        {scannedValueError1 && <p style={{ color: 'red', fontSize: '18px', margin: '5px' }}>FIRST SCAN TREE</p>}
                        {/* {treeList?.length > 0 && (
                            <ul style={{
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                margin: 0,
                                padding: '0',
                                position: 'absolute',
                                backgroundColor: '#fff',
                                width: '100%',
                                listStyleType: 'none',
                                zIndex: 1000
                            }}>
                                {treeList?.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        style={{
                                            padding: '3px 8px',
                                            cursor: 'pointer',
                                            backgroundColor: '#fff',
                                            borderBottom: '1px solid #ccc',
                                            textTransform: 'uppercase'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )} */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={handleCloseContiue11} className='homePopupContineBtn'>CONTINUE</button>
                    </div>
                </div>

            </Dialog>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='scanTreeDilogMain'

            >
                <p style={{ display: 'flex', fontWeight: 500, fontSize: '35px', margin: '20px 20px 0px 20px', justifyContent: 'space-between' }}>
                    {"Scan Tree"}
                    {/* {editLocalVal === false && <button onClick={() => printQR('/printQr')}>PRINT QR</button>} */}
                </p>
                <p style={{ marginInline: '20px', width: '400px', fontSize: '18px', color: 'black', marginTop: '0px', marginBottom: '0px' }}>Scan this tree then get the value it's set the auto then click the continue button end create tree</p>
                <div className='homePopupMainBox'>
                    <DialogContentText id="alert-dialog-description" style={{ paddingTop: '30px' }}>
                        <img src={scaneCodeImage} className='createImageQrCode' />
                        <input type='text' autoFocus value={scannedValue} ref={scanRef} onChange={(text) => setScannedValue(text.target.value)} onKeyDown={handleCloseContiueedit} style={{ width: '2px', position: 'absolute', zIndex: '-1' }} />
                    </DialogContentText>
                    <div>
                        <input type='text' disabled value={scannedValue} onChange={(text) => setScannedValue(text)} className='scaneTreeInputBox' />
                        {scannedValueError && <p style={{ color: 'red', fontSize: '18px', margin: '5px' }}>FIRST SCAN TREE</p>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '25px' }}>
                        <button onClick={handleCloseContiueedit1} className='homePopupContineBtn'>CONTINUE</button>
                    </div>
                </div>

            </Dialog>
            <Dialog
                open={openTree}
                onClose={handleCloseTree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ backgroundColor: 'white' }}>

                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {"SELECT TREE"}
                    </DialogTitle>
                    <DialogContent style={{ display: 'flex' }}>
                        {/* <div className='NoteMain'>
                            <img src={Note} className='Noteimg' onClick={() => printQR('/printQr')} />
                            <p className='NoteImgTitle'>NEW TREE</p>
                        </div> */}
                        <div className='NoteMain'>
                            <img src={Note} className='Noteimg' onClick={handleClickOpen} />
                            <p className='NoteImgTitle'>ADD TREE</p>
                        </div>
                        <div className='NoteMain'>
                            <img src={Note} className='Noteimg' onClick={handleClickOpenEdit} />
                            <p className='NoteImgTitle'>EDIT TREE</p>
                        </div>
                    </DialogContent>
                </div>

            </Dialog>
            <div className='HomeOneMain'>

                <div className='homeSideBar1'>
                    <div className='homeOneSider1TitleMain'>
                        {/* {filteredTitles.map((item, index) => (
                            <p key={index} className='homeOneSider1Title' onClick={item.onClick}>
                                {item.title}
                            </p>
                        ))} */}
                        <p className='homeOneSider1Title' onClick={handleClickOpenTree}>Tree</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/addFlask')}>Bind Flask</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/investmentFirst')}>Investment</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/burnOut')}>Burn Out</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/unlock')}>Unlock</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/batchListingGrid')}>Show List</p>
                        <p className='homeOneSider1Title' onClick={() => navigation('/batchListing')}>DashBoard</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <img src={proLogo} className='logoImgHomeOne' />
                    </div>
                </div>
                <div className='homeSideBar2'>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Carousel
                            showArrows={false}
                            infiniteLoop={true}
                            showThumbs={false}
                            showStatus={false}
                            autoPlay={true}
                            interval={3000}
                            // showIndicators={false}
                            swipeable={true}
                            emulateTouch={false}
                            className='cao'
                        >
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img src={slider1} className='caurImg' alt='banner Images...' priority />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img src={slider2} className='caurImg' alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>

                                <img src={slider3} className='caurImg' alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>

                                <img src={slider4} className='caurImg' alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>

                                <img src={slider5} className='caurImg' alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img src={slider6} className='caurImg' alt='banner Images...' />
                            </div>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img src={slider7} className='caurImg' alt='banner Images...' />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}
