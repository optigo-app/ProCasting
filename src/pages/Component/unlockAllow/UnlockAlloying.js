import React, { useCallback, useEffect, useRef, useState } from "react";
import "./UnlockAlloying.css";
import { Dialog, DialogContentText, DialogTitle, Drawer, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import topLogo from '../../assets/oraillogo.png'
import { useNavigate } from "react-router-dom";
import notiSound from "../../sound/Timeout.mpeg";
import Sound from "react-sound";
import { CommonAPI } from "../../../Utils/CommonApi";
import { convertToMilliseconds } from "../../../Utils/globalFunction";



export default function UnlockAlloying() {
  const [inputValue, setInputValue] = useState("");
  const [inputValueHidden, setInputValueHidden] = useState("");
  const [inputValueHiddenPopup, setInputValueHiddenPopup] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [enteredValuesPopup, setEnteredValuesPopup] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [flashCode, setFlashCode] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isImageVisiblePopup, setIsImageVisiblePopup] = useState(true);
  const [shotTableBtn, setShowTableBtn] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [castingStatus,setCastingStatus] = useState(null)

  const [showTimmer, setShowTimmer] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openPoupuNumber, setOpenPopupNumber] = useState();
  const [firtstTableData, setFirstTableData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [thirdTableData, setThirdTableData] = useState([]);
  const [fourthTableData, setFourthTableData] = useState([]);
  const naviagtion = useNavigate();
  const scanRef = useRef(null);
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const [timerCompleted,setTimerCompleted] = useState(false);
  const [TreeFlaskBindList,setTreeFlaskBindList] = useState();

  const [scanInp, setScanInp] = useState('');

  console.log("timerCompleted",timerCompleted);

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

   console.log("enteredValues",enteredValues);

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

   let treeVal={};

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

  const AlloyingUnlock = async() =>{

    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    let bodyparam = {
      "castuniqueno": enteredValues[0]?.CastUniqueno ?? "",
      "flaskid": enteredValues[0]?.flaskid,
      "empid": `${empData?.empid}`,
      "empcode": `${empData?.empcode}`,
      "deviceToken": `${deviceT}`,
      "onesignal_uid": "abc123_onesignal_uid"
  }

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

    let body = {
      "con":`{\"id\":\"\",\"mode\":\"ALLOYINGUNLOCK\",\"appuserid\":\"${empData?.empuserid}\"}`,
      "p":`${ecodedbodyparam}`,  
      "f":"formname (album)"
  }

    await CommonAPI(body).then((res)=>{
      console.log("ALLOYINGUNLOCK",res)
      setShowTableBtn(true)
      toast.success("Successfully Unlocked  !!")
    }).catch((err)=>console.log("err",err))
}

  useEffect(() => {
    if (scanRef.current) {
      scanRef.current.focus();
    }
  }, []);

//   useEffect(() => {


//     const scanData = async() => {
//       if (scanInp?.length) {

//           // setTimeout(() => {
//               // if (!openYourBagDrawer && isImageVisible) {
//               // if (isImageVisible) {
//                   // setEnteredValues([...enteredValues, scanInp]);
  
//                   if(enteredValues?.length < 1){

//                     // setInputError(false);
//                     let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))
              
//                     let FinalFlaskList = flasklist?.filter((ele)=> scanInp == ele?.flaskbarcode)
              
//                     let investmentVal;
                    
//                     if(FinalFlaskList?.length > 0){

//                     let bindTreeFlask = TreeFlaskBindList?.filter((ele)=>ele?.flaskid == FinalFlaskList[0]?.flaskid)

                    
//                     let TreeData;
                    
//                     if(bindTreeFlask?.length > 0){
//                       console.log("scanInp",bindTreeFlask)
//                       TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno)
//                       investmentVal = {...TreeData,...FinalFlaskList[0],investmentid:bindTreeFlask?.investmentid}
//                       setEnteredValues([...enteredValues, investmentVal]);
//                       setScanInp("");
//                     }


//                   }
                  
//                   if(enteredValues?.length === 1 ){
//                     toast.error("First compelete the Unlock process of Flask!!!")
//                   }
//                   // setFlashCode(scanInp)
//               // }
//             }
//           // }, 500)
//       }
//     } 

//     scanData();

// }, [scanInp])

// setTimeout(() => {
//     if (scanInp?.length > 0) {
//         setScanInp('')
//     }
// }, 510);


  useEffect(() => {
    // console.log('inout', inputValueHiddenPopup);
    setTimeout(() => {
      if (inputValueHiddenPopup.length) {
        setEnteredValuesPopup([...enteredValuesPopup, inputValueHiddenPopup]);
      }
    }, 500);
  }, [inputValueHiddenPopup]);



  setTimeout(() => {
    if (inputValueHiddenPopup.length) {
      setInputValueHiddenPopup("");
    }
  }, 510);

  useEffect(() => {
    setEnteredValues([]);
    setEnteredValuesPopup([]);
  }, []);



  const handleScan = (data) => { };

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const toggleImageVisibility = () => {
    if (scanRef.current) {
      scanRef.current.focus();
    }
  };

  const handleClickOpen = () => {

    if (enteredValues?.length == 0) {
      alert('SCANE JOB FIRST')
    } else {
      // setOpen(true);
      AlloyingUnlock();
      
    }

  };

  const handleOpenPopup = (val) => {
    setOpen(true);
    setOpenPopupNumber(val)

  }
  const generateFormattedString = (data) => {
    // return `(${data.map(value => `(${value})`).join(', ')})`;
  };

  // useEffect(()=>{
  //   let updateTable = (firtstTableData || []).map((data, index) => {
  //     if (data && !data.timer) {
  //       return { ...data, timer: <Countdown date={Date.now() + 30000} renderer={renderer} /> };
  //     }
  //     return data;
  //   });
  //   setFirstTableData((prev)=>[...prev,updateTable])
  // },[])

  

  console.log("convertToMilliseconds",enteredValuesPopup?.length);


  const handleAddData = () => {
    if (openPoupuNumber === 1) {
      let CompeletedFlag;
      if(enteredValuesPopup ?.length > 0 ){
        let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
        setFirstTableData((prev) => [
          ...prev,
          { flaskID: enteredValuesPopup, timer },
        ]);
      }

      // setShowTimmer(true);
    }
    else if (openPoupuNumber === 2) {
      let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
      setSecondTableData((prev) => [
        ...prev,
        { flaskID: enteredValuesPopup, timer },
      ]);

      // setShowTimmer(true);
    }
    else if (openPoupuNumber === 3) {
      let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
      setThirdTableData((prev) => [
        ...prev,
        { flaskID: enteredValuesPopup, timer },
      ]);

      // setShowTimmer(true);
    }
    else if (openPoupuNumber === 4) {
      let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
      setFourthTableData((prev) => [
        ...prev,
        { flaskID: enteredValuesPopup, timer },
      ]);

      // setShowTimmer(true);
    }
    setOpen(false);
    setEnteredValuesPopup([]);
  };
  console.log('fistTsbl....', firtstTableData);

  const handleClose = () => {
    setOpen(false);
    setEnteredValuesPopup([])
  };

  const handleInputChange = (event) => {
    
    setInputValue(event.target.value);
    setFlashCode(event.target.value);

  };

  const handelScanInp = (target) => {
    setScanInp(target)
}

  const handleInputChangeHiddenPopup = (event) => {
    setInputValueHiddenPopup(event.target.value);
  };

  const handleGoButtonClick = async() => {
    if (inputValue === "" || inputValue === undefined) {
      setInputError(true);
    } else {
      if(enteredValues?.length < 1){
        setInputError(false);
        let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))
  
        let FinalFlaskList = flasklist?.find((ele)=> inputValue == ele?.flaskbarcode)
  
        let investmentVal;
        
        if(Object.keys(FinalFlaskList)?.length > 0){
            let bindTreeFlask = TreeFlaskBindList?.find((ele)=>ele?.flaskid == FinalFlaskList?.flaskid)
  
        let TreeData = await GetTreeDataApi(bindTreeFlask?.castuniqueno)
  
        investmentVal = {...TreeData,...FinalFlaskList,investmentid:bindTreeFlask?.investmentid}
        setEnteredValues([...enteredValues, investmentVal]);
        setInputValue("");
      }
      
      if(enteredValues?.length === 1 ){
        toast.error("First compelete the Unlock process of Flask!!!")
      }
     
    }
   }
  }
  const handleGoButtonClickHidden = async() => {
    if (scanInp === "" || scanInp === undefined) {
      setInputError(true);
    } else {
      if(enteredValues?.length < 1){
        setInputError(false);
        let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))
  
        let FinalFlaskList = flasklist?.find((ele)=> scanInp == ele?.flaskbarcode)
  
        let investmentVal;
        
        if(Object.keys(FinalFlaskList)?.length > 0){
            let bindTreeFlask = TreeFlaskBindList?.find((ele)=>ele?.flaskid == FinalFlaskList?.flaskid)
  
        let TreeData = await GetTreeDataApi(bindTreeFlask?.castuniqueno)
  
        if(Object.keys(TreeData)?.length > 0){
          investmentVal = {...TreeData,...FinalFlaskList,investmentid:bindTreeFlask?.investmentid}
          setEnteredValues([...enteredValues, investmentVal]);
        }
        setScanInp("");
      }
      
      if(enteredValues?.length === 1 ){
        toast.error("First compelete the Unlock process of Flask!!!")
      }
     
    }
   }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClick();
    }
  };
  const handleKeyDownHidden = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClickHidden();
    }
  };

  const handleConfirmation = () => {
    setEnteredValuesPopup(enteredValuesPopup.filter((_, index) => index !== selectedIndex));
    console.log("indexToRemove",firtstTableData);

    setOpenDelete(false);
  };

  const handleRemoveItem = (indexToRemove) => {
    setOpenDelete(true);
    setSelectedIndex(indexToRemove);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span style={{ textAlign: 'center' ,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:'8px'}}>
          <span style={{ fontWeight: 'bold' }}>{`${seconds}s`}</span>
          <span style={{fontSize:'16px'}}>Remaining</span>
        </span>
      );
    }
  };

  
  const [toastShown, setToastShown] = useState(false);
  const playAudio = () => {
    setPlayStatus(Sound.status.PLAYING);
  
    setTimeout(() => {
      setPlayStatus(Sound.status.STOPPED);
    }, 30000); 
  };
  
  // let TimeNotify = useCallback(() => {
  //   if (!toastShown) {
  //     toast.error("Time is Over!!!!", { theme: "colored" });
  //     setToastShown(true);
  //   }
  //   playAudio();
  // }, [toastShown]);

  let TimeNotify = () => toast.error(`Time is Over!!!!`, { theme: "colored" });

  const Completionist = useCallback(() => {

    TimeNotify();

    const d = new Date();

    let hour =
      d.getHours().toString().length === 1 ? `0${d.getHours()}` : d.getHours();

    let min =
      d.getMinutes().toString().length === 1
        ? `0${d.getMinutes()}`
        : d.getMinutes();

    let sec =
      d.getSeconds().toString().length === 1
        ? `0${d.getSeconds()}`
        : d.getSeconds();

    return <div style={{ textTransform: 'uppercase' }}><span style={{ fontWeight: 'bold' }}>{hour}:{min}:{sec}</span></div>;

  }, []);

  return (
    <div>
      <BarcodeScanner
        onScan={handleScan}
        onError={handleError}
      />
 <Sound
        url={notiSound}
        playStatus={playStatus}
        onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)}
        volume={100}
      />

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ margin: '20px', paddingInline: '100px' }}>
          {"ARE YOU SURE TO DELETE ?"}
        </DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button onClick={handleConfirmation}>YES</Button>
          <Button onClick={handleClickOpenDelete}>NO</Button>
        </div>
      </Dialog>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p style={{ fontSize: '20px', margin: '10px', fontWeight: 500 }}>SCANE FLASK</p>
        <DialogTitle style={{ display: 'flex', height: '400px', width: '500px' }}>
          <div
            onClick={toggleImageVisibility}
            style={{ width: "fit-content", position: "relative", marginLeft: !isImageVisiblePopup && "46px" }}
          >
            {isImageVisiblePopup ? (
              <div>
                <img src={scaneCodeImage} className="createImageQrCode" />
              </div>
            ) : (
              <div>
                <img src={idle} />
              </div>
            )}
            {!isImageVisiblePopup && (
              <p style={{ fontSize: '15px', fontWeight: "bold", marginLeft: "-40px", marginTop: '-10px' }}>
                {" "}
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
              </p>
            )}
            <input
              type="text"
              value={inputValueHiddenPopup}
              onChange={handleInputChangeHiddenPopup}
              style={{
                width: "20px",
                position: "absolute",
                left: "50px",
                top: "70px",
                zIndex: -1,
              }}
              ref={scanRef}
              onBlur={() => {
                setIsImageVisiblePopup(false);
              }}
              onFocus={() => setIsImageVisiblePopup(true)}
              autoFocus
            />
            <button style={{
              position: "absolute",
              left: "50px",
              top: "70px",
              zIndex: -1,
            }}>c</button>
          </div>
          <div style={{ width: '250px', height: '350px', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {enteredValuesPopup?.map((value, index) => (
              <div className="allScanInvestdataMain">
                <p className="allInvestScanData" key={index}>
                  {value}
                </p>
                <RemoveCircleRoundedIcon
                  style={{
                    color: "#FF0000",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            ))}
          </div>
        </DialogTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained"  onClick={handleAddData} style={{ margin: "-20px 0px 20px",backgroundColor:'black',color:'white'}}>
            ADD TO TABLE
          </Button>
        </div>
      </Dialog>
      <div className="TopBtnDivMainOneV2">
        <p className="headerV2Title">
          ALLOYING UNLOCK PROCESS
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => naviagtion('/homeone')}>
          <img src={topLogo} style={{ width: '75px' }} />
          <p style={{ fontSize: '25px', opacity: '0.6', margin: '0px 10px', fontWeight: 500 }}><span style={{ color: '#00FFFF', opacity: '1' }}>Pro</span>Casting</p>
        </div>
      </div>

      {/* <button onClick={handelclick}>{realTime ? "pause" : "start"}</button> */}
      {/* {com ? <div>{Completionist()}</div> : <div>{time}</div>} */}

      <div className="UnlockContainer">
        <div className="UnlockTopBox1">
          <div
            onClick={toggleImageVisibility}
            style={{ width: "fit-content", position: "relative", marginLeft: !isImageVisible ? "46px" : "-60px" }}
          >
            {isImageVisible ? (
              <div>
                <img src={scaneCodeImage} className="createImageQrCode" />
              </div>
            ) : (
              <div>
                <img src={idle} />
              </div>
            )}
            {!isImageVisible && (
              <p style={{ fontWeight: "bold", marginLeft: "-40px", marginTop: '-10px' }}>
                {" "}
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
              </p>
            )}
            <input
              type="text"
              value={scanInp}
              onChange={(e) => handelScanInp(e.target.value)}
              style={{
                width: "20px",
                position: "absolute",
                left: "50px",
                top: "70px",
                zIndex: -1,
              }}
              ref={scanRef}
              onBlur={() => {
                setIsImageVisible(false);
              }}
              onFocus={() => setIsImageVisible(true)}
              onKeyDown={handleKeyDownHidden}
              autoFocus
            />
            <button style={{
              position: "absolute",
              left: "50px",
              top: "70px",
              zIndex: -1,
            }}>c</button>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <input type='text' value={inputValue} style={{ border: inputError && '1px solid red' }} className='enterBrachItemBox' onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <Button className='createGoBtn' style={{ color: 'white', backgroundColor: 'black', borderRadius: '0px' }} onClick={handleGoButtonClick} >
              <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>GO</Typography>
            </Button>
          </div>
        </div>

        <div className="UnlockTopBox2">
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">FLASH CODE:</p>
            <input
              type="text"
              className="unlovcDestilInput"
              value={enteredValues[enteredValues?.length -1]?.flaskbarcode ?? ""}
            // onChange={(e) => setFlashCode(e.target.value)}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">BATCH NO:</p>
            <input
              type="text"
              className="unlovcDestilInput"
              value={enteredValues[enteredValues?.length -1]?.CastBatchNo ?? ""}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className='investDestilInputTitle'>WEIGHT:</p>
            <input type='text' disabled className='unlovcDestilInput' style={{ outline: 'none', backgroundColor: '#eceded' }}
              value={enteredValues[enteredValues?.length -1]?.TreeWeight ?? ""}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">DEPARTMENT:</p>
            <input
              type="text"
              value={enteredValues.length === 0 ? "" : "ALLOYING"}
              className="unlovcDestilInput"
            />
          </div>
          <button className="burnOutIssueBtn" onClick={handleClickOpen}>
            Unlock and Issue
          </button>
        </div>
      </div>
      <div>
        {shotTableBtn && <Button  onClick={() => {
          setShowTable(true)
          setShowTableBtn(false)
        }}
          style={{ marginInline: '2%', marginTop: '10px', width: '200px',backgroundColor:'black',color:'white'}}>

          <Typography sx={{textTransform:'capitalize',fontWeight:'600',fontFamily:'sans-serif',letterSpacing:0.5,backgroundColor:'black',color:'white'}}>Move To Table</Typography>
        </Button>}
        {showTable &&
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

            {firtstTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(1)}>
              <div style={{ display: 'flex', justifyContent: 'space-around', borderBottom: firtstTableData?.length && '1px solid #e1e1e1', paddingBottom: firtstTableData?.length && '5px' }}>
                <p className="unlockTableTitle">TABLE 1</p>
                {firtstTableData?.length !== 0 && timerCompleted &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <p className="unlockTableTitleNum" >{time}</p> */}
                    <p className="unlockTableTitleText">Minutes Remaining</p>
                  </div>
                }
              </div>
                <p className="UnlockformDataTable">
                {firtstTableData?.length !== 0 && firtstTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {firtstTableData.map((data, index) =>
                  {
                    console.log("data",data)
                    return (
                  <div className='tableDataMain' onClick={() => handleOpenPopup(1)}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <p className="unlockTableTitle">TABLE 1</p>
                      
                     <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
                        {data?.timer}
                        {/* {!timerCompleted &&<p className="unlockTableTitleText">Minutes Remaining</p>} */}
                      </div>
                    </div>
                    <hr style={{color:'gray'}}/>
                    <p className="UnlockformDataTable" style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'-5px'}}>
                      {firtstTableData?.length !== 0 && data.flaskID?.join(', ')}
                    </p>
                  </div>
                  )}
                  )}
              </div>
            }

            {/* {secondTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(2)}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <p className="unlockTableTitle">TABLE 2</p>
                {secondTableData?.length !== 0 &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {timerCompleted && <p className="unlockTableTitleText">Minutes Remaining</p>}
                  </div>
                }
              </div>
              <p className="UnlockformDataTable">
                {secondTableData?.length !== 0 && secondTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {secondTableData.map((data, index) =>
                  <div className='tableDataMain' onClick={() => handleOpenPopup(2)}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <p className="unlockTableTitle">TABLE 2</p>
                      <div  style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
                        {data?.timer}

                      </div>
                    </div>
                    <hr style={{color:'gray'}}/>
                    <p className="UnlockformDataTable" style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'-5px'}}>
                      {secondTableData?.length !== 0 && data.flaskID?.join(', ')}
                    </p>
                  </div>)}
              </div>
            } */}

            {/* {thirdTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(3)}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <p className="unlockTableTitle">TABLE 3</p>
                {thirdTableData?.length !== 0 &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="unlockTableTitleNum" >10</p>
                    <p className="unlockTableTitleText">Minutes Remaining</p>
                  </div>
                }
              </div>
              <p className="UnlockformDataTable">
                {thirdTableData?.length !== 0 && thirdTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {thirdTableData.map((data, index) =>
                  <div className='tableDataMain' onClick={() => handleOpenPopup(3)}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <p className="unlockTableTitle">TABLE 3</p>
                      <div  style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
                        {data?.timer}

                      </div>
                    </div>
                    <hr style={{color:'gray'}}/>
                    <p className="UnlockformDataTable" style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'-5px'}}>
                      {thirdTableData?.length !== 0 && data.flaskID?.join(', ')}
                    </p>
                  </div>)}
              </div>
            } */}
                        {/* <p className="unlockTableTitleText">Minutes Remaining</p> */}


            {/* {fourthTableData?.length === 0 ? <div className='tableDataMain' onClick={() => handleOpenPopup(4)}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <p className="unlockTableTitle">TABLE 4</p>
                {fourthTableData?.length !== 0 &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="unlockTableTitleNum" >10</p>
                    <p className="unlockTableTitleText">Minutes Remaining</p>
                  </div>
                }
              </div>
              <p className="UnlockformDataTable">
                {fourthTableData?.length !== 0 && fourthTableData.join(', ')}
              </p>
            </div>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {fourthTableData.map((data, index) =>
                  <div className='tableDataMain' onClick={() => handleOpenPopup(4)}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <p className="unlockTableTitle">TABLE 4</p>
                      <div  style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
                        {data?.timer}

                       
                      </div>
                    </div>
                    <hr style={{color:'gray'}}/>
                    <p className="UnlockformDataTable" style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'-5px'}}>
                      {fourthTableData?.length !== 0 && data.flaskID?.join(', ')}
                    </p>
                  </div>)}
              </div>
            } */}
          </div>
        }
      </div>
    </div>
  );
}
