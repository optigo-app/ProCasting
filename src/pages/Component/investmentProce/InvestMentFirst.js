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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadcloud from "../../assets/uploadCloud.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentCamFlag, CurrentImageApi, CurrentImageState } from "../../recoil/Recoil";
import ImageWebCam from "../imageTag/ImageWebCam";
import topLogo from "../../assets/oraillogo.png";
import { json, useLocation, useNavigate } from "react-router-dom";
import notiSound from "../../sound/Timeout.mpeg";
import Sound from "react-sound";
import { CommonAPI } from "../../../Utils/API/CommonApi";
import {
  TotalTime,
  convertToMilliseconds,
} from "../../../Utils/globalFunction";
import ProfileMenu from "../../../Utils/ProfileMenu";
import { CgProfile } from "react-icons/cg";
import DeleteTreeModal from "../../../Utils/DeleteTreeModal";
import { fetchFlaskList } from "../../../Utils/API/GetFlaskList";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  FreeMode,
  Thumbs,
  Scrollbar,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import ImageUploader from "../imageTag/ImageUploader";
import BackButton from "../../../Utils/BackButton";

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
  const imageApiUrl = useRecoilValue(CurrentImageApi);
  console.log('imageApiUrl: ', imageApiUrl);
  const setCurrentImageValue = useSetRecoilState(CurrentImageState);
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
  const [isImgUpload, setIsImgUpload] = useRecoilState(CurrentCamFlag);
  const [isImgShow, setIsImgShow] = useState(false);
  const [fileBase64, setFileBase64] = useState("");
  const [waterWeight, setWaterWeight] = useState("");
  const [waterTemp, setWaterTemp] = useState("");
  const [glossFlag, setGlossFlag] = useState(false);
  const [investTime, setInvestTime] = useState();
  const [TreeVal, setTreeVal] = useState();
  const [TreeFlaskBindList, setTreeFlaskBindList] = useState();
  const [InvestApiTime, setInvestApiTime] = useState({
    startTime: "",
    endTime: "",
  });
  const [castingStatus, setCastingStatus] = useState(null);
  const [FlaskImg, setFlaskImg] = useState("");
  const [FlaskinvestId, setFlaskInvestId] = useState();
  // const [countDownTime,setCountDownTime] = useState()
  const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation();

  const staticMilliseconds = 3000;
  const [timeLeft, setTimeLeft] = useState(staticMilliseconds);
  const [isActive, setIsActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [longPressIndex, setLongPressIndex] = useState(null);
  const [timer, setTimer] = useState(null);

  const handleTouchStart = (index) => {
    const pressTimer = setTimeout(() => {
      setLongPressIndex(index);
    }, 800);
    setTimer(pressTimer);
  };

  const handleTouchEnd = () => {
    clearTimeout(timer);
  };

  const handleDelete = () => {
    setCurrentImageValue(
      CurrentImageValue.filter((_, index) => index !== longPressIndex)
    );
    setLongPressIndex(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    let timerInterval = null;

    if (isActive && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(timerInterval);
      if (isActive) {
        // toast.error("Your Time is over");
        setIsActive(false);
        TimeNotify();
      }
    }

    return () => clearInterval(timerInterval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setIsActive(true);
    setShowTimmer(true);
  };

  const onComplete = useCallback(() => {
    setIsCompleted(true);
  }, []);

  const invProRef = useRef(null);
  const fileInputRef = useRef(null);
  const naviagtion = useNavigate();

  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);

  const handleStartTimeDate = () => {
    const currentStartTime = new Date()?.toLocaleTimeString();
    setInvestApiTime((prevState) => ({
      ...prevState,
      startTime: currentStartTime,
    }));
  };

  const handleEndTimeDate = () => {
    const currentEndTime = new Date()?.toLocaleTimeString();
    setInvestApiTime((prevState) => ({
      ...prevState,
      endTime: currentEndTime,
    }));
  };

  const GetTreeDataApi = async (castUniqueno) => {
    let empData = JSON.parse(localStorage.getItem("getemp"));
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;
    let treeUniqueno = JSON.parse(localStorage.getItem("SavedTree"));

    let uniquenotree;

    if (treeUniqueno) {
      uniquenotree = treeUniqueno[0]?.CastUniqueno;
    }

    let bodyparam = {
      castuniqueno: `${castUniqueno}`,
      empid: `${empData?.empid}`,
      empuserid: `${empData?.empuserid}`,
      empcode: `${empData?.empcode}`,
      deviceToken: `${deviceT}`,
    };

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

    let body = {
      con: `{\"id\":\"\",\"mode\":\"GETTREEQR\",\"appuserid\":\"${empData?.empuserid}\"}`,
      p: `${ecodedbodyparam}`,
      f: "formname (album)",
    };

    let treeVal;

    if (castUniqueno) {
      await CommonAPI(body)
        .then((res) => {
          if (res?.Data.rd[0].stat == 1) {
            //  setQrData(res?.Data.rd[0])
            // console.log(res?.Data.rd[0])

            if (castingStatus === null) {
              setCastingStatus(res?.Data.rd[0]?.procastingstatus);
            }

            treeVal = res?.Data.rd[0];
            setTreeVal(res?.Data.rd[0]);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      toast.error("CastUniqueNo. not Available!!");
    }

    return treeVal;
  };

  const getTreeFalskBindList = async () => {
    let empData = JSON.parse(localStorage.getItem("getemp"));
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

    let bodyparam = {
      deviceToken: `${deviceT}`,
    };

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

    let body = {
      con: `{\"id\":\"\",\"mode\":\"GETTREEFLASKBINDLIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
      p: `${ecodedbodyparam}`,
      f: "formname (album)",
    };

    await CommonAPI(body)
      .then((res) => {
        if (res?.Data.rd?.length) {
          setTreeFlaskBindList(res?.Data.rd);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const InvestFlaskBind = async () => {
    let empData = JSON.parse(localStorage.getItem("getemp"));
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

    let bodyparam = {
      flaskids: enteredValues.map((ele) => ele?.flaskid).join(),
      investmentid: [
        ...new Set(enteredValues.map((ele) => ele?.investmentid)),
      ].join(","),
      powderwt: `${weightInp}`,
      waterwt: `${waterWeight}`,
      watertemp: `${waterTemp}`,
      tds: `${TDS}`,
      phvalue: `${phValue}`,
      empid: `${empData?.empid}`,
      empuserid: `${empData?.empuserid}`,
      empcode: `${empData?.empcode}`,
      deviceToken: `${deviceT}`,
    };

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

    let body = {
      con: `{\"id\":\"\",\"mode\":\"INVESTFLASKBIND\",\"appuserid\":\"${empData?.empuserid}\"}`,
      p: `${ecodedbodyparam}`,
      f: "formname (INVESTFLASKBIND)",
    };

    await CommonAPI(body)
      .then((res) => {
        if (res) {
          let resStatus = res?.Data?.rd[0];
          if (resStatus?.stat != 0) {
            let invevstid = res?.Data?.rd[0]?.investmentid;
            setFlaskInvestId(invevstid);
            handleStartTimeDate();
            setSaveData(true);
            setShowTimmerBtn(true);
          } else {
            toast.error(resStatus?.stat_msg);
          }
        }
      })
      .catch((err) => console.log("err", err));
  };

  const ValidFlaskForInvest = async (flaskid) => {
    let empData = JSON.parse(localStorage.getItem("getemp"));
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

    let bodyparam = {
      flaskids: `${flaskid}`,
      empid: `${empData?.empid}`,
      empuserid: `${empData?.empuserid}`,
      empcode: `${empData?.empcode}`,
      deviceToken: `${deviceT}`,
    };

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

    let body = {
      con: `{\"id\":\"\",\"mode\":\"VALDNFLASKFORINVEST\",\"appuserid\":\"${empData?.empuserid}\"}`,
      p: `${ecodedbodyparam}`,
      f: "formname (VALDNFLASKFORINVEST)",
    };

    let finalVal;

    await CommonAPI(body)
      .then((res) => {
        if (res) {
          finalVal = res?.Data?.rd[0];
        }
      })
      .catch((err) => console.log("err", err));

    return finalVal;
  };

  const InvestInfoSave = async () => {
    try {
      let empData = JSON.parse(localStorage.getItem("getemp"));
      let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

      // Retrieve location state
      let data = location?.state;

      // alert('image url', JSON.stringify(imageApiUrl?.join(',')))

      // Prepare body parameters
      let bodyparam = {
        investmentid: FlaskinvestId ?? data?.investmentid,
        investmentstartdate: InvestApiTime?.startTime ?? data?.investmentDate,
        investmentenddate: InvestApiTime?.endTime ?? new Date(),
        // investmentphoto:
        //   fileBase64 !== ""
        //     ? fileBase64[0]
        //     : CurrentImageValue[0] ?? CurrentImageValue[0],
        investmentphoto: imageApiUrl?.join(','),
        empid: `${empData?.empid}`,
        empuserid: `${empData?.empuserid}`,
        empcode: `${empData?.empcode}`,
        deviceToken: `${deviceT}`,
      };
      let ecodedbodyparam = btoa(JSON.stringify(bodyparam));
      let body = {
        con: `{\"id\":\"\",\"mode\":\"INVESTINFOSAVE\",\"appuserid\":\"${empData?.empuserid}\"}`,
        p: `${ecodedbodyparam}`,
        f: "formname (album)",
      };

      // Call the API
      await CommonAPI(body)
        .then((res) => {
          if (res?.Data?.rd[0]?.stat != 0) {
            handleEndTimeDate();
            toast.success("Invest Info Save!!");
            naviagtion("/homeone");
          } else {
            toast.error("Error!!");
          }
        })
        .catch((err) => {
          toast.error("Error!!");
        });
    } catch (error) {
      console.log(`Caught Exception: ${error}`);
    }
  };

  const handleInvestmentReturn = () => {
    if (CurrentImageValue) {
      InvestInfoSave();
      toast.success("Photo upload!!");
    }
  };

  // useEffect(() => {
  //   if (CurrentImageValue) {
  //     InvestInfoSave()
  //     toast.success("Photo upload!!")
  //   }
  // }, [CurrentImageValue])

  const DeleteFlaskForInvest = async (flaskid) => {
    let empData = JSON.parse(localStorage.getItem("getemp"));
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

    let bodyparam = {
      investmentid: [
        ...new Set(enteredValues.map((ele) => ele?.investmentid)),
      ].join(","),
      flaskids: `${flaskid}`,
      empid: `${empData?.empid}`,
      empuserid: `${empData?.empuserid}`,
      empcode: `${empData?.empcode}`,
      deviceToken: `${deviceT}`,
    };

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

    let body = {
      con: `{\"id\":\"\",\"mode\":\"DELFLASKFROMINVEST\",\"appuserid\":\"${empData?.empuserid}\"}`,
      p: `${ecodedbodyparam}`,
      f: "formname (album)",
    };

    await CommonAPI(body)
      .then((res) => console.log("DELFLASKFROMINVEST", res))
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getTreeFalskBindList();
    let flasklist = JSON.parse(sessionStorage.getItem("flasklist"));
    if (!flasklist) {
      fetchFlaskList();
    }
  }, []);

  useEffect(() => {
    if (enteredValues) {
      console.log('enteredValues: ', enteredValues);
      setWeightInp(enteredValues[enteredValues?.length - 1]?.requirepowder);
      setWaterWeight(enteredValues[enteredValues?.length - 1]?.requirewater);
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

  const handleScan = (data) => { };

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

  const handleGoButtonClick = async () => {
    debugger;
    if (inputValue === "" || inputValue === undefined) {
      setInputError(true);
    } else {
      setInputError(false);

      let flasklist = JSON.parse(sessionStorage.getItem("flasklist"));

      let FinalFlaskList = flasklist?.filter(
        (ele) => inputValue == ele?.flaskbarcode
      );

      let investmentVal;

      if (FinalFlaskList?.length > 0) {
        let bindTreeFlask = TreeFlaskBindList?.filter(
          (ele) => ele?.flaskid == FinalFlaskList[0]?.flaskid
        );
        let TreeData;
        if (bindTreeFlask?.length > 0) {
          let resData = await ValidFlaskForInvest(FinalFlaskList[0]?.flaskid);
          if (resData?.stat == 1) {
            TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno);
            investmentVal = {
              ...TreeData,
              ...FinalFlaskList[0],
              investmentid: bindTreeFlask[0]?.investmentid,
            };
            setEnteredValues([...enteredValues, investmentVal]);
            // if (FlaskImg?.length != 0) {
            let initmfg = JSON.parse(localStorage.getItem("initmfg"));
            let ImgPath = `${initmfg?.LibPath}/procasting/`;
            setFlaskImg(ImgPath);
            // }
          } else {
            toast.error(resData?.stat_msg);
          }
        } else {
          toast.error("Flask Invalid!!");
        }
      } else {
        toast.error("Invalid Flask Id!");
      }

      setInputValue("");
    }
  };

  const handleGoButtonClickHidden = async () => {
    if (scanInp === "" || scanInp === undefined) {
      setInputError(true);
    } else {
      setInputError(false);

      let flasklist = JSON.parse(sessionStorage.getItem("flasklist"));

      let FinalFlaskList = flasklist?.filter(
        (ele) => scanInp == ele?.flaskbarcode
      );

      let investmentVal;

      if (FinalFlaskList?.length > 0) {
        let bindTreeFlask = TreeFlaskBindList?.filter(
          (ele) => ele?.flaskid == FinalFlaskList[0]?.flaskid
        );
        let TreeData;
        if (bindTreeFlask?.length > 0) {
          let resData = await ValidFlaskForInvest(FinalFlaskList[0]?.flaskid);
          if (resData?.stat == 1) {
            TreeData = await GetTreeDataApi(bindTreeFlask[0]?.castuniqueno);
            investmentVal = {
              ...TreeData,
              ...FinalFlaskList[0],
              investmentid: bindTreeFlask[0]?.investmentid,
            };
            setEnteredValues([...enteredValues, investmentVal]);
            if (FlaskImg?.length == 0) {
              let initmfg = JSON.parse(localStorage.getItem("initmfg"));
              // let ImgPath = `${initmfg?.LibPath}${initmfg?.ukey}/procasting/`;
              let ImgPath = `${initmfg?.LibPath}/procasting/`;
              setFlaskImg(ImgPath);
            }
          } else {
            toast.error(resData?.stat_msg);
          }
        } else {
          toast.error("Flask Invalid!");
        }
      } else {
        toast.error("Invalid Flask Id!");
      }

      setScanInp("");
    }
  };

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

  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    weight: false,
    water: false,
    temp: false,
    tds: false,
    ph: false,
  });

  const saveDataHandle = () => {
    let hasError = false;
    setErrorMessage("");

    if (!weightInp) {
      setInputErrors((prev) => ({ ...prev, weight: true }));
      setErrorMessage(
        (prev) => (prev ? prev + ", " : "") + "Enter powder weight"
      );
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, weight: false }));
    }

    if (!waterWeight) {
      setInputErrors((prev) => ({ ...prev, water: true }));
      setErrorMessage(
        (prev) => (prev ? prev + ", " : "") + "Enter water weight"
      );
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, water: false }));
    }

    if (!waterTemp) {
      setInputErrors((prev) => ({ ...prev, temp: true }));
      setErrorMessage(
        (prev) => (prev ? prev + ", " : "") + "Enter water temperature"
      );
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, temp: false }));
    }

    if (!TDS) {
      setInputErrors((prev) => ({ ...prev, tds: true }));
      setErrorMessage((prev) => (prev ? prev + ", " : "") + "Enter TDS");
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, tds: false }));
    }

    if (!phValue) {
      setInputErrors((prev) => ({ ...prev, ph: true }));
      setErrorMessage((prev) => (prev ? prev + ", " : "") + "Enter pH value");
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, ph: false }));
    }

    if (!hasError) {
      setErrorMessage("");
      InvestFlaskBind();
    }
  };

  useEffect(() => {
    localStorage.removeItem("InvestTimer");
  }, []);

  const [toastShown, setToastShown] = useState(false);

  const playAudio = () => {
    setPlayStatus(Sound?.status?.PLAYING);

    setTimeout(() => {
      setPlayStatus(Sound?.status?.STOPPED);
    }, 30000);
  };

  let TimeNotify = useCallback(() => {
    if (!toastShown) {
      toast.error("Your Time is over");
      setToastShown(true);
    }
    playAudio();
  }, [toastShown]);

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

    return (
      <div style={{ textTransform: "uppercase" }}>
        Gloss of completion time :
        <span style={{ fontWeight: "bold" }}>
          {hour}:{min}:{sec}
        </span>
      </div>
    );
  }, []);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span style={{ textAlign: "center" }}>
          Filling + Pouring Timer :{" "}
          <span style={{ fontWeight: "bold" }}>
            {minutes}:{seconds}
          </span>
        </span>
      );
    }
  };

  const handleStartTime = () => {
    setShowTimmer(true);
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
    event.stopPropagation();
    setIsImgUpload(true);
    setGlossFlag(true);
  }, []);

  const [flaskbinddate, setFlaskBindData] = useState("");
  const [elapsedTime, setElapsedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let data = location?.state;
      if (data) {
        setWeightInp(data?.powderwt);
        setWaterWeight(data?.waterwt);
        setWaterTemp(data?.watertemp);
        setTDS(data?.tds);
        setPhValue(data?.phvalue);

        let initmfg = JSON.parse(localStorage.getItem("initmfg"));
        let ImgPath = `${initmfg?.LibPath}/procasting/`;
        setFlaskImg(ImgPath);

        let castuniqueno = data["Batch#"]?.match(/\d+/)[0];
        castuniqueno = parseInt(castuniqueno, 10);

        try {
          const TreeData = await GetTreeDataApi(castuniqueno);
          const investmentVal = { ...TreeData };
          setEnteredValues((prevValues) => [
            ...prevValues,
            { ...investmentVal, flaskbarcode: data?.flaskbarcode },
          ]);
          setShowTimmerBtn(true);
          setShowTimmer(true);
          setIsActive(false);

          let bindTreeFlask = TreeFlaskBindList?.filter(
            (ele) => ele?.castuniqueno === castuniqueno
          );
          if (bindTreeFlask?.length > 0) {
            setFlaskBindData(bindTreeFlask[0]?.flaskbinddate);
          }
        } catch (error) {
          console.error("Error fetching tree data:", error);
        }
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    const data = location?.state;
    if (data) {
      setShowTime(true);
      const castuniqueno = data["Batch#"]?.match(/\d+/)?.[0] ?? "";
      const parsedCastUniqueno = castuniqueno
        ? parseInt(castuniqueno, 10)
        : null;
      const bindTreeFlask = TreeFlaskBindList?.filter(
        (ele) => ele?.castuniqueno === parsedCastUniqueno
      );
      if (bindTreeFlask?.length > 0) {
        let date = bindTreeFlask[0]?.flaskbinddate;
        // let date = '2024-10-14T13:55:25.373';
        if (!date) return;

        const startTime = new Date(date);

        const interval = setInterval(() => {
          const currentTime = new Date();
          const elapsedMilliseconds = currentTime - startTime;

          const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
          const minutes = Math.floor(
            (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor(
            (elapsedMilliseconds % (1000 * 60)) / 1000
          );

          setElapsedTime({ hours, minutes, seconds });
          setShowTime(false);
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [location, TreeFlaskBindList]);


  console.log('enteredValues', enteredValues);

  console.log('jhsjhjhasjds', location?.search)

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

      <DeleteTreeModal
        open={openDelete}
        onClose={handleCloseDelete}
        title="ARE YOU SURE TO DELETE ?"
        onconfirm={handleConfirmation}
        onclickDelete={handleClickOpenDelete}
      />

      <Dialog
        className="showImage"
        open={isImgShow}
        onClose={() => setIsImgShow(false)}
        maxWidth="md"
      >
        {CurrentImageValue?.length > 0 ? (
          <Swiper
            initialSlide={0}
            slidesPerView={1}
            spaceBetween={0}
            // navigation={true}
            pagination={{ clickable: true }}
            loop={false}
            modules={[Pagination, Keyboard, FreeMode, Thumbs, Scrollbar]}
            keyboard={{ enabled: true }}
            mousewheel={true}
            style={{ width: "100%", height: "100%" }}
          >
            {CurrentImageValue?.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  onTouchStart={() => handleTouchStart(index)}
                  onTouchEnd={handleTouchEnd}
                  onContextMenu={handleContextMenu}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={img?.url}
                    alt={`image-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  {longPressIndex === index && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No images to display</p>
        )}
      </Dialog>

      <div>
        <div className="TopBtnDivMainOneV2">
          <div style={{ display: "flex", alignItems: "center" }}>
            <BackButton />
            <CgProfile
              style={{ height: "30px", width: "30px", marginLeft: "15px" }}
              onClick={handleClick}
            />
            <p className="headerV2Title"> INVESTMENT PROCESS</p>
            {openMenu && (
              <ProfileMenu
                open={openMenu}
                anchorEl={anchorEl}
                handleClose={handleMenuClose}
              />
            )}
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
                gap: "80px",
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
                    value={weightInp}
                    onChange={(e) => {
                      setWeightInp(e.target.value);
                      if (e.target.value)
                        setInputErrors((prev) => ({ ...prev, weight: false }));
                    }}
                    className={`investDestilInput1 ${inputErrors.weight ? "inputError" : ""
                      }`}
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
                    value={waterWeight}
                    onChange={(e) => {
                      setWaterWeight(e.target.value);
                      if (e.target.value)
                        setInputErrors((prev) => ({ ...prev, water: false }));
                    }}
                    className={`investDestilInput1 ${inputErrors.water ? "inputError" : ""
                      }`}
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
                    value={waterTemp}
                    onChange={(e) => {
                      setWaterTemp(e.target.value);
                      if (e.target.value)
                        setInputErrors((prev) => ({ ...prev, temp: false }));
                    }}
                    className={`investDestilInput1 ${inputErrors.temp ? "inputError" : ""
                      }`}
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
                    className={`investDestilInput1 ${inputErrors.tds ? "inputError" : ""
                      }`}
                    value={TDS}
                    onChange={(e) => {
                      setTDS(e.target.value);
                      if (e.target.value)
                        setInputErrors((prev) => ({ ...prev, tds: false }));
                    }}
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
                  <p className="investDestilInputTitleNew">pH value:</p>
                  <input
                    type="number"
                    className={`investDestilInput1 ${inputErrors.ph ? "inputError" : ""
                      }`}
                    value={phValue}
                    onChange={(e) => {
                      setPhValue(e.target.value);
                      if (e.target.value)
                        setInputErrors((prev) => ({ ...prev, ph: false }));
                    }}
                  />
                </div>
                {errorMessage && (
                  <div className="errorMessage">All fields are required!</div>
                )}
                {!new URLSearchParams(window.location.search).has('flask') && !showTimmer && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "15px",
                    }}
                  >
                    <button onClick={saveDataHandle} className="saveBtn">
                      Save
                    </button>
                  </div>
                )}
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
                        <button className="invest_btn" onClick={startTimer}>
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
                          <h3
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                              fontSize: "22px",
                            }}
                          >
                            Filling + Pouring Timer :{" "}
                            {Math.floor(timeLeft / 60000)}m{" "}
                            {Math.floor((timeLeft % 60000) / 1000)}s
                          </h3>
                        ) : (
                          // <h3 style={{ margin: '0px', padding: '0px', fontWeight: '500', fontSize: '22px' }}>
                          //   {`Gloss of completion time: ${flaskbinddate !== '' ? `${elapsedTime?.hours}h ${elapsedTime?.minutes}m ${elapsedTime?.seconds}s` : new Date().toLocaleTimeString()}`}
                          // </h3>
                          <h3
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                              fontSize: "22px",
                            }}
                          >
                            Gloss of completion time:{" "}
                            {!showTime
                              ? elapsedTime?.hours > 0 ||
                                elapsedTime?.minutes > 0 ||
                                elapsedTime?.seconds > 0
                                ? `${elapsedTime.hours > 0
                                  ? `${elapsedTime.hours}h `
                                  : ""
                                  }${elapsedTime.minutes > 0
                                    ? `${elapsedTime.minutes}m `
                                    : ""
                                  }${elapsedTime.seconds > 0
                                    ? `${elapsedTime.seconds}s`
                                    : ""
                                  }`.trim()
                                : new Date().toLocaleTimeString()
                              : ""}
                          </h3>
                        )}
                      </div>
                    )}

                    {!CurrentImageValue.length ? (
                      <div>
                        Gloss Off Time :{" "}
                        <span style={{ fontWeight: "bold" }}>{"4:00:00"}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
                          (value?.procastingstatus == "Wax Setting" &&
                            "#b1d8b7") ||
                          (value?.procastingstatus == "Regular" && "#a396c8") ||
                          (value?.procastingstatus == "Plastic" && "orange") ||
                          (value?.procastingstatus == "" && "#add8e6"),
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
                        <th className="investTableRow">
                          {value?.jobcount + ' ' + (value?.jobcount > 1 ? 'Jobs' : "Job")} {" "}
                        </th>
                      </tr>
                      <tr>
                        <th className="investTableRow">
                          {value?.TreeWeight} Grams{" "}
                        </th>
                      </tr>
                      <tr>
                        <th
                          className={`investTableRow ${!showTimmerBtn && "sett"
                            }`}
                        >
                          {value?.procastingstatus == ""
                            ? "NA"
                            : value?.procastingstatus}
                        </th>
                      </tr>
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
                    </table>
                  ))}
                </div>
              )}

              {showTimmer && (
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    alignItems: "center",
                  }}
                >
                  {/* <button
                    onClick={handelUploadImg}
                    className="invest_upload_btn"
                  >
                    Upload Image
                  </button> */}
                  <ImageUploader
                    treeBatch={enteredValues[0]?.CastBatchNo}
                    lableName={'Upload Image'}
                    mode="investmentreturnphoto"
                    uploadName="investmentreturn"
                  />
                  {CurrentImageValue.length !== 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <button
                        onClick={() => {
                          setIsImgShow(true);
                          setFileBase64(CurrentImageValue);
                        }}
                        className="invest_upload_btn"
                      >
                        Show Image
                      </button>
                      <button
                        onClick={() => {
                          handleInvestmentReturn();
                        }}
                        className="saveBtn"
                        style={{ margin: "5px 10px" }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className="investSideFixedImg"
            style={{ visibility: !FlaskImg && "hidden" }}
          >
            <img
              src={`${FlaskImg}${TreeVal?.statuscolor}`}
              alt="Img..."
              className="DrawerImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
