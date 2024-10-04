import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./InvestMentFirst.css";
import { Button, Dialog, DialogTitle, Drawer, Typography } from "@mui/material";
import greenImges from "../../assets/green.png";
// import blueImges from "../../assets/blue.png";
// import blueImges from "../../assets/1.png";
import blueImges from "../../assets/1_MODIFIED.png";
import orangeImges from "../../assets/orange.png";
import { IoMdClose } from "react-icons/io";
import Countdown from "react-countdown";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadcloud from "../../assets/uploadCloud.png";
import { useRecoilValue } from "recoil";
import { CurrentImageState } from "../../recoil/Recoil";
import ImageWebCam from "../imageTag/ImageWebCam";
import topLogo from "../../assets/oraillogo.png";
import { useNavigate } from "react-router-dom";
import notiSound from "../../sound/Timeout.mpeg";
import Sound from "react-sound";
import { CommonAPI } from "../../../Utils/CommonApi";
import { TotalTime, convertToMilliseconds } from "../../../Utils/globalFunction";

export default function InvestMentFirst() {
  const [inputValue, setInputValue] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeOut, setTiemOut] = useState(undefined);
  const [inputError, setInputError] = useState(false);
  const [openYourBagDrawer, setOpenYourBagDrawer] = useState(false);
  const [greenImg, setGreeImg] = useState(false);
  const [blueImg, setBlueImg] = useState(false);
  const [orangeImg, setOrangImg] = useState(false);
  const [defaultImg, setDefaultImg] = useState(false);
  const CurrentImageValue = useRecoilValue(CurrentImageState);
  const [weight, setWeight] = useState(false);
  const [TDS, setTDS] = useState(undefined);
  const [phValue, setPhValue] = useState(undefined);
  const [showTimmerBtn, setShowTimmerBtn] = useState(false);
  const [showTimmer, setShowTimmer] = useState(false);
  const [scanInp, setScanInp] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [enteredTime, setEnteredTime] = useState("");
  const [eviIndex, setEviIndex] = useState([]);
  const [weightInp, setWeightInp] = useState("");
  const [saveData, setSaveData] = useState(false);
  const [goBtnFlag, setGoBtnFlag] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isImgUpload, setIsImgUpload] = useState(false);
  const [isImgShow, setIsImgShow] = useState(false);
  const [fileBase64, setFileBase64] = useState("");
  const [waterWeight, setWaterWeight] = useState("");
  const [waterTemp, setWaterTemp] = useState("");
  const [glossFlag, setGlossFlag] = useState(false);
  const [investTime, setInvestTime] = useState();
  const [TreeVal, setTreeVal] = useState();
  const [TreeFlaskBindList,setTreeFlaskBindList] = useState();
  const [InvestApiTime,setInvestApiTime] = useState({startTime:"",endTime:""})
  const [castingStatus,setCastingStatus] = useState(null)
  const [FlaskImg,setFlaskImg] = useState('');
  const [FlaskinvestId,setFlaskInvestId] = useState();
  // const [countDownTime,setCountDownTime] = useState()
  const [isCompleted, setIsCompleted] = useState(false);

  const staticMilliseconds = 3000; // Static value for 7 minutes (in milliseconds)
  const [timeLeft, setTimeLeft] = useState(staticMilliseconds); // Set initial time
  const [isActive, setIsActive] = useState(false); // Start or stop the timer

  useEffect(() => {
    let timerInterval = null;
  
    if (isActive && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000); // Decrease time by 1 second
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(timerInterval);
      // Check if the timer is still active and hasn't shown the toast before
      if (isActive) {
        toast.success("Your Time is over");
        setIsActive(false); // Disable active state after toast runs
      }
    }
  
    return () => clearInterval(timerInterval); // Cleanup interval on component unmount
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setIsActive(true); // Activate the timer
    setShowTimmer(true)
  };

  const onComplete = useCallback(() => {
    setIsCompleted(true); // Update state to trigger re-render
    console.log('Countdown completed!');
    // Add any other logic you want to execute when the countdown finishes
  },[])

  console.log("FlaskImg",FlaskImg)

  // useEffect(()=>{
  //   setCountDownTime(Date.now() + convertToMilliseconds("invest"))
  // },[])

  const invProRef = useRef(null);
  const fileInputRef = useRef(null);
  const naviagtion = useNavigate();

  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);

  // useEffect(()=>{
  //   if(fetchFlag === true){
  //     let data = JSON.parse(localStorage.getItem("InvestTimer"))
  //     setInvestTime(data);
  //   }
  //   },[fetchFlag])

  // console.log("enteredValueseviIndex", eviIndex)

  const handleStartTimeDate = () => {
    const currentStartTime = new Date().toLocaleTimeString();
    setInvestApiTime((prevState) => ({
      ...prevState,
      startTime: currentStartTime
    }));
  };



  const handleEndTimeDate = () => {
    const currentEndTime = new Date().toLocaleTimeString();
    setInvestApiTime((prevState) => ({
      ...prevState,
      endTime: currentEndTime
    }));
  };

  const GetTreeDataApi = async(castUniqueno) =>{

    // let getDataOfSavedTree =  JSON.parse(localStorage.getItem("SavedTree"))
    // let castuniqueno = getDataOfSavedTree[getDataOfSavedTree?.length -1]

    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 
    let treeUniqueno = JSON.parse(localStorage.getItem("SavedTree")) 

    let uniquenotree;

    if(treeUniqueno){
      uniquenotree = treeUniqueno[0]?.CastUniqueno
    }

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
         setTreeVal(res?.Data.rd[0])

      }
          console.log("resTreeQr",res);
    }).catch((err)=>{
         console.log("err",err) 
    })
   }
  else{
      toast.error("CastUniqueNo. not Available!!")
   }

   return treeVal;
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

 const InvestFlaskBind = async() =>{
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 

    let bodyparam = {
      flaskids:enteredValues.map(ele=>ele?.flaskid).join(),
      investmentid: ([...new Set(enteredValues.map(ele=>ele?.investmentid))]).join(','),
      powderwt:`${weightInp}`,
      waterwt:`${waterWeight}`,
      watertemp: `${waterTemp}`,
      tds: `${TDS}`,
      phvalue:`${phValue}`,
      empid: `${empData?.empid}`,
      empuserid:`${empData?.empuserid}`,
      empcode: `${empData?.empcode}`,
      deviceToken: `${deviceT}`
   }

   let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

   let body = {
    "con":`{\"id\":\"\",\"mode\":\"INVESTFLASKBIND\",\"appuserid\":\"${empData?.empuserid}\"}`,
    "p":`${ecodedbodyparam}`,  
    "f":"formname (INVESTFLASKBIND)"
   }

   await CommonAPI(body).then((res)=>{
    if(res){
      let invevstid= res?.Data?.rd[0]?.investmentid
      setFlaskInvestId(invevstid)
      handleStartTimeDate()

    }
   }
  ).catch((err)=>console.log("err",err))


 } 

 const ValidFlaskForInvest = async(flaskid) =>{
  let empData = JSON.parse(localStorage.getItem("getemp"))
  let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 

  let bodyparam = {
    // flaskids:enteredValues.map(ele=>ele?.flaskid).join(),
    flaskids:`${flaskid}`,
    empid: `${empData?.empid}`,
    empuserid:`${empData?.empuserid}`,
    empcode: `${empData?.empcode}`,
    deviceToken: `${deviceT}`
 }

 let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

  let body = {
  "con":`{\"id\":\"\",\"mode\":\"VALDNFLASKFORINVEST\",\"appuserid\":\"${empData?.empuserid}\"}`,
  "p":`${ecodedbodyparam}`,  
  "f":"formname (VALDNFLASKFORINVEST)"
  }

  let finalVal;

  await CommonAPI(body).then((res)=>{
    if(res){
      console.log("VALDNFLASKFORINVEST",res)
      finalVal = res?.Data?.rd[0]
    }
  }).catch((err)=>console.log("err",err))

  return finalVal
 }


 const InvestInfoSave = async() =>{
  let empData = JSON.parse(localStorage.getItem("getemp"))
  let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 

  let bodyparam = {
    investmentid: FlaskinvestId ?? 0,
    investmentstartdate: InvestApiTime?.startTime,
    investmentenddate: InvestApiTime?.endTime,
    investmentphoto: fileBase64,
    empid: `${empData?.empid}`,
    empuserid:`${empData?.empuserid}`,
    empcode: `${empData?.empcode}`,
    deviceToken: `${deviceT}`
  }

 let ecodedbodyparam = btoa(JSON.stringify(bodyparam))


  let body ={
    "con":`{\"id\":\"\",\"mode\":\"INVESTINFOSAVE\",\"appuserid\":\"${empData?.empuserid}\"}`,
    "p":`${ecodedbodyparam}`,  
    "f":"formname (album)"
  }


 await CommonAPI(body).then((res)=>{
  if(res){
    handleEndTimeDate()
    toast.success("Invest Info Save!!")
    naviagtion("/homeone")
  }
 }
).catch((err)=>{
  console.log("err",err)
  toast.error("Error!!")
})

 }

 useEffect(()=>{
   if(CurrentImageValue){
    InvestInfoSave()
    toast.success("Photo upload!!")
   }
 },[CurrentImageValue])


 const DeleteFlaskForInvest = async(flaskid) =>{

  let empData = JSON.parse(localStorage.getItem("getemp"))
  let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 

  let bodyparam = {
    investmentid: ([...new Set(enteredValues.map(ele=>ele?.investmentid))]).join(','),
    flaskids: `${flaskid}`,
    empid: `${empData?.empid}`,
    empuserid:`${empData?.empuserid}`,
    empcode: `${empData?.empcode}`,
    deviceToken: `${deviceT}`
  }  

  let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

  let body ={
    "con":`{\"id\":\"\",\"mode\":\"DELFLASKFROMINVEST\",\"appuserid\":\"${empData?.empuserid}\"}`,
    "p":`${ecodedbodyparam}`,  
    "f":"formname (album)"
  }

  await CommonAPI(body).then((res)=>console.log("DELFLASKFROMINVEST",res)).catch((err)=>console.log("err",err))

 }

 useEffect(()=>{
//   GetTreeDataApi()
  getTreeFalskBindList()
 },[])

  useEffect(() => {
    // if (greenImg) {
    //   setWeightInp("3000");
    //   setWaterWeight("2100");
    // }
    // if (blueImg) {
    //   setWeightInp("3000");
    //   setWaterWeight("2100");
    // }
    // if (orangeImg) {
    //   setWeightInp("3000");
    //   setWaterWeight("2100");
    // }

    if(enteredValues){
      setWeightInp(enteredValues[enteredValues?.length-1]?.requirepowder);
      setWaterWeight(enteredValues[enteredValues?.length-1]?.requirewater);
    }
  }, [enteredValues]);

  useEffect(() => {
    if (!enteredValues[0]?.length) {
      setGreeImg(false);
      setBlueImg(false);
      setOrangImg(false);
    }
  }, [enteredValues]);

  useEffect(() => {
    if (enteredValues[0]?.label === "F1") {
      setGreeImg(true);
    } else if (enteredValues[0]?.label === "F2") {
      setGreeImg(true);
    } else if (enteredValues[0]?.label === "F3") {
      setGreeImg(true);
    } else if (enteredValues[0]?.label === "F4") {
      setBlueImg(true);
    } else if (enteredValues[0]?.label === "F5") {
      setBlueImg(true);
    } else if (enteredValues[0]?.label === "F6") {
      setBlueImg(true);
    } else if (enteredValues[0]?.label === "F7") {
      setOrangImg(true);
    } else if (enteredValues[0]?.label === "F8") {
      setOrangImg(true);
    } else if (enteredValues[0]?.label === "F9") {
      setOrangImg(true);
    } else {
      setDefaultImg(true);
    }
  }, [enteredValues]);

  // useEffect(() => {
    // if (scanInp?.length) {
    //   setTimeout(() => {
    //     if (!openYourBagDrawer && isImageVisible) {
    //       setEnteredValues([...enteredValues, { label: scanInp }]);
    //     }
    //   }, 500);
    // }

    // let scanData = async() =>{
    //   if (scanInp?.length) {
    //     // setTimeout(() => {
    //       // if (!openYourBagDrawer && isImageVisible) {
    //       setInputError(false);
  
    //       let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))
    
    //       let FinalFlaskList = flasklist?.filter((ele)=> scanInp == ele?.flaskbarcode)
    
    //       let investmentVal;
    
    //       if(FinalFlaskList?.length > 0){
    //         let bindTreeFlask = TreeFlaskBindList?.filter((ele)=>ele?.flaskid == FinalFlaskList[0]?.flaskid)
    //         let TreeData ;
  
    //       if(bindTreeFlask?.length > 0){
  
    //         if(FlaskImg?.length == 0){
    //           let resData = await ValidFlaskForInvest(FinalFlaskList[0]?.flaskid)
    //           let initmfg = JSON.parse(localStorage.getItem("initmfg"))
    //           let ImgPath = `${initmfg?.UploadLogicalPath}${initmfg?.ukey}/procasting/${resData?.flaskimage}`
    //           console.log("ImgPath",ImgPath);
    //           setFlaskImg(ImgPath)
    //         }
    //         TreeData =  await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno)

    //         console.log("scanInp",bindTreeFlask[0]?.castuniqueno);

  
    //         investmentVal = {...TreeData,...FinalFlaskList[0],investmentid:bindTreeFlask[0]?.investmentid}
    //         setEnteredValues([...enteredValues, investmentVal]);
    //       }
    //       else{
    //         // toast.error("Flask Invalid!!")
    //       }
    //       // }else{
    //         // toast.error("not Valid Flask!!")
    //       // }
    //       // setInputValue("");
    //     }
    //     // },500)
    //   }
    // }

  //   scanData();
   
  // }, [scanInp]);

  // setTimeout(() => {
  //   if (scanInp?.length > 0) {
  //     setScanInp("");
  //   }
  // }, 510);



  const handleScan = (data) => {};

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const toggleImageVisibility = () => {
    if (invProRef.current) {
      invProRef.current.focus();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGoButtonClick = async() => {
    if (inputValue === "" || inputValue === undefined) {
      setInputError(true);
    } else {
      setInputError(false);
      
      let flaskids = JSON.parse(sessionStorage.getItem("bindedFlask"))
      let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))

      let FinalFlaskList = flasklist?.filter((ele)=> inputValue == ele?.flaskbarcode)

      let investmentVal;

      if(FinalFlaskList?.length > 0){
        let bindTreeFlask = TreeFlaskBindList?.filter((ele)=>ele?.flaskid == FinalFlaskList[0]?.flaskid)
        let TreeData ;
        if(bindTreeFlask?.length > 0){
          if(FlaskImg?.length == 0){
            let resData = await ValidFlaskForInvest(FinalFlaskList[0]?.flaskid)
            if(resData){
              let initmfg = JSON.parse(localStorage.getItem("initmfg"))
              let ImgPath = `${initmfg?.UploadLogicalPath}${initmfg?.ukey}/procasting/${resData?.flaskimage}`
              console.log("ImgPath",ImgPath);
              setFlaskImg(ImgPath)
            }
          }
          TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno)
          investmentVal = {...TreeData,...FinalFlaskList[0],investmentid:bindTreeFlask[0]?.investmentid}
          setEnteredValues([...enteredValues, investmentVal]);
        }else{
          toast.error("Flask Invalid!!")
        }
        console.log("TreeData",bindTreeFlask)
       
      }else{
        toast.error("not Valid Flask!!")
      }
      
      setInputValue("");
    }
  };

  const handleGoButtonClickHidden = async() => {
    if (scanInp === "" || scanInp === undefined) {
      setInputError(true);
    } else {
      setInputError(false);
      
      let flaskids = JSON.parse(sessionStorage.getItem("bindedFlask"))
      let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))

      let FinalFlaskList = flasklist?.filter((ele)=> scanInp == ele?.flaskbarcode)

      let investmentVal;

      if(FinalFlaskList?.length > 0){
        let bindTreeFlask = TreeFlaskBindList?.filter((ele)=>ele?.flaskid == FinalFlaskList[0]?.flaskid)
        let TreeData ;
        if(bindTreeFlask?.length > 0){
          if(FlaskImg?.length == 0){
            let resData = await ValidFlaskForInvest(FinalFlaskList[0]?.flaskid)
            if(resData){
              let initmfg = JSON.parse(localStorage.getItem("initmfg"))
              let ImgPath = `${initmfg?.UploadLogicalPath}${initmfg?.ukey}/procasting/${resData?.flaskimage}`
              console.log("ImgPath",ImgPath);
              setFlaskImg(ImgPath)
            }
          }
          TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno)
          investmentVal = {...TreeData,...FinalFlaskList[0],investmentid:bindTreeFlask[0]?.investmentid}
          setEnteredValues([...enteredValues, investmentVal]);
        }else{
          toast.error("Flask Invalid!!")
        }
        console.log("TreeData",bindTreeFlask)
       
      }else{
        toast.error("not Valid Flask!!")
      }
      
      setScanInp("");
    }
  };



  console.log("enterdvalue",enteredValues);


  const handleInputChangen = (e) => {
    setEnteredTime(e.target.value);
  };

  const handleDelayedFunction = () => {
    setTiemOut(true);
  };

  const handleDoneClick = () => {
    setTiemOut(false);
    let totalTi = enteredTime * 60000;
    setTimeout(handleDelayedFunction, totalTi);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

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

  const notify = () => toast.success("SAVED SUCCESSFULLY");

  const saveDataHandle = () => {
    if (weightInp === undefined || weightInp === "" ) {
      toast.error("Enter powder weight")
    } else if(waterWeight === undefined || waterWeight === "") {
      toast.error("Enter water Weight")
    } else if(waterTemp === undefined || waterTemp === ""){
      toast.error("Enter Water Temperature")
    } else if( TDS === undefined || TDS === ""){
      toast.error("Enetr TDS");
    } else if( phValue === undefined || phValue === ""){
      toast.error("Enetr phValue");
    } 
    else {
      setSaveData(true);
      notify();
      InvestFlaskBind()
      // const updateData = enteredValues?.map((ev, i) => {
      //   if (!ev["ImgBtn"]) {
      //     ev["ImgBtn"] = (
      //       <button
      //         onClick={() => {
      //           setIsImgUpload(true)
      //           setEviIndex(i)
      //         }}
      //         className="invest_upload_btn"
      //       >
      //         Upload Image
      //       </button>
      //     );
      //   }
      //   return ev;
      // });

     // setEnteredValues(updateData);
      setShowTimmerBtn(true);
    }
  };

  // useEffect(()=>{
  //   if(glossFlag){
  //     const d = new Date();

  //     let hour =
  //       d.getHours().toString().length === 1 ? `0${d.getHours()}` : d.getHours();
  
  //     let min =
  //       d.getMinutes().toString().length === 1
  //         ? `0${d.getMinutes()}`
  //         : d.getMinutes();
  
  //     let sec =
  //       d.getSeconds().toString().length === 1
  //         ? `0${d.getSeconds()}`
  //         : d.getSeconds();
          
  //     localStorage.setItem(
  //       "InvestTimer",
  //       JSON.stringify(`${hour}:${min}:${sec}`)
  //     );
  //   }
  // },[glossFlag])

  useEffect(()=>{
    localStorage.removeItem("InvestTimer")
  },[])

  const [toastShown, setToastShown] = useState(false);

  const playAudio = () => {
    setPlayStatus(Sound.status.PLAYING);
  
    setTimeout(() => {
      setPlayStatus(Sound.status.STOPPED);
    }, 30000); 
  };
  
  let TimeNotify = useCallback(() => {
    if (!toastShown) {
      toast.error("Time is Over!!!!", { theme: "colored" });
      setToastShown(true);
    }
    playAudio();
  }, [toastShown]);
  

  const  Completionist= useCallback(() => {
    // console.log("investTime", investTime);
    // console.log("completedXCV", completed?.completed);

    // setGlossFlag(true)


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

    // let timeFinish =false;

    // if (isCompleted === true) {
      // TimeNotify();
      // setFetchFlag(true);
      // setGlossFlag(true);
      // localStorage.setItem(
      //   "InvestTimer",
      //   JSON.stringify(`${hour}:${min}:${sec}`)
      // );
    // }
    // let finishTime = JSON.parse(localStorage.getItem("InvestTimer"));

    // invTimer='ASDAD';

    return (
      <div style={{ textTransform: "uppercase" }}>
        Gloss of completion time :
        {/* {timeFinish ? (
          <span style={{ fontWeight: "bold" }}>{finishTime}</span>
        ) : ( */}
          <span style={{ fontWeight: "bold" }}>
            {hour}:{min}:{sec}
          </span>
        {/* )} */}
      </div>
    )
  },[])

  // console.log("showTimmer",showTimmer);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span style={{ textAlign: "center" }}>
          Filling + Pouring Timer :{" "}
          <span style={{ fontWeight: "bold" }}>
            {(minutes)}:{(seconds)}
          </span>
        </span>
      );
    }
  };

  const handleStartTime = () => {
    setShowTimmer(true);
    // setEviIndex((pre) => [...pre, evi]);

    // const updatedData = enteredValues.map((d, index) => {
    //   if (!d.timer && evi === index) {
    //     d.timer = <Countdown date={Date.now() + 30000} renderer={renderer} />;
    //   }
    //   return d;
    // });
    // setEnteredValues(updatedData);
  };

  const handleRemoveItem = (indexToRemove) => {
    setOpenDelete(true);
    setSelectedIndex(indexToRemove);
  };

  const handelScanInp = (target) => {
    setScanInp(target);
  };

  const handleConfirmation = () => {
    setEnteredValues(
      enteredValues.filter((_, index) => index !== selectedIndex)
    );
    setOpenDelete(false);
    if (enteredValues.length === 1) {
      window.location.reload();
    }
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //       const updatedData = enteredValues.map((d, index) => {
  //         if (eviIndex === index) {
  //           d.ImgUrl = base64String
  //         }
  //         return d;
  //       });
  //       setEnteredValues(updatedData);
  //       setFileBase64(base64String)
  //       // console.log('Base64 representation:', base64String);
  //     };
  //     reader.readAsDataURL(file);
  //   }

  // };

  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  useEffect(() => {
    if (CurrentImageValue.length > 0) {
      const updatedData = enteredValues.map((d, index) => {
        if (eviIndex === index) {
          d.ImgUrl = CurrentImageValue;
        }
        return d;
      });
      setEnteredValues(updatedData);

      setIsImgUpload(false);
    }
  }, [CurrentImageValue]);

  const handelUploadImg = useCallback((event) => {
    // setFetchFlag(true)
    // let data = JSON.parse(localStorage.getItem("InvestTimer"));
    // setInvestTime(data);
    event.stopPropagation(); 
    // InvestInfoSave()
    setIsImgUpload(true);
    setGlossFlag(true);
    // setCountDownTime(Date.now())

  },[]);

  console.log("icompleted",isCompleted);

  return (
    <div>
      <Sound
        url={notiSound}
        playStatus={playStatus}
        onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)}
        volume={100}
      />

      <BarcodeScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment"
      />
      <ToastContainer />

      <Dialog
        fullWidth
        open={isImgUpload}
        disableEnforceFocus
        onClose={() => setIsImgUpload(false)}
      >
        <ImageWebCam />
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <p style={{ fontSize: "25px", margin: "20px", fontWeight: 500 }}>
            Enter The Time..
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="number"
              placeholder="Enetr Time.."
              style={{
                height: "50px",
                width: "250px",
                marginInline: "30px",
              }}
              value={enteredTime}
              onChange={handleInputChangen}
              className="investinput"
            />
            <button
              style={{
                height: "50px",
                margin: "30px 20px",
              }}
              onClick={() => {
                handleDoneClick();
                handleClose();
              }}
            >
              Done
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ margin: "20px", paddingInline: "100px" }}
        >
          {"ARE YOU SURE TO DELETE ?"}
        </DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button onClick={handleConfirmation}>YES</Button>
          <Button onClick={handleClickOpenDelete}>NO</Button>
        </div>
      </Dialog>

      {/* <Dialog 
        className="uploadImage" 
        open={isImgUpload} 
        onClose={() =>{
          setIsImgUpload(false)
          setTimeout(()=>{
            setFileBase64('')
          },150)
        }}
        >
        <div
          style={{
            width: "360px",
            height: "390px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img src={!fileBase64.length ? uploadcloud : fileBase64 } style={{ width: "100%",height:'100%',objectFit: "contain" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e)}
            />
            <label htmlFor="fileInput">
              <button onClick={handleButtonClick}>Upload</button>
            </label>
          </div>
        </div>
      </Dialog> */}

      <Dialog
        className="showImage"
        open={isImgShow}
        onClose={() => setIsImgShow(false)}
      >
        <div
          style={{
            width: "auto",
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img
            // src={enteredValues[eviIndex]?.ImgUrl}
            src={fileBase64}
            style={{ width: "100%", objectFit: "cover" }}
          />
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e)}
            />
            <label htmlFor="fileInput">
              <button onClick={handleButtonClick}>Change Image</button>
            </label>
          </div> */}
        </div>
      </Dialog>

      <div>
        <div className="TopBtnDivMainOneV2">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="headerV2Title"> INVESTMENT PROCESS</p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => naviagtion("/homeone")}
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
        <div
          style={{
            display: "flex",
            marginTop: "0px",
            justifyContent: "space-around",
            // border:'1px solid red',
            position: "relative",
          }}
        >
          <div
            style={{
              width: "65%",
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                // width: "80%",
                gap: "80px",
                // justifyContent: "space-around",
                position: "relative",
              }}
            >
              <div className="investTopBox1">
                <div
                  onClick={toggleImageVisibility}
                  style={{
                    width: "fit-content",
                    marginLeft: !isImageVisible ? "30px" : "2px",
                    position: "relative",
                  }}
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
                    <p
                      style={{
                        fontWeight: "bold",
                        marginLeft: "-40px",
                        marginTop: "-10px",
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
                      left: "50px",
                      top: "70px",
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
                      left: "50px",
                      top: "70px",
                      zIndex: -1,
                    }}
                  >
                    c
                  </button>
                </div>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <input
                    type="text"
                    value={inputValue}
                    style={{ border: inputError && "1px solid red" }}
                    className="enterBrachItemBox"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    className="createGoBtn"
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      borderRadius: "0px",
                    }}
                    onClick={handleGoButtonClick}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      GO
                    </Typography>
                  </Button>
                </div>
                <button
                  style={{
                    marginTop: "20px",
                    cursor: "pointer",
                    height: "35px",
                    width: "100px",
                  }}
                  className="homeNoteTitleV2"
                  onClick={handleRefresh}
                >
                  Clear All
                </button>
              </div>
              <div className="investTopBox22">
                <div
                  style={{
                    // minWidth: "134px",
                    // width:'auto',
                    overflow: "auto",
                    height: "250px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  {enteredValues?.map((value, index) => (
                    <div className="allScanInvestdataMain">
                      <p className="allInvestScanData" key={index}>
                        {value?.flaskbarcode}
                      </p>
                      {!saveData && (
                        <RemoveCircleRoundedIcon
                          style={{
                            color: "#FF0000",
                            cursor: "pointer",
                            fontSize: "30px",
                          }}
                          onClick={() => handleRemoveItem(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="investTopBox3">
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">Powder Weight:</p>
                  <input
                    type="number"
                    // value={
                    //   (greenImg && "3000") ||
                    //   (blueImg && "3000") ||
                    //   (orangeImg && "3000") ||
                    //   (weight && "") ||
                    //   (defaultImg && "")
                    // }
                    value={weightInp}
                    onChange={(e) => setWeightInp(e.target.value)}
                    className="investDestilInput1"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">Water Weight:</p>
                  <input
                    type="number"
                    // value={
                    //   (greenImg && "3000") ||
                    //   (blueImg && "3000") ||
                    //   (orangeImg && "3000") ||
                    //   (weight && "") ||
                    //   (defaultImg && "")
                    // }
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(e.target.value)}
                    className="investDestilInput1"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">Water Temp. :</p>
                  <input
                    type="number"
                    // value={
                    //   (greenImg && "3000") ||
                    //   (blueImg && "3000") ||
                    //   (orangeImg && "3000") ||
                    //   (weight && "") ||
                    //   (defaultImg && "")
                    // }
                    value={waterTemp}
                    onChange={(e) => setWaterTemp(e.target.value)}
                    className="investDestilInput1"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">TDS:</p>
                  <input
                    type="number"
                    className="investDestilInput1"
                    value={TDS}
                    onChange={(e) => setTDS(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="investDestilInputTitleNew">PHvalue:</p>
                  <input
                    type="number"
                    className="investDestilInput1"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "15px",
                  }}
                >
                  <button
                    // className="investAddGlassBtn"
                    onClick={saveDataHandle}
                    className="homeNoteTitleV2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              {showTimmerBtn && (
                <div className="invest_btn_div">
                  <div
                    style={{
                      color: "#800000",
                      fontSize: "24px",
                      backgroundColor: "#efefef",
                      width: "100%",
                      padding: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {!showTimmer ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "30px",
                        }}
                      >
                        <p>Process Compeleted Start Time: </p>
                        &nbsp;
                        <button
                          className="invest_btn"
                          onClick={startTimer}
                        >
                          Start Time
                        </button>
                      </div>
                    ) : (
                      // <Countdown
                      //   // date={Date.now() + convertToMilliseconds("invest")}
                      //   date={Date.now() + 3000}
                      //   renderer={renderer}
                      //   // onComplete={onComplete}
                      // /> 
                      <div>
                        {isActive ? (
                          <h3 style={{margin:'0px',padding:'0px',fontWeight:'500',fontSize:'22px'}}>
                            Filling + Pouring Timer : {Math.floor(timeLeft / 60000)}m{" "}
                            {Math.floor((timeLeft % 60000) / 1000)}s
                          </h3>
                        ) : (
                          <h3 style={{margin:'0px',padding:'0px',fontWeight:'500',fontSize:'22px'}}>
                             {`Gloss of completion time: ${new Date().toLocaleTimeString()}`}
                          </h3>
                        )}
                      </div>
                    )}


                      
                    {!CurrentImageValue.length ? (
                      <div>
                        Gloss Off Time :{" "}
                        {/* <span style={{ fontWeight: "bold" }}>{TotalTime("invest")}</span> */}
                        <span style={{ fontWeight: "bold" }}>{"4:00:00"}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div>
                  hello
                </div> */}
                </div>
              )}

              {!showTimmer && (
                <div
                  style={{
                    display: "flex",
                    marginTop: "5px",
                    flexWrap: "wrap",
                  }}
                >
                  {enteredValues?.map((value, index) => (
                    <table
                      key={index}
                      style={{
                        backgroundColor:
                          (value?.procastingstatus=="Wax Setting" && "#b1d8b7") ||
                          (value?.procastingstatus=="Regular" && "#a396c8") ||
                          (value?.procastingstatus=="Plastic" && "orange") ||
                          (value?.procastingstatus=="" && "#add8e6"),
                        margin: "5px",
                      }}
                    >
                      <tr>
                        <th className="not">{value?.flaskbarcode}</th>
                      </tr>
                      <tr>
                        <th className="investTableRow">
                          Batch No: {value?.CastBatchNo}
                        </th>
                      </tr>
                      <tr>
                        <th className="investTableRow">{value?.jobcount} Jobs </th>
                      </tr>
                      <tr>
                        <th className="investTableRow">{value?.TreeWeight} Grams </th>
                      </tr>
                      <tr>
                        <th
                          className={`investTableRow ${
                            !showTimmerBtn && "sett"
                          }`}
                        >
                          {/* {(greenImg && "Wax Setting") ||
                            (blueImg && "Regular") ||
                            (orangeImg && "RPT")} */}
                            {value?.procastingstatus == "" ? "NA" : value?.procastingstatus}
                        </th>
                      </tr>

                      {/* {!value?.ImgUrl && (
                      // {!CurrentImageValue && (
                      // {!CurrentImageValue && (
                      <tr>
                        <th className="btncom">{value?.ImgBtn}</th>
                      </tr>
                    )} */}
                      {value?.ImgUrl && (
                        <tr>
                          <th className="btncom">
                            <button
                              onClick={() => {
                                setIsImgShow(true);
                                setEviIndex(index);
                                setFileBase64(value?.ImgUrl);
                              }}
                              className="invest_upload_btn"
                            >
                              Show Image
                            </button>
                          </th>
                        </tr>
                      )}

                      {/* <tr>
                    <th style={{ color: "red" }}>{value?.timer}</th>
                  </tr> */}
                    </table>
                  ))}
                </div>
              )}

              {showTimmer  && (
                <div style={{ display: "flex", marginTop: "50px" }}>
                  {CurrentImageValue.length ? (
                    <button
                      onClick={() => {
                        setIsImgShow(true);
                        // setEviIndex(index);
                        setFileBase64(CurrentImageValue);
                      }}
                      className="invest_upload_btn"
                    >
                      Show Image
                    </button>
                  ) : (
                    <button
                      onClick={handelUploadImg}
                      className="invest_upload_btn"
                    >
                      Upload Image
                    </button>
                  )}
                </div>
              )}

              {/* <div>hello</div> */}
            </div>
          </div>

          <div className="investSideFixedImg" style={{visibility:!FlaskImg && 'hidden'}}>
            <img
              src={
                // (greenImg && greenImges) ||
                // (blueImg && blueImges) ||
                // (orangeImg && orangeImges)
                FlaskImg
              }
              alt="Img..."
              className="DrawerImg"
            />
          </div> 
        </div>
      </div>
    </div>
  );
}
