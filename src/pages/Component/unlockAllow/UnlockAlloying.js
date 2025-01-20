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
import { json, useNavigate } from "react-router-dom";
import notiSound from "../../sound/Timeout.wav";
import Sound from "react-sound";
import { CommonAPI } from '../../../Utils/API/CommonApi'
import { convertToMilliseconds } from "../../../Utils/globalFunction";
import { CgProfile } from "react-icons/cg";
import ProfileMenu from "../../../Utils/ProfileMenu";
import DeleteTreeModal from "../../../Utils/DeleteTreeModal";
import BackButton from "../../../Utils/BackButton";
import { fetchFlaskList } from "../../../Utils/API/GetFlaskList";
import { fetchTreeFlaskBindList } from "../../../Utils/API/TreeFlaskBindListApi";
import GlobalHeader from "../../../Utils/HeaderLogoSection";
import { QuanchingStart } from "../../../Utils/API/QuanchingStartApi";

export default function UnlockAlloying() {
  const [inputValue, setInputValue] = useState("");
  const [inputValueHiddenPopup, setInputValueHiddenPopup] = useState("");
  const [inputValuePopup, setInputValuePopup] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [enteredValuesPopup, setEnteredValuesPopup] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [flashCode, setFlashCode] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isImageVisiblePopup, setIsImageVisiblePopup] = useState(true);
  const [shotTableBtn, setShowTableBtn] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [castingStatus, setCastingStatus] = useState(null)

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
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [TreeFlaskBindList, setTreeFlaskBindList] = useState();

  const [scanInp, setScanInp] = useState('');

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  // flask bind-list Api call
  const getTreeFalskBindList = async () => {
    const flaskbindlist = await fetchTreeFlaskBindList();
    if (flaskbindlist?.Data?.rd) {
      setTreeFlaskBindList(flaskbindlist?.Data?.rd);
    }
  };

  useEffect(() => {
    getTreeFalskBindList();
  }, [])

  useEffect(() => {
    getTreeFalskBindList();
    let flasklist = JSON?.parse(sessionStorage.getItem("flasklist"));
    if (!flasklist) {
      fetchFlaskList();
    }
  }, []);

  const GetTreeDataApi = async (castUniqueno) => {
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken
    let treeUniqueno = JSON.parse(localStorage.getItem("SavedTree"))

    let bodyparam = {
      "castuniqueno": `${castUniqueno}`,
      "empid": `${empData?.empid}`,
      "empuserid": `${empData?.empuserid}`,
      "empcode": `${empData?.empcode}`,
      "deviceToken": `${deviceT}`
    }

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

    let body = {
      "con": `{\"id\":\"\",\"mode\":\"GETTREEQR\",\"appuserid\":\"${empData?.empuserid}\"}`,
      "p": `${ecodedbodyparam}`,
      "f": "formname (album)"
    }

    let treeVal = {};

    if (castUniqueno) {
      await CommonAPI(body).then((res) => {
        if (res?.Data.rd[0].stat == 1) {
          if (castingStatus === null) {
            setCastingStatus(res?.Data.rd[0]?.procastingstatus)
          }
          treeVal = res?.Data.rd[0]
        }
      }).catch((err) => {
        console.log("err", err)
      })
    } else {
      toast.error("CastUniqueNo. not Available!")
    }

    return treeVal;
  }

  const AlloyingUnlock = async () => {

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
      "con": `{\"id\":\"\",\"mode\":\"ALLOYINGUNLOCK\",\"appuserid\":\"${empData?.empuserid}\"}`,
      "p": `${ecodedbodyparam}`,
      "f": "formname (album)"
    }

    await CommonAPI(body).then((res) => {
      setShowTableBtn(true)
      toast.success("Successfully Unlocked  !!")
    }).catch((err) => console.log("err", err))
  }

  const ValidateAlloyingUnlock = async (castUniqueno, flaskId) => {
    try {
      let empData = JSON.parse(localStorage.getItem("getemp"));
      let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

      let bodyparam = {
        castuniqueno: castUniqueno ?? "",
        flaskid: flaskId ?? '',
        empid: empData?.empid ?? "",
        empcode: empData?.empcode ?? "",
        deviceToken: deviceT ?? "",
        onesignal_uid: "abc123_onesignal_uid"
      };

      let encodedBodyParam = btoa(JSON.stringify(bodyparam));

      let body = {
        con: JSON.stringify({
          id: "",
          mode: "VALDNALLOYING",
          appuserid: empData?.empuserid
        }),
        p: encodedBodyParam,
        f: "formname (album)"
      };

      const res = await CommonAPI(body);
      if (res?.Data?.rd[0]?.stat !== 0) {
        return res?.Data?.rd[0];
      } else {
        toast.error(res?.Data?.rd[0]?.stat_msg)
      }
    } catch (err) {
      console.error("Error during validation:", err);
    }
  };

  useEffect(() => {
    if (scanRef.current) {
      scanRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   setEnteredValues([]);
  //   setEnteredValuesPopup([]);
  // }, []);

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
      alert('SCAN JOB FIRST')
    } else {
      // setOpen(true);
      AlloyingUnlock();
    }
  };

  const handleOpenPopup = (val) => {
    setOpen(true);
    setOpenPopupNumber(val)
  }


  // const handleAddData = () => {
  //   if (openPoupuNumber === 1) {
  //     if (enteredValuesPopup?.length > 0) {
  //       const allFlaskBarcodes = enteredValuesPopup?.map(item => item?.flaskbarcode);
  //       let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
  //       setFirstTableData((prev) => [
  //         ...prev,
  //         { flaskID: allFlaskBarcodes, timer },
  //       ]);
  //     }

  //     // setShowTimmer(true);
  //   }

  //   else if (openPoupuNumber === 2) {
  //     let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
  //     setSecondTableData((prev) => [
  //       ...prev,
  //       { flaskID: enteredValuesPopup, timer },
  //     ]);

  //     // setShowTimmer(true);
  //   }

  //   else if (openPoupuNumber === 3) {
  //     let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
  //     setThirdTableData((prev) => [
  //       ...prev,
  //       { flaskID: enteredValuesPopup, timer },
  //     ]);

  //     // setShowTimmer(true);
  //   }

  //   else if (openPoupuNumber === 4) {
  //     let timer = <span style={{ fontSize: '25px', color: 'red' }}><Countdown date={Date.now() + convertToMilliseconds("unlock")} renderer={renderer} /></span>
  //     setFourthTableData((prev) => [
  //       ...prev,
  //       { flaskID: enteredValuesPopup, timer },
  //     ]);

  //     // setShowTimmer(true);
  //   }
  //   setOpen(false);
  //   setEnteredValuesPopup([]);
  // };

  // const handleAddData = () => {
  //   if (openPoupuNumber === 1 && enteredValuesPopup?.length > 0) {
  //     console.log('enteredValuesPopup: ', enteredValuesPopup);
  //     const allFlaskBarcodes = enteredValuesPopup.map(item => item.flaskbarcode);
  //     const metalColor = enteredValuesPopup[0]?.MetalColor?.toLowerCase();

  //     const colorCountdownMap = {
  //       yellow: 40000, // 40 seconds
  //       white: 20000,  // 20 seconds
  //       rose: 0,       // 0 seconds
  //     };

  //     const countdownTime = colorCountdownMap[metalColor] || 20000;

  //     let timer = (
  //       <span style={{ fontSize: '25px', color: 'red' }}>
  //         <Countdown date={Date.now() + countdownTime} renderer={renderer} />
  //       </span>
  //     );

  //     const existingTableIndex = firtstTableData.findIndex(
  //       table => table.metalcolor === metalColor
  //     );

  //     if (existingTableIndex !== -1) {
  //       setFirstTableData((prev) => {
  //         const updatedTables = [...prev];
  //         updatedTables[existingTableIndex].flaskID = [
  //           ...updatedTables[existingTableIndex].flaskID,
  //           ...allFlaskBarcodes
  //         ];
  //         return updatedTables;
  //       });
  //     } else {
  //       setFirstTableData((prev) => [
  //         ...prev,
  //         {
  //           flaskID: allFlaskBarcodes,
  //           timer,
  //           metalcolor: metalColor
  //         }
  //       ]);
  //     }
  //   }
  //   setOpen(false);
  //   setEnteredValuesPopup([]);
  // };

  const handleAddData = async () => {
    if (openPoupuNumber === 1 && enteredValuesPopup?.length > 0) {
      const castUniqueno = enteredValuesPopup.map((item) => item?.CastUniqueno).join(',');
      const flashCode = enteredValuesPopup
        .map((item) => item?.flaskbarcode?.replace(/^[fF]/, ''))
        .join(',');

      const colorMaster = JSON?.parse(sessionStorage?.getItem('gridMaster'))?.Data?.rd;

      try {
        const quanchingRes = await QuanchingStart(castUniqueno, flashCode);
        if (quanchingRes?.Data?.rd[0]?.stat === 1) {
          const resData = quanchingRes?.Data?.rd1;

          resData?.forEach((item) => {
            const matchedColor = colorMaster?.find((colorItem) => colorItem?.id === item?.colorid);

            if (matchedColor) {
              const { QuenchingHH, QuenchingMM, QuenchingSS } = matchedColor;
              console.log(
                `Matched color for item ${item?.id || 'unknown'}: Hour: ${QuenchingHH}, Minute: ${QuenchingMM}, Second: ${QuenchingSS}`
              );
            } else {
              console.log(`No matching color found for item ${item?.id || 'unknown'}`);
            }
          });

          const newTableData = {};
          enteredValuesPopup.forEach((item) => {
            const metalColor = item.MetalColor?.toLowerCase();
            const countdownTime = colorMaster?.find(
              (colorItem) => colorItem?.metalcolorname?.toLowerCase() === metalColor
            )?.QuenchingHH * 3600 * 1000 +
              colorMaster?.find(
                (colorItem) => colorItem?.metalcolorname?.toLowerCase() === metalColor
              )?.QuenchingMM * 60 * 1000 +
              colorMaster?.find(
                (colorItem) => colorItem?.metalcolorname?.toLowerCase() === metalColor
              )?.QuenchingSS * 1000 ||
              22000;

            let timer = (
              <span style={{ fontSize: '25px', color: 'red' }}>
                <Countdown date={Date.now() + countdownTime} renderer={(props) => renderer(props, metalColor)} />
              </span>
            );

            if (newTableData[metalColor]) {
              newTableData[metalColor].flaskID.push(item.flaskbarcode);
            } else {
              newTableData[metalColor] = {
                flaskID: [item.flaskbarcode],
                timer,
                metalcolor: metalColor,
              };
            }
          });

          setFirstTableData((prev) => {
            const updatedTables = [...prev];
            Object.values(newTableData).forEach((newTable) => {
              const existingTableIndex = updatedTables.findIndex(
                (table) => table.metalcolor === newTable.metalcolor
              );

              if (existingTableIndex !== -1) {
                updatedTables[existingTableIndex].flaskID = [
                  ...updatedTables[existingTableIndex].flaskID,
                  ...newTable.flaskID,
                ];
              } else {
                updatedTables.push(newTable);
              }
            });
            return updatedTables;
          });
        } else {
          toast.error(quanchingRes?.Data?.rd[0]?.stat_msg)
        }
      } catch (error) {
        console.error('Error in QuanchingStart: ', error);
      }
    }

    // Reset popup and entered values
    setOpen(false);
    setEnteredValuesPopup([]);
  };


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

  const handleInputChangePopup = (event) => {
    setInputValuePopup(event.target.value);
  };

  // const handleGobuttonPopup = async () => {
  //   console.log('ascsds: ', inputValuePopup);
  //   if (inputValuePopup !== "" || inputValuePopup !== undefined) {
  //     let flasklist = JSON?.parse(sessionStorage.getItem("flasklist"))

  //     let FinalFlaskList = flasklist?.find((ele) => inputValuePopup == ele?.flaskbarcode)

  //     if (!FinalFlaskList) {
  //       return toast.error('Invalid Flask Id!')
  //     }
  //     setEnteredValuesPopup([...enteredValuesPopup, inputValuePopup]);
  //     setInputValuePopup("");
  //   }
  // }

  const handleGobuttonPopup = async () => {
    if (inputValuePopup === "" || inputValuePopup === undefined) {
      setInputError(true);
    } else {
      setInputError(false);
      let flasklist = JSON?.parse(sessionStorage.getItem("flasklist"))

      let FinalFlaskList = flasklist?.find((ele) => inputValuePopup == ele?.flaskbarcode)

      if (!FinalFlaskList) {
        return toast.error('Invalid Flask Id!')
      }

      let investmentVal;

      if (FinalFlaskList && Object?.keys(FinalFlaskList)?.length > 0) {
        let bindTreeFlask = TreeFlaskBindList?.find((ele) => ele?.flaskid == FinalFlaskList?.flaskid)
        let TreeData = await GetTreeDataApi(bindTreeFlask?.castuniqueno);
        if (TreeData && Object.keys(TreeData).length > 0) {
          let validateFlask = await ValidateAlloyingUnlock(bindTreeFlask?.castuniqueno, FinalFlaskList?.flaskid)
          if (validateFlask == undefined) {
            return
          }
          if (validateFlask?.stat != 0) {
            investmentVal = { ...TreeData, ...FinalFlaskList, investmentid: bindTreeFlask?.investmentid };
            setEnteredValuesPopup(prevState => [...prevState, investmentVal]);

            setInputValuePopup("");
          }
        }
      }
    }
  }

  const handleGoButtonClickHiddenPopup = async () => {
    if (inputValueHiddenPopup === "" || inputValueHiddenPopup === undefined) {
      setInputError(true);
    } else {
      setInputError(false);
      let flasklist = JSON?.parse(sessionStorage.getItem("flasklist"))

      let FinalFlaskList = flasklist?.find((ele) => inputValueHiddenPopup == ele?.flaskbarcode)

      if (!FinalFlaskList) {
        return toast.error('Invalid Flask Id!')
      }

      let investmentVal;

      if (FinalFlaskList && Object?.keys(FinalFlaskList)?.length > 0) {
        let bindTreeFlask = TreeFlaskBindList?.find((ele) => ele?.flaskid == FinalFlaskList?.flaskid)
        let TreeData = await GetTreeDataApi(bindTreeFlask?.castuniqueno);
        if (TreeData && Object.keys(TreeData).length > 0) {
          let validateFlask = await ValidateAlloyingUnlock(bindTreeFlask?.castuniqueno, FinalFlaskList?.flaskid);
          if (validateFlask == undefined) {
            return
          }
          if (validateFlask?.stat != 0) {
            investmentVal = { ...TreeData, ...FinalFlaskList, investmentid: bindTreeFlask?.investmentid };
            setEnteredValuesPopup([...enteredValuesPopup, investmentVal]);
            setInputValueHiddenPopup("");
          }
        }
      }
    }
  }

  const handleGoButtonClick = async () => {
    if (inputValue === "" || inputValue === undefined) {
      setInputError(true);
    } else {
      if (enteredValues?.length < 1) {
        setInputError(false);
        let flasklist = JSON?.parse(sessionStorage.getItem("flasklist"))

        let FinalFlaskList = flasklist?.find((ele) => inputValue == ele?.flaskbarcode)

        if (!FinalFlaskList) {
          return toast.error('Invalid Flask Id!')
        }

        let investmentVal;

        if (FinalFlaskList && Object?.keys(FinalFlaskList)?.length > 0) {
          let bindTreeFlask = TreeFlaskBindList?.find((ele) => ele?.flaskid == FinalFlaskList?.flaskid)
          let TreeData = await GetTreeDataApi(bindTreeFlask?.castuniqueno);
          if (TreeData && Object.keys(TreeData).length > 0) {
            let validateFlask = await ValidateAlloyingUnlock(bindTreeFlask?.castuniqueno, FinalFlaskList?.flaskid)
            if (validateFlask == undefined) {
              return
            }
            if (validateFlask?.stat != 0) {
              investmentVal = { ...TreeData, ...FinalFlaskList, investmentid: bindTreeFlask?.investmentid };
              setEnteredValues([...enteredValues, investmentVal]);
              setInputValue("");
            }
          }
        }

        if (enteredValues?.length === 1) {
          toast.error("First compelete the Unlock process of Flask!!!")
        }

      }
    }
  }

  const handleGoButtonClickHidden = async () => {
    if (scanInp === "" || scanInp === undefined) {
      setInputError(true);
    } else {
      if (enteredValues?.length < 1) {
        setInputError(false);
        let flasklist = JSON.parse(sessionStorage.getItem("flasklist"))

        let FinalFlaskList = flasklist?.find((ele) => scanInp == ele?.flaskbarcode)
        if (!FinalFlaskList) {
          return toast.error('Invalid Flask Id!')
        }
        let investmentVal;

        if (FinalFlaskList && Object?.keys(FinalFlaskList)?.length > 0) {
          let bindTreeFlask = TreeFlaskBindList?.find((ele) => ele?.flaskid == FinalFlaskList?.flaskid)
          let TreeData = await GetTreeDataApi(bindTreeFlask?.castuniqueno)
          if (TreeData && Object.keys(TreeData)?.length > 0) {
            let validateFlask = await ValidateAlloyingUnlock(bindTreeFlask?.castuniqueno, FinalFlaskList?.flaskid)
            if (validateFlask == undefined) {
              return
            }
            if (validateFlask?.stat != 0) {
              investmentVal = { ...TreeData, ...FinalFlaskList, investmentid: bindTreeFlask?.investmentid }
              setEnteredValues([...enteredValues, investmentVal]);
            }
          }
          setScanInp("");
        }

        if (enteredValues?.length === 1) {
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

  const handleKeyDownPopup = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGobuttonPopup();
    }
  };

  const handleKeyDownHiddenPopup = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClickHiddenPopup();
    }
  };

  const handleConfirmation = () => {
    setEnteredValuesPopup(enteredValuesPopup.filter((_, index) => index !== selectedIndex));

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

  const toastShownRefs = useRef({});
  const audioRef = useRef(null);

  // const playAudio = () => {
  //   setPlayStatus(Sound?.status?.PLAYING);

  //   setTimeout(() => {
  //     setPlayStatus(Sound?.status?.STOPPED);
  //   }, 30000);
  // };

  const playAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(notiSound);
    }
    audioRef.current.play().catch((err) => {
      console.error('Audio play error:', err);
    });
  }, []);

  const TimeNotify = useCallback(
    (tableKey) => {
      if (!toastShownRefs.current[tableKey]) {
        toast.error(`Time is over for ${tableKey}`);
        toastShownRefs.current[tableKey] = true; // Mark this table's timer as notified
        playAudio();
      }
    },
    [playAudio]
  );


  const renderer = useCallback(
    ({ minutes, seconds, completed }, tableKey) => {
      if (completed) {
        TimeNotify(tableKey);
        const d = new Date();
        const formattedTime = [
          d.getHours().toString().padStart(2, '0'),
          d.getMinutes().toString().padStart(2, '0'),
          d.getSeconds().toString().padStart(2, '0'),
        ].join(':');
        return (
          <div style={{ textTransform: 'uppercase' }}>
            <span style={{ fontWeight: 'bold' }}>{formattedTime}</span>
          </div>
        );
      } else {
        return (
          <span
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{`${minutes}m ${seconds}s`}</span>
            <span style={{ fontSize: '16px' }}>Remaining</span>
          </span>
        );
      }
    },
    [TimeNotify]
  );

  // const Completionist = useCallback(() => {
  //   TimeNotify();

  //   const d = new Date();

  //   let hour =
  //     d.getHours().toString().length === 1 ? `0${d.getHours()}` : d.getHours();

  //   let min =
  //     d.getMinutes().toString().length === 1
  //       ? `0${d.getMinutes()}`
  //       : d.getMinutes();

  //   let sec =
  //     d.getSeconds().toString().length === 1
  //       ? `0${d.getSeconds()}`
  //       : d.getSeconds();

  //   return (
  //     <div style={{ textTransform: 'uppercase' }}>
  //       <span style={{ fontWeight: 'bold' }}>{hour}:{min}:{sec}</span>
  //     </div>
  //   );
  // }, [TimeNotify]);



  const TableDisplay = () => {
    const groupedTables = firtstTableData?.reduce((acc, table) => {
      if (!acc[table?.metalcolor]) {
        acc[table?.metalcolor] = [];
      }
      acc[table?.metalcolor]?.push(table);
      return acc;
    }, {});

    return (
      <div>
        {Object.entries(groupedTables).map(([color, tables]) => (
          <div key={color} className='tableGroup' style={{ marginBottom: '30px' }}>
            {/* <h3 style={{ textAlign: 'center', textTransform: 'capitalize' }}>{color} Tables</h3> */}
            {tables?.map((table, index) => (
              <div key={index} className='tableDataMain'
                style={{
                  marginBottom: '20px',
                  boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                  // backgroundColor: table?.metalcolor
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #7d7f85' }}>
                  <p className="unlockTableTitle">TABLE - {table.metalcolor.toUpperCase()}</p>
                  {table.timer}
                </div>
                <p className="UnlockformDataTable">
                  {table.flaskID.join(', ')}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

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

      <DeleteTreeModal
        open={openDelete}
        onClose={handleCloseDelete}
        title="ARE YOU SURE TO DELETE ?"
        onconfirm={handleConfirmation}
        onclickDelete={handleClickOpenDelete}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p style={{ fontSize: '20px', margin: '10px', fontWeight: 500 }}>SCAN FLASK</p>
        <DialogTitle style={{ display: 'flex', height: '400px', width: '500px' }}>
          <div>
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
                inputMode="none"
                ref={scanRef}
                onBlur={() => {
                  setIsImageVisiblePopup(false);
                }}
                onFocus={() => setIsImageVisiblePopup(true)}
                onKeyDown={handleKeyDownHiddenPopup}
                autoFocus
              />
              <button style={{
                position: "absolute",
                left: "50px",
                top: "70px",
                zIndex: -1,
              }}>c</button>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <input
                type="text"
                value={inputValuePopup}
                style={{ border: inputError && "1px solid red" }}
                className='enterBrachItemBox'
                onChange={(event) => handleInputChangePopup(event)}
                onKeyDown={handleKeyDownPopup}
              />
              <Button
                className="createGoBtn"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "0px",
                  minHeight: '47px'
                }}
                onClick={handleGobuttonPopup}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  GO
                </Typography>
              </Button>
            </div>
          </div>
          <div style={{ width: '250px', height: '350px', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {enteredValuesPopup?.map((value, index) => (
              <div className="allScanInvestdataMain">
                <p className="allInvestScanData" key={index}>
                  {value?.flaskbarcode}
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
          <Button variant="contained" onClick={handleAddData} style={{ margin: "-20px 0px 20px", backgroundColor: 'black', color: 'white' }}>
            ADD TO TABLE
          </Button>
        </div>
      </Dialog>

      <div className="TopBtnDivMainOneV2">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BackButton />
          <p className="headerV2Title">
            CASTING UNLOCK PROCESS
          </p>
          {openMenu &&
            <ProfileMenu open={openMenu} anchorEl={anchorEl} handleClose={handleMenuClose} />
          }
        </div>
        <GlobalHeader topLogo={topLogo} handleClick={handleProfileClick} />
      </div>
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
              inputMode="none"
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
            <input type='text'
              value={inputValue}
              style={{ border: inputError && '1px solid red' }}
              className='enterBrachItemBox'
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} />
            <Button className='createGoBtn'
              style={{
                color: 'white',
                backgroundColor: 'black',
                borderRadius: '0px'
              }}
              onClick={handleGoButtonClick} >
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
              value={enteredValues[enteredValues?.length - 1]?.flaskbarcode ?? ""}
            // onChange={(e) => setFlashCode(e.target.value)}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">BATCH NO:</p>
            <input
              type="text"
              className="unlovcDestilInput"
              value={enteredValues[enteredValues?.length - 1]?.CastBatchNo ?? ""}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className='investDestilInputTitle'>WEIGHT:</p>
            <input type='text' disabled className='unlovcDestilInput' style={{ outline: 'none', backgroundColor: '#eceded' }}
              value={enteredValues[enteredValues?.length - 1]?.TreeWeight ?? ""}
            />
          </div>
          <div className="investDestilInputDiv">
            <p className="investDestilInputTitle">DEPARTMENT:</p>
            <input
              type="text"
              value={enteredValues.length === 0 ? "" : "CASTING"}
              className="unlovcDestilInput"
            />
          </div>
          <button className="saveBtn" onClick={handleClickOpen}>
            Unlock and Issue
          </button>
        </div>
      </div>
      <div>
        {shotTableBtn && <Button onClick={() => {
          setShowTable(true)
          setShowTableBtn(false)
        }}
          style={{ marginInline: '2%', marginTop: '10px', width: '200px', backgroundColor: 'black', color: 'white' }}>

          <Typography sx={{
            textTransform: 'capitalize',
            fontWeight: '600',
            fontFamily: 'sans-serif',
            letterSpacing: 0.5,
            backgroundColor: 'black',
            color: 'white'
          }}
          >Move To Table</Typography>
        </Button>}
        {showTable &&
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

            {firtstTableData?.length === 0 ?
              <div className='tableDataMain' onClick={() => handleOpenPopup(1)}>
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
                {TableDisplay()}
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}
