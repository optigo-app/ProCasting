import React, { useEffect, useRef, useState } from "react";
import "./AddFlask.css";
import BarcodeScanner from "react-barcode-reader";
import scaneCodeImage from "../../assets/scanBarcode.gif";
import idle from "../../assets/idle.gif";
import { useNavigate } from "react-router-dom";
import topLogo from "../../assets/oraillogo.png";
import { Button, Typography } from "@mui/material";
import { CommonAPI } from '../../../Utils/API/CommonApi'
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import ProfileMenu from "../../../Utils/ProfileMenu";
import BackButton from "../../../Utils/BackButton";
import GlobalHeader from "../../../Utils/HeaderLogoSection";

export default function AddFlask() {
  const [inputValue, setInputValue] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [inputErrorMax, setInputErrorMax] = useState(false);
  const [scanInp, setScanInp] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [FlaskList, setFlaskList] = useState();
  const [flaskTreeVal, setFlaskTreeVal] = useState([]);
  const [flaskVal, setFlaskVal] = useState();
  const [treeVal, setTreeVal] = useState();
  const invProRef = useRef(null);
  const naviagtion = useNavigate();
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

  const GetFlaskListApi = async () => {
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;
    let empData = JSON.parse(localStorage.getItem("getemp"));

    let bodyparam = { deviceToken: `${deviceT}` };

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

    let body = {
      con: `{\"id\":\"\",\"mode\":\"GETFLASKLIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
      p: ecodedbodyparam,
      f: "formname (album)",
    };

    await CommonAPI(body)
      .then((res) => {
        if (res) {
          setFlaskList(res?.Data?.rd);
          setFlaskTreeVal(res?.Data?.rd1);
          sessionStorage.setItem("flasklist", JSON.stringify(res?.Data.rd));
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const GetTreeDataApi = async (uniqueNo) => {
    if (!uniqueNo) {
      toast.error("cast unique no. is not Available!!");
    } else {
      let empData = JSON.parse(localStorage.getItem("getemp"));
      let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

      let bodyparam = {
        castuniqueno: `${uniqueNo}`,
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

      await CommonAPI(body)
        .then((res) => {
          if (res?.Data?.rd[0]?.stat == 1) {
            //  setQrData(res?.Data.rd[0])
            setTreeVal(res?.Data.rd[0]);
          } else {
            toast.error(res?.Data?.rd[0]?.stat_msg)
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const BindFlaskAndTreeApi = async () => {
    let empData = JSON.parse(localStorage.getItem("getemp"));
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

    let bodyparam = {
      castuniqueno: `${treeVal?.CastUniqueno}`,
      flaskid: `${flaskVal?.flaskid}`,
      empid: `${empData?.empid}`,
      empuserid: `${empData?.empuserid}`,
      empcode: `${empData?.empcode}`,
      deviceToken: `${deviceT}`,
    };

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

    let body = {
      con: `{\"id\":\"\",\"mode\":\"BINDTREEFLASK\",\"appuserid\":\"${empData?.empuserid}\"}`,
      p: ecodedbodyparam,
      f: "formname (album)",
    };

    await CommonAPI(body).then((res) => {
      if (res) {
        let BindedFlask = JSON.parse(sessionStorage.getItem("bindedFlask"));
        if (BindedFlask?.length) {
          sessionStorage.setItem(
            "bindedFlask",
            JSON.stringify([...BindedFlask, flaskVal?.flaskid])
          );
          GetFlaskListApi();
        } else {
          sessionStorage.setItem(
            "bindedFlask",
            JSON.stringify([flaskVal?.flaskid])
          );
        }

        toast.success("Tree And Flask Bind SuccessFully!");
      } else {
        toast.error("something went wrong!! Try Again!");
      }
    });
  };

  useEffect(() => {
    GetFlaskListApi();
  }, []);

  useEffect(() => {
    invProRef.current.focus();
  }, [invProRef]);

  const handleScan = (data) => { };

  const handleError = (error) => {
    console.error("Error while scanning", error);
  };

  const toggleImageVisibility = () => {
    if (invProRef.current) {
      invProRef.current.focus();
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGoButtonClick = async () => {
    if (flaskVal == undefined || treeVal == undefined) {
      if (inputValue === "" || inputValue === undefined) {
        setInputError(true);
      } else {
        setInputError(false);
        if (!flaskVal) {
          let Flask = FlaskList?.filter(
            (ele) => ele?.flaskbarcode == inputValue
          );
          if (Flask?.length > 0) {
            let FlaskVal = flaskTreeVal?.filter(
              (ele) => ele?.flaskid == Flask[0]?.flaskid
            );
            if (FlaskVal?.length > 0) {
              return toast.error("Flask Already Binded With Tree!");
            } else {
              setFlaskVal(Flask[0]);
            }
          } else {
            toast.error("Please Enter Valid FlaskID!!");
          }
          setInputValue("");
        } else {
          let TreeVal = flaskTreeVal?.filter(
            (ele) => ele?.castuniqueno == inputValue
          );
          if (TreeVal?.length > 0) {
            return toast.error("Tree Already Binded With Flask!");
          } else {
            await GetTreeDataApi(inputValue);
            setInputValue("");
          }
        }
      }
    } else {
      setInputErrorMax(true);
      setInputValue("");
    }
  };

  const handleGoButtonClickHidden = async () => {
    if (flaskVal == undefined || treeVal == undefined) {
      if (scanInp === "" || scanInp === undefined) {
        setInputError(true);
      } else {
        setInputError(false);
        if (!flaskVal) {
          let Flask = FlaskList?.filter(
            (ele) => ele?.flaskbarcode == scanInp
          );
          if (Flask?.length > 0) {
            let FlaskVal = flaskTreeVal?.filter(
              (ele) => ele?.flaskid == Flask[0]?.flaskid
            );
            if (FlaskVal?.length > 0) {
              return toast.error("Flask Already Binded With Tree!");
            } else {
              setFlaskVal(Flask[0]);
            }
          } else {
            toast.error("Please Enter Valid FlaskID!!");
          }
          setScanInp("");
        } else {
          let TreeVal = flaskTreeVal?.filter(
            (ele) => ele?.castuniqueno == scanInp
          );
          if (TreeVal?.length > 0) {
            return toast.error("Tree Already Binded With Flask!");
          } else {
            await GetTreeDataApi(scanInp);
            setInputValue("");
          }
        }
      }
    } else {
      setInputErrorMax(true);
      setScanInp("");
    }
  };

  const saveData = () => {
    if (flaskVal !== undefined || treeVal !== undefined) {
      BindFlaskAndTreeApi();
      // setEnteredValues([])
      setFlaskVal();
      setTreeVal();
      setInputErrorMax(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClick();
    }
  };

  const handleKeyDownHIdden = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClickHidden();
    }
  };

  const handelScanInp = (target) => {
    setScanInp(target);
  };


  return (
    <div>
      <BarcodeScanner onScan={handleScan} onError={handleError} />
      <div className="TopBtnDivMainOneV2">
        <div className="profileFIcon">
          <BackButton />
          {/* <CgProfile style={{ height: '30px', width: '30px', marginLeft: '15px' }} onClick={handleClick} /> */}
          <p className="headerV2Title">PROCASTING-TREE BIND WITH FLASK</p>
          {openMenu &&
            <ProfileMenu open={openMenu} anchorEl={anchorEl} handleClose={handleMenuClose} />
          }
        </div>
        {/* <div
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
        </div> */}
        <GlobalHeader topLogo={topLogo} handleClick={handleProfileClick} />
      </div>
      {/* <p className="mainTitle">PROCASTING-TREE BIND WITH FLASK</p> */}
      <div className="addFLaskMain">
        <div className="addFlaskQRMAin">
          <div
            onClick={toggleImageVisibility}
            style={{
              width: "fit-content",
              marginLeft: !isImageVisible ? "30px" : "3px",
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
                <span style={{ color: "red" }}>Click</span> On The Image For
                Scan<span style={{ color: "red" }}>*</span>
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
              onFocus={() => {
                setIsImageVisible(true);
                invProRef.current?.focus();
              }}
              inputMode="none"
              value={scanInp}
              onChange={(e) => handelScanInp(e.target.value)}
              onKeyDown={handleKeyDownHIdden}
              autoFocus
            />
            <button
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
              }}
            ></button>
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
          {inputErrorMax && (
            <h3 style={{ color: "red", margin: "0px" }}>First save data..</h3>
          )}
        </div>
        <div className="addFlaskDeatilMain">
          <div className="addDeatilMain">
            <div className="div-small">
              <input
                type="text"
                placeholder="Flask ID"
                value={
                  flaskVal
                    ? `${flaskVal?.flaskbarcode}(${flaskVal?.flaskid})`
                    : ""
                }
                className="addflaskInputID"
              />
              {flaskVal && <small className="div-small-text">Flask ID</small>}
            </div>

            <div className="div-small">
              <input
                type="text"
                placeholder="Tree ID"
                value={
                  treeVal
                    ? `${treeVal?.CastBatchNo}(${treeVal?.CastUniqueno})`
                    : ""
                }
                className="addflaskInputID"
                style={{ marginLeft: "20px" }}
              />
              {treeVal && (
                <small className="div-small-text" style={{ fontSize: "9px" }}>
                  Tree ID
                </small>
              )}
            </div>
          </div>

          <div className="addDeatilMain">
            <div className="div-small">
              <input
                type="text"
                className="addflaskInput"
                value={flaskVal ? flaskVal?.diameter : ""}
              />
              {flaskVal && <small className="div-small-text">diam.</small>}
            </div>
            <div className="div-small">
              <input
                type="text"
                className="addflaskInput"
                value={treeVal ? treeVal?.jobcount : ""}
                style={{ marginLeft: "20px" }}
              />
              {treeVal && <small className="div-small-text">count</small>}
            </div>
          </div>
          <div className="addDeatilMain">
            <div className="div-small">
              <input
                type="text"
                className="addflaskInput"
                value={flaskVal ? flaskVal?.requirewater : ""}
              />
              {flaskVal && <small className="div-small-text">cap.</small>}
            </div>
            <div className="div-small">
              <input
                type="text"
                className="addflaskInput"
                value={treeVal ? treeVal?.TreeWeight : ""}
                style={{ marginLeft: "20px" }}
              />
              {treeVal && <small className="div-small-text">est.wt</small>}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button className="saveBtn" onClick={saveData}>
              Save & New
            </button>
            {/* onClick={() => navigation('/investmentFirst')} */}
          </div>
        </div>
      </div>
    </div>
  );
}
