import React, { useEffect, useRef, useState } from 'react'
import './BurnOut.css'
import { Dialog, DialogTitle, Drawer, Typography } from '@mui/material';
import greenImges from '../../assets/green.png'
import blueImges from '../../assets/1_MODIFIED.png'
// import blueImges from '../../assets/1.png'
import orangeImges from '../../assets/orange.png'
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import BarcodeScanner from 'react-barcode-reader';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import idle from '../../assets/idle.gif'
import topLogo from '../../assets/oraillogo.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonAPI } from '../../../Utils/CommonApi';


export default function BurnOut() {
    const [inputValue, setInputValue] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [greenImg, setGreeImg] = useState(false);
    const [blueImg, setBlueImg] = useState(false);
    const [orangeImg, setOrangImg] = useState(false);
    const [defaultImg, setDefaultImg] = useState(false);
    const [inputError, setInputError] = useState(false)
    const [openYourBagDrawer, setOpenYourBagDrawer] = useState(false);
    const [flashCode, setFlashCode] = useState('');
    const [open, setOpen] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [scanInp, setScanInp] = useState('');
    const invProRef = useRef(null)
    const navigation = useNavigate();
    const [machineVal,setMachineVal]=useState('');
    const [TreeFlaskBindList,setTreeFlaskBindList] = useState();
    const [castingStatus,setCastingStatus] = useState(null)
    const [furnaceId,setFurnaceId] = useState()
    const [burnoutId,setBurnoutId] = useState()
    const [FlaskImg,setFlaskImg]=useState('')

    console.log("FlaskImg",FlaskImg?.length);

    // cosnt 
    let location = useLocation()

    useEffect(()=>{
        let fId = Math.floor(1000 + Math.random() * 9000)
        let bId = Math.floor(1000 + Math.random() * 900)
        setFurnaceId(fId)
        setBurnoutId(bId)
    },[location?.key])
   

    const BurnOutFlaskBind = async() =>{

        let empData = JSON.parse(localStorage.getItem("getemp"))
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 

        let bodyparam = {
            "flaskids": enteredValues?.map((ele)=>ele?.flaskid)?.join(),
            "burnoutid": burnoutId,
            "furnaceid": furnaceId,
            "empid": `${empData?.empid}`,
            "empuserid":`${empData?.empuserid}`,
            "empcode": `${empData?.empcode}`,
            "deviceToken": `${deviceT}`,
            "onesignal_uid": "abc123_onesignal_uid"
        }

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

        let body = {
            "con":`{\"id\":\"\",\"mode\":\"BURNOUTFLASKBIND\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p":`${ecodedbodyparam}`,  
            "f":"formname (BURNOUTFLASKBIND)"
        }

        await CommonAPI(body).then((res)=>
            {
                console.log("BURNOUTFLASKBIND",res)
                if(res){
                    toast.success("Saved Successfully!!")
                }else{
                    toast.error("something went wrong!!")
                }
            }).catch((err)=>console.log("err",err))
    }

    const ValidFlaskForBurnOut = async(flaskid) =>{

        let empData = JSON.parse(localStorage.getItem("getemp"))
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 
      
        let bodyparam = {
          flaskids: `${flaskid}`,
          empid: `${empData?.empid}`,
          empuserid:`${empData?.empuserid}`,
          empcode: `${empData?.empcode}`,
          deviceToken: `${deviceT}`
        }  
      
        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
      
        let body ={
            "con":`{\"id\":\"\",\"mode\":\"VALDNFLASKFORBURNOUT\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p":`${ecodedbodyparam}`,  
            "f":"formname (VALDNFLASKFORBURNOUT)"
        }

        let finalVal;
      
        await CommonAPI(body).then((res)=>{
            if(res){
            console.log("VALDNFLASKFORBURNOUT",res)
            finalVal = res?.Data?.rd[0]
          }
        }).catch((err)=>console.log("err",err))

        return finalVal
      
    }

    const DeleteFlaskFromBurnout = async() =>{

        let empData = JSON.parse(localStorage.getItem("getemp"))
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 

        let bodyparam = {
            burnoutid: "2",
            flaskid: "1",
            empid: `${empData?.empid}`,
            empuserid:`${empData?.empuserid}`,
            empcode: `${empData?.empcode}`,
            deviceToken: `${deviceT}`
        }

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

        let body ={
            "con":`{\"id\":\"\",\"mode\":\"DELFLASKFROMBURNOUT\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p":`${ecodedbodyparam}`,  
            "f":"formname (DELFLASKFROMBURNOUT)"
        }

        await CommonAPI(body).then((res)=>console.log("DELFLASKFROMBURNOUT",res)).catch((err)=>console.log("err",err))
    }

    const getTreeFalskBindList = async() =>{

        let empData = JSON.parse(localStorage.getItem("getemp"))
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 
      
        let bodyparam = {
          "deviceToken": `${deviceT}`
        }
      
        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
      
        let body = {
          "con":`{\"id\":\"\",\"mode\":\"GETTREEFLASKBINDLIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
          "p":`${ecodedbodyparam}`,  
          "f":"formname (album)"
        }
      
        await CommonAPI(body).then((res)=>{
          if(res?.Data.rd?.length){
            setTreeFlaskBindList(res?.Data.rd)
          }
        }).catch((err)=>{
            console.log("err",err) 
        })
      
       }

       useEffect(()=>{
        getTreeFalskBindList();
       },[])

       const GetTreeDataApi = async(castUniqueno) =>{

        // let getDataOfSavedTree =  JSON.parse(localStorage.getItem("SavedTree"))
        // let castuniqueno = getDataOfSavedTree[getDataOfSavedTree?.length -1]
    
        let empData = JSON.parse(localStorage.getItem("getemp"))
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 
        let treeUniqueno = JSON.parse(localStorage.getItem("SavedTree")) 
    
        
    
        let bodyparam = {
         "castuniqueno": `${castUniqueno}`,
         "empid": `${empData?.empid}`,
         "empuserid":`${empData?.empuserid}`,
         "empcode": `${empData?.empcode}`,
         "deviceToken": `${deviceT}`
       }
    
       let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
    
       let body = {
         "con":`{\"id\":\"\",\"mode\":\"GETTREEQR\",\"appuserid\":\"${empData?.empuserid}\"}`,
         "p":`${ecodedbodyparam}`,  
         "f":"formname (album)"
       }   
    
       let treeVal;
    
       if(castUniqueno){
        await CommonAPI(body).then((res)=>{
          if(res?.Data.rd[0].stat == 1){
             //  setQrData(res?.Data.rd[0])
             console.log(res?.Data.rd[0])
    
             if(castingStatus === null){
              setCastingStatus(res?.Data.rd[0]?.procastingstatus)
            }
    
             treeVal = res?.Data.rd[0]
            //  setTreeVal(res?.Data.rd[0])
    
          }
              console.log("resTreeQr",res);
        }).catch((err)=>{
             console.log("err",err) 
        })
       }else{
          toast.error("CastUniqueNo. not Available!!")
       }
    
       return treeVal;
     }

    useEffect(() => {
        if (enteredValues[0] === 'F1') {
            setGreeImg(true)
        } else if (enteredValues[0] === 'F2') {
            setGreeImg(true)

        } else if (enteredValues[0] === 'F3') {
            setGreeImg(true)

        } else if (enteredValues[0] === 'F4') {
            setBlueImg(true)
        } else if (enteredValues[0] === 'F5') {
            setBlueImg(true)

        } else if (enteredValues[0] === 'F6') {
            setBlueImg(true)

        } else if (enteredValues[0] === 'F7') {
            setOrangImg(true)
        } else if (enteredValues[0] === 'F8') {
            setOrangImg(true)
        } else if (enteredValues[0] === 'F9') {
            setOrangImg(true)
        } else {
            setDefaultImg(true)
        }

    }, [enteredValues])

    useEffect(() => {
        if (enteredValues.length === 1) {
            setOpenYourBagDrawer(true)
        }
    }, [enteredValues])

    // useEffect(() => {
    //     // setTimeout(() => {
    //         // if (!openYourBagDrawer && isImageVisible) {
    //             // if (isImageVisible) {
    //                 //     setEnteredValues([...enteredValues, scanInp]);
                    
    //                 //     setFlashCode(scanInp)
    //                 // }
                    
    //                 const scanData = async() =>{
    //                 if (scanInp?.length) {
    //                 let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))

    //                 let FinalFlaskList = flasklist?.filter((ele)=> scanInp == ele?.flaskbarcode)
        
    //                 let investmentVal;
    //                 console.log("scandata",FinalFlaskList);

                    
    //                 if(FinalFlaskList?.length > 0){
    //                     let bindTreeFlask = TreeFlaskBindList?.filter((ele)=>ele?.flaskid == FinalFlaskList[0]?.flaskid)

    //                     if(bindTreeFlask?.length > 0){
        
    //                         if(FlaskImg?.length == 0){
    //                             let resData = await ValidFlaskForBurnOut(FinalFlaskList[0]?.flaskid)
    //                             let initmfg = JSON.parse(localStorage.getItem("initmfg"))
    //                             let ImgPath = `${initmfg?.UploadLogicalPath}${initmfg?.ukey}/procasting/${resData?.flaskimage}`
    //                             // console.log("ImgPath",ImgPath);
    //                             setFlaskImg(ImgPath)
    //                           }
        
    //                         let TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno)
    //                         console.log("TreeData",castingStatus)
                            
    //                         await ValidFlaskForBurnOut(FinalFlaskList[0]?.flaskid)
    //                         investmentVal = {...TreeData,...FinalFlaskList[0],investmentid:bindTreeFlask[0]?.investmentid}
    //                         setFlashCode(scanInp)
    //                         setEnteredValues([...enteredValues, investmentVal]);
    //                     }else{
    //                         toast.error('Flask Invalid!!')
    //                     }
    //                 }
                 
    //             }

    //            // }, 500)
    //     }

    //     scanData();
    // }, [scanInp])

    // setTimeout(() => {
    //     if (scanInp?.length > 0) {
    //         setScanInp('')
    //     }
    // }, 510);

    const handleScan = (data) => {
        setEnteredValues([...enteredValues, data]);
    };

    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handelScanInp = (target) => {
        setScanInp(target)
    }

    const toggleImageVisibility = () => {
        if (invProRef.current) {
            invProRef.current.focus();
        }
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGoButtonClick = async() => {
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))

            let FinalFlaskList = flasklist?.find((ele)=> inputValue == ele?.flaskbarcode)

            let investmentVal;
            
            if(Object.keys(FinalFlaskList)?.length > 0){
                let bindTreeFlask = TreeFlaskBindList?.filter((ele)=>ele?.flaskid == FinalFlaskList?.flaskid)
                if(bindTreeFlask?.length > 0){

                    if(FlaskImg?.length == 0){
                        let resData = await ValidFlaskForBurnOut(FinalFlaskList?.flaskid)
                        let initmfg = JSON.parse(localStorage.getItem("initmfg"))
                        let ImgPath = `${initmfg?.UploadLogicalPath}${initmfg?.ukey}/procasting/${resData?.flaskimage}`
                        // console.log("ImgPath",ImgPath);
                        setFlaskImg(ImgPath)
                      }
                      setFlashCode(inputValue);

                    let TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno)
                    console.log("TreeData",castingStatus)
                    
                    await ValidFlaskForBurnOut(FinalFlaskList?.flaskid)
                    investmentVal = {...TreeData,...FinalFlaskList,investmentid:bindTreeFlask[0]?.investmentid}
                    setEnteredValues([...enteredValues, investmentVal]);
                }else{
                    toast.error('Flask Invalid!!')
                }
            
            // if(castingStatus == TreeData?.procastingstatus){
            // }else{
            // toast.error("Invalid casting Type !!")
            // }

            } else{
            toast.error("not Valid Flask!!")
            }
                setInputValue('');
        }
    };

    const handleGoButtonClickHidden = async() => {
        if (scanInp === '' || scanInp === undefined) {
            setInputError(true)
        } else {
            setInputError(false)
            let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))

            let FinalFlaskList = flasklist?.find((ele)=> scanInp == ele?.flaskbarcode)

            let investmentVal;
            
            if(Object.keys(FinalFlaskList)?.length > 0){
                let bindTreeFlask = TreeFlaskBindList?.filter((ele)=>ele?.flaskid == FinalFlaskList?.flaskid)
                if(bindTreeFlask?.length > 0){

                    if(FlaskImg?.length == 0){
                        let resData = await ValidFlaskForBurnOut(FinalFlaskList?.flaskid)
                        let initmfg = JSON.parse(localStorage.getItem("initmfg"))
                        let ImgPath = `${initmfg?.UploadLogicalPath}${initmfg?.ukey}/procasting/${resData?.flaskimage}`
                        // console.log("ImgPath",ImgPath);
                        setFlaskImg(ImgPath)
                      }
                      setFlashCode(scanInp)

                    let TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno)
                    console.log("TreeData",castingStatus)
                    
                    await ValidFlaskForBurnOut(FinalFlaskList?.flaskid)
                    investmentVal = {...TreeData,...FinalFlaskList,investmentid:bindTreeFlask[0]?.investmentid}
                    setEnteredValues([...enteredValues, investmentVal]);
                }else{
                    toast.error('Flask Invalid!!')
                }
            
            // if(castingStatus == TreeData?.procastingstatus){
            // }else{
            // toast.error("Invalid casting Type !!")
            // }

            } else{
            toast.error("not Valid Flask!!")
            }
                setScanInp('');
        }
    };

    console.log("enteredValues",enteredValues);


    const handleRefresh = () => {
        window.location.reload();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleGoButtonClick();
        }
    };

    const handleKeyDownHidden = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleGoButtonClickHidden();
        }
    };

    const notify = () => toast.success("SAVED SUCCESSFULLY");

    const handleIssueJob = () => {
        if (enteredValues.length === 0) {
            alert('Enetr job first')
        } else {
            // window.location.reload();
            // setTimeout(()=>{
            // },500)
            BurnOutFlaskBind()
            // notify();
            setFlaskImg('')
            setFlashCode('');
            setEnteredValues([]);
            setGreeImg(false);
            setBlueImg(false);
            setOrangImg(false);
            // setOpen(true);
        }
    }

    return (
        <>
        
        <div>
            <BarcodeScanner
                onScan={handleScan}
                onError={handleError}
                facingMode="environment"
            />
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ marginInline: "45px" }}>
                    {"SAVE THE FLASK PROCESS"}
                </DialogTitle>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    <Button onClick={handleClose}>SAVE</Button>
                </div>
            </Dialog>
            <div className="TopBtnDivMainOneV2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <p className='headerV2Title' style={{textTransform:'capitalize'}} >BURNOUT PROCESS - {machineVal}</p> */}
                    <p className='headerV2Title' style={{textTransform:'capitalize'}} >BURNOUT PROCESS</p>
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
            {/* {
                !machineVal.length ?

                 <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                 <div style={{display:'flex',gap:'20px'}}>
                     <button 
                        className="burnOutIssueBtn" 
                        onClick={()=>{
                            setMachineVal('MACHINE 1')
                            localStorage.setItem("machineVal",JSON.stringify('MACHINE 1'))
                        }
                        }
                        >Machine 1</button>
                     <button 
                        className="burnOutIssueBtn" 
                        onClick={()=>{
                            setMachineVal('MACHINE 2')
                            localStorage.setItem("machineVal",JSON.stringify('MACHINE 2'))
                        }
                        }
                        >Machine 2</button>
                     
                 </div>
                 </div>

                 :

                 <> */}
            <div className='burn_main_container' style={{ display: 'flex' }}>
                <div className="left_container" style={{ width: '75%' }}>
                    <div style={{ display: "flex", marginTop: "-10px", justifyContent: 'space-evenly' }}>
                        <div className="BurnTopBox1">
                            <div
                                onClick={toggleImageVisibility}
                                style={{ width: "fit-content", position: "relative" }}
                            >
                                {isImageVisible ? (
                                    <div style={{ marginRight: '60px' }}>
                                        <img src={scaneCodeImage} className="createImageQrCode" />
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img src={idle} />
                                    </div>
                                )}
                                {!isImageVisible && (
                                    <p
                                        style={{
                                            fontWeight: "bold",
                                            margin: "-5px 5px 15px 10px",
                                        }}
                                    >
                                        {" "}
                                        <span style={{ color: "red" }}>Click</span> On The Image
                                        For Scan<span style={{ color: "red" }}>*</span>
                                    </p>
                                )}

                                <input
                                    style={{
                                        width: "12px",
                                        position: "absolute",
                                        left: "80px",
                                        top: "75px",
                                        zIndex: -1,
                                    }}
                                    ref={invProRef}
                                    onBlur={() => {
                                        setIsImageVisible(false);
                                    }}
                                    onFocus={() => setIsImageVisible(true)}
                                    value={scanInp}
                                    onChange={(e) => handelScanInp(e.target.value)}
                                    onKeyDown={handleKeyDownHidden}
                                    autoFocus
                                />
                                <button
                                    style={{
                                        position: "absolute",
                                        left: "85px",
                                        top: "70px",
                                        zIndex: -1,
                                    }}
                                >
                                    c
                                </button>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <input type='text' value={inputValue} style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' onChange={handleInputChange} onKeyDown={handleKeyDown} />
                                <Button className='createGoBtn' style={{ color: 'white', backgroundColor: 'black', borderRadius: '0px' }} onClick={handleGoButtonClick} >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>GO</Typography>
                                </Button>
                            </div>
                            <button
                                style={{
                                    marginTop: "20px",
                                    cursor: "pointer",
                                    height: "35px",
                                    width: "100px",
                                }}
                                onClick={handleRefresh}
                            >
                                Clear All
                            </button>
                        </div>

                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: "30px",
                                    alignItems: "center",
                                }}
                            >
                                <p className="investDestilInputTitle">FLASH CODE:</p>
                                <input
                                    type="text"
                                    className="burnoutInput"
                                    value={flashCode}
                                    // onChange={(e)=>console.log(e.target.value)}
                                />
                            </div>
                            <div className="investDestilInputDiv">
                                <p className="investDestilInputTitle">BATCH NO:</p>
                                <input
                                    type="text"
                                    className="burnoutInput"
                                    value={
                                       enteredValues[enteredValues?.length -1]?.CastBatchNo ?? ""
                                    }
                                />
                            </div>
                            <button className="burnOutIssueBtn" onClick={handleIssueJob}>
                                BurnOut Issue
                            </button>
                        </div>
                        <div
                            style={{
                                width: "19%",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "-40px",
                                marginTop: "30px",
                                alignItems: "center",
                            }}
                        >
                            <p style={{ margin: "0px", fontSize: "20px", fontWeight: 500 }}>
                                Flask Count
                            </p>
                            <h1 className="burnCountFlask">{enteredValues.length}</h1>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h2 className="brunFurnaceId">furnace ID : {furnaceId}</h2>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {enteredValues.map((value, index) => (
                            <table
                                key={index}
                                style={{
                                    backgroundColor:
                                    (value?.procastingstatus=="Wax Setting" && "#b1d8b7") ||
                                    (value?.procastingstatus=="Regular" && "#a396c8") ||
                                    (value?.procastingstatus=="Plastic" && "orange") ||
                                    (value?.procastingstatus=="" && "#add8e6"),
                                    margin: "20px",
                                }}
                            >
                                <tr>
                                    <th className="investTableRow">
                                        Batch No:{value?.CastBatchNo}
                                    </th>
                                </tr>
                                <tr>
                                    <th className="investTableRow">{value?.jobcount} jobs</th>
                                </tr>
                                <tr>
                                    <th className="investTableRow">{value?.TreeWeight}</th>
                                </tr>

                                <tr>
                                    <th className="investTableRow" style={{borderBottom:"none"}}>
                                       {value?.procastingstatus == "" ? "NA" : value?.procastingstatus}
                                    </th>
                                </tr>
                                {/* <tr>
                                <th className='investTableRow'>Flask ID</th>
                            </tr> */}
                            </table>
                        ))}
                    </div>
                </div>
                <div className="investSideFixedImg" style={{visibility:!FlaskImg && 'hidden'}} >
                   {/* {(greenImg || blueImg || orangeImg)
                    && */}
                   <img
                        src={
                            // (greenImg && greenImges) ||
                            // (blueImg && blueImges) ||
                            // (orangeImg && orangeImges)|| undefined
                            FlaskImg
                        }
                        alt={''}
                        //   style={{paddingRight:'10px'}}
                        className="DrawerImg"
                        // style={{display:FlaskImg && 'none'}}
                    />
                    {/* } */}
                </div>
            </div>

            <div
                style={{
                    bottom: "10px",
                    textAlign: "center",
                    width: "100%",
                    color: "#a396c8",
                    fontSize: "18px",
                    fontWeight: 500,

                }}
            >
                {
                    "furnace Program number > #D (Diamond)  |   #W (WAX) |   #R1 Resin1    |    #R2 Resin2"
                }
            </div>
            {/* </>
            } */}
            
        </div>
        
        </>
    );
}
