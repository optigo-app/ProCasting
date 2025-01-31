import React, { useEffect, useRef, useState } from "react";
import "./Activate.css";
import optigoLogo from "../../assets/oraillogo.png";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { toast } from "react-toastify";
import QrScanner from "qr-scanner";
import Sound from "react-sound";
import { useNavigate } from "react-router-dom";
import notiSound from "../../sound/Timeout.mpeg";
import { Base64 } from "js-base64";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Activate = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResults, setScannedResults] = useState();
  const [playStatus, setPlayStatus] = useState(Sound?.status?.STOPPED);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeCode, setEmployeeCode] = useState("");
  const navigation = useNavigate();

  const APIURL = `https://api.optigoapps.com/test/store.aspx`;

  const empCode = localStorage.getItem("empCode");
  const initmfg = JSON?.parse(localStorage.getItem("initmfg"));

  useEffect(() => {
    if (empCode != '' && initmfg?.token) {
      return navigation("/homeone");
    }
  }, [empCode, initmfg]);

  const INITMFGAPI = async (decodedString) => {
    if (decodedString) {
      const bodyparam = {
        deviceID: employeeCode || "E0018",
        deviceName: "DeviceID_SMIT1",
        brand: "Brand1",
        model: "Model1",
        manufacturer: "manufacturer1",
        appver: "125",
        appvercode: "125",
        device_type: "Phone",
        onesignal_uid: "abc123_onesignal_uid",
      };

      const encodedBodyParam = btoa(JSON.stringify(bodyparam));

      const body = {
        con: '{"id":"","mode":"INITMFG","appuserid":""}',
        p: encodedBodyParam,
        f: "formname (album)",
      };

      const headers = {
        Authorization: `Bearer ${decodedString}`,
        Yearcode: "",
        Version: "V4",
        sp: "2",
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(APIURL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("initmfgRes", data);

        if (data?.Data?.rd[0]?.stat != 0) {
          setIsModalVisible(false)
          sessionStorage.setItem("token", JSON.stringify(decodedString));
          localStorage.setItem("initmfg", JSON.stringify(data?.Data?.rd[0]));
          localStorage.setItem("empCode", JSON.stringify(employeeCode));
          navigation("/homeone");
        } else {
          toast.error(data?.Data?.rd[0]?.stat_msg);
        }
      } catch (error) {
        console.error("initmfgErr", error);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleSave = () => {
    if (!employeeCode.trim()) {
      toast.error("Please enter employee code.");
      return;
    }

    INITMFGAPI(scannedResults, employeeCode);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!employeeCode.trim()) {
        toast.error("Please enter employee code.");
        return;
      }
      INITMFGAPI(scannedResults, employeeCode);
      setIsModalVisible(false);
    }
  };

  const handleEmployeeCodeChange = (e) => {
    setEmployeeCode(e.target.value);
  };

  const handleScanning = () => {
    setEmployeeCode('E0018')
    INITMFGAPI("8456510807569990")
  }

  const onScanSuccess = (result) => {
    const newData = result?.data;
    if (newData) {
      playAudio();
      const decodedString = Base64.decode(newData);
      setScannedResults(decodedString);
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: console.error,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
    }
  }, [qrOn, isModalVisible]);

  const playAudio = () => {
    setPlayStatus(Sound.status.PLAYING);
    setTimeout(() => {
      setPlayStatus(Sound.status.STOPPED);
    }, 150);
  };

  return (
    <div className="backImg_container">
      <Sound
        url={notiSound}
        playStatus={playStatus}
        onFinishedPlaying={() => setPlayStatus(Sound?.status?.STOPPED)}
        volume={100}
      />
      <div className="main_container">
        <img src={optigoLogo} style={{ width: "150px" }} alt="Logo.." />
        <h1>Pro Casting</h1>
        {/* {scannedResults?.length > 0 && <h4>{`DeviceToken:${scannedResults}`}</h4>} */}
        {!isModalVisible &&
          <div className="scaneBoxMain">
            <video ref={videoEl} className="scanneBox"></video>
          </div>
        }
        {<button className="Activate_btn" onClick={handleScanning}>Activate</button>}
      </div>

      <Dialog
        open={isModalVisible}
        // onClose={() => setIsModalVisible(false)}
        PaperProps={{
          style: {
            borderRadius: '10px',
            minWidth: '300px',
          },
        }}
      >
        <DialogTitle>
          Enter Employee Code
          <IconButton
            aria-label="close"
            onClick={() => {
              setIsModalVisible(false);
              window.location.href = '/';
            }
            }
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="Enter Employee Code"
            type="text"
            variant="outlined"
            value={employeeCode}
            onChange={handleEmployeeCodeChange}
            onKeyDown={handleKeyDown}
            sx={{
              minWidth: '300px',
              marginTop: '10px',
              '& .MuiInputBase-root': {
                borderRadius: '10px',
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                background: '#000', color: '#fff', padding: '8px 30px',
                borderRadius: '10px',
                '&:hover': { background: '#000' }
              }}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Activate;
