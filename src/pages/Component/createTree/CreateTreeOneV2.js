import React, { useEffect, useRef, useState } from 'react';
import './CreateTree.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Dialog, Grid, Menu, MenuItem, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrentCamFlag, CurrentImageState } from '../../recoil/Recoil';
import ImageWebCam from '../imageTag/ImageWebCam';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import scaneCodeImage from '../../assets/scanBarcode.gif'
import idle from '../../assets/idle.gif'
import topLogo from '../../assets/oraillogo.png'
import BarcodeScanner from 'react-barcode-reader';
import castingTree from '../../assets/castingtree.jpg'
import EditTreeImg from '../../assets/tree.jpg'
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoPrint } from "react-icons/io5";
import { IoInformationCircleSharp } from "react-icons/io5";
import { CommonAPI } from '../../../Utils/API/CommonApi'
import { toast } from 'react-toastify';
import JoinRightIcon from '@mui/icons-material/JoinRight';
import multimatel from '../../assets/multimatel.png'
import ProfileMenu from '../../../Utils/ProfileMenu';
import InfoDialogModal from '../Info/InfoDialogModal';
import PrintQRCodeDialog from '../printQr/PrintQRCodeDialog';
import RemarksModal from './RemarkModal';
import DeleteTreeModal from '../../../Utils/DeleteTreeModal';

export default function CreateTreeOneV2() {
    const [inputValue, setInputValue] = useState(undefined);
    const [inputValueHidden, setInputValueHidden] = useState('');
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputError, setInputError] = useState(false)
    const [camFlag, setCamFlag] = useRecoilState(CurrentCamFlag)
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [todayDate, setTodayDate] = useState('');
    const navigation = useNavigate();
    const CurrentImageValue = useRecoilValue(CurrentImageState);
    const setCurrentImageValue = useSetRecoilState(CurrentImageState)
    const [inputWightValue, setInputWeightValue] = useState();
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [treeFlag, setTreeFlag] = useState(false)
    const ScanRef = useRef(null)
    const [addLsit, setAddLsit] = useState(false);
    const [editTreeImg, setEditTreeImg] = useState(false)
    const [remark, setRemark] = useState("");
    const [showEnteredValue, setShowEnteredValue] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [saveOpen, setSaveOpen] = useState(false)
    const [saveWtOpen, setSaveWtOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [ShowBtnFlag, setShowBtnFlag] = useState(false);
    const [jobList, setJobList] = useState([]);
    const [rightJobs, setRightJobs] = useState([]);
    const [failJobs, setFailJobs] = useState([]);
    const [jobStatus, setJobStatus] = useState('jobR');
    const [validateTypeColor, setValidateTypeColor] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [AddTreeResp, setAddTreeResp] = useState({});
    const [savedTree, setSavedTree] = useState();
    const [buffer, setBuffer] = useState('');
    const [editTree, setEditTree] = useState([])
    const [finalWeight, setFinalWeight] = useState();
    const [editJobs, setEditJobs] = useState([])
    const [finalTreeRemark, setFinalTreeRemark] = useState('');
    const [showRemarkBtn, setShowRemarkBtn] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [showPrintDialog, setShowPrDialog] = useState(false);

    console.log("savedTree", savedTree)
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setShowPrDialog(false);
    };


    useEffect(() => {
        if (!rightJobs?.length) {
            setValidateTypeColor()
        }
    }, [rightJobs, failJobs])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuClose = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    };


    const location = useLocation()

    console.log("location", location);

    useEffect(() => {

        if (location?.state?.mode) {
            const getExistedTree = async () => {

                let castuniqueno = location?.state?.CastBatch
                let empData = JSON.parse(localStorage.getItem("getemp"))
                let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

                let bodyparam = {
                    "castuniqueno": `${castuniqueno}`,
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

                await CommonAPI(body).then((res) => {
                    if (res?.Data.rd[0].stat == 1) {
                        let treeData = res?.Data.rd[0]
                        setEditTree([treeData])
                        let TreeJobList;
                        if (treeData?.joblist?.length > 0) {
                            TreeJobList = treeData.joblist.split(",").map((ele, i) => ({
                                id: i + 1,
                                job: ele,
                                procastingstatusid: treeData.procastingstatusid
                            }));
                            console.log('TreeJobList: ', TreeJobList);
                            setEnteredValues((prev) => [...prev, ...TreeJobList])
                            setRightJobs((prev) => [...prev, ...TreeJobList])
                            // setEditJobs(TreeJobList)
                            setFinalTreeRemark(treeData?.castRemark)
                            setFinalWeight(treeData?.TreeWeight)
                            setInputWeightValue(treeData?.TreeWeight)
                            setShowBtnFlag(true)
                            setValidateTypeColor({ metaltype: `${treeData?.metaltype} ${treeData?.metalpurity}`, metalcolor: `${treeData?.MetalColor}`, procastingstatusid: `${treeData?.procastingstatusid}` })
                        }
                    }
                }).catch((err) => {
                    console.log("err", err)
                })
            }

            getExistedTree();
        }

    }, [location])

    console.log("resTreeQr", editJobs?.length > 0 ? (editJobs.map(item => item.id).join(",")) : (rightJobs.map(item => item.id).join(",")));

    useEffect(() => {
        localStorage.removeItem("SavedTree")
    }, [location])

    useEffect(() => {
        setCurrentImageValue('')
    }, [location?.key])

    useEffect(() => {
        let SavedLocalTree = JSON.parse(localStorage.getItem("SavedTree"))

        let SavedCastUniqueTree = {};

        if (SavedLocalTree) {
            SavedCastUniqueTree = SavedLocalTree.find((ele) => ele?.CastBatchNo == location?.state?.CastBatch)
            setAddTreeResp(SavedLocalTree)
        }

        console.log("SavedCastUniqueTree", SavedCastUniqueTree);
    }, [location])


    useEffect(() => {

        const GETCASTJOBLIST = async () => {

            let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

            let bodyparam = { "deviceToken": `${deviceT}` }

            let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

            let body = {
                "con": `{\"id\":\"\",\"mode\":\"GETCASTJOBLIST\",\"appuserid\":\"\"}`,
                "p": `${ecodedbodyparam}`,
                "f": "formname (album)"
            }

            await CommonAPI(body).then((res) => {
                if (res) {

                    let job = res?.Data?.rd
                    setJobList(job)
                    // setEnteredValues(job)
                    // if(mode === "GETCASTJOBLIST"){
                    //     localStorage.setItem("getcastjoblist",JSON.stringify(res?.Data?.rd))
                    // }
                }
            }).catch((err) => console.log("GET_EMP_PROCASTINGSTAUS_CASTJOBLIST", err))

        }
        GETCASTJOBLIST();
    }, [])


    const AddToJobTree = async () => {

        if (inputWightValue) {
            // debugger;
            let empData = JSON.parse(localStorage.getItem("getemp"))
            let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken
            console.log("validateTypeColor?.procastingstatusid", validateTypeColor)

            let bodyparam = {
                "castingjoblist": `${rightJobs?.map(item => item?.jobId)?.filter(jobId => jobId !== undefined && jobId !== null && jobId !== '').join(",")}`,
                // "castingjoblist": `${editJobs?.length > 0 ? (editJobs.map(item => item.id).join(",")):(rightJobs.map(item => item.id).join(",")) }`,
                "ReqWeight": `${inputWightValue}`,
                "ReqMetalType": `${validateTypeColor?.metaltype}`,
                "ReqMetalColor": `${validateTypeColor?.metalcolor}`,
                "empid": `${empData?.empid}`,
                "empbarcode": `${empData?.barcode}`,
                "empcode": `${empData?.empcode}`,
                "empuserid": `${empData?.empuserid}`,
                "empfname": `${empData?.firstname}`,
                "emplname": `${empData?.lastname}`,
                "castuniqueno": `${editTree?.length > 0 ? editTree[0]?.CastUniqueno : (Object?.keys(AddTreeResp)?.length > 0 ? AddTreeResp?.CastUniqueno : "")}`,
                "CastBatchNo": `${editTree?.length > 0 ? editTree[0]?.CastBatchNo : Object?.keys(AddTreeResp)?.length > 0 ? AddTreeResp?.CastBatchNo : location?.state?.CastBatch}`,
                "batchDate": `${todayDate?.split("-")[1]}/${todayDate?.split("-")[2]}/${todayDate?.split("-")[0]}`,
                "deviceToken": `${deviceT}`,
                "procastingstatusid": `${validateTypeColor?.procastingstatusid ?? ''}`
            }

            let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

            let body = {
                "con": `{\"id\":\"\",\"mode\":\"ADDJOBTOTREE\",\"appuserid\":\"${empData?.empuserid}\"}`,
                "p": `${ecodedbodyparam}`,
                "f": "formname (album)"
            }

            await CommonAPI(body).then((res) => {
                if (res?.Data.rd[0].stat == 1) {
                    console.log("res", res?.Data.rd[0])
                    localStorage.setItem("SavedTree", JSON.stringify([res?.Data.rd[0]]))
                    setAddTreeResp(res?.Data.rd[0])
                    toast.success("Tree Added Successfully!!")
                } else {
                    toast.error(res?.Data.rd[0]?.stat_msg)
                }
            }).catch((err) => console.log("AddJobToTree Err::", err))
        }
    }

    console.log('rightjobs', rightJobs)

    const handleDeleteJobFromTree = async (jobno) => {

        let empData = JSON.parse(localStorage.getItem("getemp"))
        let SavedTree = JSON.parse(localStorage.getItem("SavedTree"))
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

        let bodyparam = {
            "castuniqueno": `${editTree?.length ? editTree[0]?.CastUniqueno : SavedTree[0]?.CastUniqueno}`,
            "serialjobno": `${editTree?.length > 0 ? jobno?.job : jobno}`,
            "partno": "",
            "empid": `${empData?.empid}`,
            "empuserid": `${empData?.empuserid}`,
            "empcode": `${empData?.empcode}`,
            "deviceToken": `${deviceT}`
        }

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

        let body = {
            "con": `{\"id\":\"\",\"mode\":\"DELJOBFROMTREE\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (album)"
        }


        let RemoveFromArr = false;

        await CommonAPI(body).then((res) => {
            if (res?.Data.rd[0].stat == 1) {
                RemoveFromArr = true
                console.log("resinapi", res)
            } else {
                toast.error(res?.Data.rd[0]?.stat_msg)
            }
        }).catch((err) => {
            RemoveFromArr = false;
            console.log("err", err)
        })

        return RemoveFromArr
    }

    const handleRemarkApi = async () => {
        if (remark?.length && AddTreeResp) {

            setOpen(false);
            setShowEnteredValue(true);

            let empData = JSON.parse(localStorage.getItem("getemp"))
            let SavedTree = JSON.parse(localStorage.getItem("SavedTree"))
            let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

            let bodyparam = {
                "castuniqueno": `${AddTreeResp?.CastUniqueno}`,
                "castRemark": `${remark}`,
                "deviceToken": `${deviceT}`
            }

            let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

            let body = {
                "con": `{\"id\":\"\",\"mode\":\"SAVETREEREMARK\",\"appuserid\":\"${empData?.empuserid}\"}`,
                "p": `${ecodedbodyparam}`,
                "f": "formname (album)"
            }

            await CommonAPI(body).then((res) => {
                if (res?.Data.rd[0].stat == 1) {
                    toast.success('Remark added successfully!')
                    setFinalTreeRemark(remark)
                } else {
                    setRemark("")
                    toast.error("Something Went Wrong!! Try Again !!")
                }
            })
        } else {
            toast.error("Tree Doesn't save!! Fisrt Save the Tree!! ")
        }

    }

    const handlePhotoUpload = async () => {

        if (CurrentImageValue) {

            let empData = JSON.parse(localStorage.getItem("getemp"))
            let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken
            let SavedTree = JSON.parse(localStorage.getItem("SavedTree"))

            let bodyparam = {
                "castuniqueno": `${SavedTree[0]?.CastUniqueno}`,
                "treePhoto": CurrentImageValue,
                "empid": `${empData?.empid}`,
                "empuserid": `${empData?.empuserid}`,
                "empcode": `${empData?.empcode}`,
                "deviceToken": `${deviceT}`
            }

            let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

            let body = {
                "con": `{\"id\":\"\",\"mode\":\"SAVETREEPHOTO\",\"appuserid\":\"${empData?.empuserid}\"}`,
                "p": ecodedbodyparam,
                "f": "formname (album)"
            }

            await CommonAPI(body).then((res) => {
                if (res?.Data.rd[0].stat == 1) {
                    toast?.success("Image Successfully uploaded!!")
                } else {
                    toast?.error("something Went Wrong!! Please Try Again!!")
                }
            }).catch((err) => {
                toast.error(err)
            })
        } else {
            toast.warn("Image Not Uploaded!!")
        }
    }

    const handleUpdateWeightApi = async () => {

        let empData = JSON.parse(localStorage.getItem("getemp"))
        let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken
        let SavedTree = JSON.parse(localStorage.getItem("SavedTree"))

        let bodyparam = {

            "castuniqueno": `${SavedTree?.length > 0 ? SavedTree[0]?.CastUniqueno : editTree[0]?.CastUniqueno}`,
            "treeWeight": inputWightValue ?? 0,
            "empid": `${empData?.empid}`,
            "empuserid": `${empData?.empuserid}`,
            "empcode": `${empData?.empcode}`,
            "deviceToken": `${deviceT}`
        }

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

        let body = {
            "con": `{\"id\":\"\",\"mode\":\"UPDATETREEWT\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": ecodedbodyparam,
            "f": "formname (album)"
        }

        await CommonAPI(body).then((res) => {
            if (res?.Data.rd[0].stat == 1) {
                toast?.success("Tree Weight Successfully updated!!")
            } else {
                toast?.error("something Went Wrong!! Please Try Again!!")
            }
        }).catch((err) => {
            toast.error(err)
        })

    }

    const handleAddJobTree = () => {
        const jobIds = rightJobs?.map(item => item?.jobId)
            ?.filter(jobId => jobId !== undefined && jobId !== null && jobId !== '');
        if (jobIds && jobIds.length > 0) {
            AddToJobTree();
        } else {

            toast.success("Your tree data is saved successfully.");
        }
        handlePhotoUpload();
        setFailJobs([])
        setSaveOpen(false)
        setShowRemarkBtn(true);
    }

    useEffect(() => {
        const today = new Date()?.toISOString()?.split('T')[0];
        setTodayDate(today)
        setIsImageVisible(true)
    }, [])


    console.log("failjobs", failJobs);

    useEffect(() => {
        setEditTreeImg(JSON.parse(localStorage.getItem('EditTreePage')))
    }, [])

    const handleScan = (data) => { };
    const handleError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(false);
    };

    const handleRemoveItem = (indexToRemove) => {
        setOpenDelete(true);
        setSelectedIndex(indexToRemove);
        // setEnteredValues(enteredValues.filter((_, index) => index !== indexToRemove));
    };
    console.log("AddTreeResp?.length", AddTreeResp);

    const handleConfirmation = () => {

        console.log("deleteoption", selectedIndex, editJobs, rightJobs[selectedIndex]);

        // console.log("indexToRemove",(jobStatus=== "jobR" ? rightJobs : failJobs ).filter((_, index) => index !== selectedIndex));

        if (jobStatus === "jobR") {
            let filterData = rightJobs?.filter((_, index) => index !== selectedIndex)
            setRightJobs(filterData)

            if ((AddTreeResp && Object.keys(AddTreeResp)?.length > 0) || editTree?.length > 0) {
                handleDeleteJobFromTree(rightJobs[selectedIndex]).then((res) => {
                    if (res) {
                        let filterData = rightJobs?.filter((_, index) => index !== selectedIndex)
                        setRightJobs(filterData)
                    } else {
                        toast.error("Something Went wrong!!!")
                    }
                })
            }
        } else {
            let filterData = failJobs?.filter((_, index) => index !== selectedIndex)
            setFailJobs(filterData)
        }
        // setEnteredValues((jobStatus=== "jobR" ? rightJobs : failJobs ).filter((_, index) => index !== selectedIndex));
        setOpenDelete(false);
    };

    const handleClose = () => {
        setOpen(false);
        setShowEnteredValue(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputChangeHidden = (event) => {
        setInputValueHidden(event.target.value);
    };

    console.log('JobList', jobList)


    const handleGoButtonClick = () => {
        debugger;
        if (inputValue === '' || inputValue === undefined) {
            setInputError(true)
        } else {
            setInputError(false)

            let filterJob;
            let validateTypeAndColor = JSON.parse(localStorage.getItem("validate_Type_color"))
            debugger;
            if (rightJobs?.length === 0) {
                filterJob = jobList?.filter((ele) => (ele?.job?.includes("(") ? ele?.job?.split(" ")[0] : (ele?.job?.includes("_") ? ele?.job?.split("_")[0] : ele?.job)) == inputValue)[0]
            } else {
                filterJob = jobList?.filter((ele) => {
                    const isJobMatch = (ele?.job?.includes("(")
                        ? ele?.job?.split(" ")[0]
                        : (ele?.job?.includes("_")
                            ? ele?.job?.split("_")[0]
                            : ele?.job)) === inputValue;

                    const isMetalTypeMatch = ele?.metaltype === validateTypeColor?.metaltype;
                    const isMetalColorMatch = ele?.metalcolor === validateTypeColor?.metalcolor;
                    const isLocationNameMatch = ele?.Locationname === validateTypeColor?.Locationname;
                    const isProcastingStatusMatch = [1, 2].includes(ele?.procastingstatusid);

                    return isJobMatch && isMetalTypeMatch && isMetalColorMatch && isLocationNameMatch && isProcastingStatusMatch;
                })[0];
            }

            if (rightJobs?.length === 0) {
                // localStorage?.setItem("validate_Type_color",JSON.stringify({metaltype:filterJob?.metaltype,metalcolor:filterJob?.metalcolor}))
                setValidateTypeColor({ metaltype: filterJob?.metaltype, metalcolor: filterJob?.metalcolor, procastingstatusid: filterJob?.procastingstatusid, Locationname: filterJob?.Locationname })
            }


            if (isImageVisible) {
                if (filterJob) {
                    let duplicateJobs = rightJobs.find((ele) => ele?.job == filterJob?.job)
                    console.log("duplicateJobs", duplicateJobs)
                    if (duplicateJobs) {
                        toast.error("Alredy Job Added Into Tree", { position: 'top-left' })
                    } else {

                        setEnteredValues([...enteredValues, inputValue])
                        setRightJobs((prev) => [
                            ...prev,
                            { id: filterJob?.id, jobId: filterJob?.id, job: filterJob?.job, procastingstatusid: filterJob?.procastingstatusid }
                        ]);
                        // setEditJobs((prev)=>[...prev,{id:filterJob?.id,job:filterJob?.job}])
                    }
                } else {
                    let failjobs = jobList?.filter((ele) => (ele?.job?.includes("(") ? ele?.job?.split(" ")[0] : (ele?.job?.includes("_") ? ele?.job?.split("_")[0] : ele?.job)) == inputValue)[0]
                    setFailJobs((prev) => [...prev, { id: failjobs?.id ?? 0, job: failjobs?.job ?? inputValue }])
                }
            }
            setInputValue('');
        }
    };

    const handleGoButtonClickHidden = () => {

        if (inputValueHidden === '' || inputValueHidden === undefined) {
            setInputError(true)
        } else {
            setInputError(false)

            let filterJob;
            let validateTypeAndColor = JSON.parse(localStorage.getItem("validate_Type_color"))

            if (rightJobs?.length === 0) {
                filterJob = jobList?.filter((ele) => (ele?.job?.includes("(") ? ele?.job?.split(" ")[0] : (ele?.job?.includes("_") ? ele?.job?.split("_")[0] : ele?.job)) == inputValueHidden)[0]
            } else {
                filterJob = jobList?.filter((ele) => (ele?.job?.includes("(") ? ele?.job?.split(" ")[0] : (ele?.job?.includes("_") ? ele?.job?.split("_")[0] : ele?.job)) == inputValueHidden && ele?.metaltype == (validateTypeColor?.metaltype) && ele?.metalcolor == (validateTypeColor?.metalcolor) && ele?.Locationname == (validateTypeColor?.Locationname))[0]
            }

            if (rightJobs?.length === 0) {
                // localStorage?.setItem("validate_Type_color",JSON.stringify({metaltype:filterJob?.metaltype,metalcolor:filterJob?.metalcolor}))
                setValidateTypeColor({ metaltype: filterJob?.metaltype, metalcolor: filterJob?.metalcolor, procastingstatusid: filterJob?.procastingstatusid, Locationname: filterJob?.Locationname })
            }


            if (!isImageVisible) {
                // console.log("rightJobsfilterJob",filterJob)

                if (filterJob) {
                    let duplicateJobs = rightJobs.find((ele) => ele?.job == filterJob?.job)
                    console.log("duplicateJobs", duplicateJobs)
                    if (duplicateJobs) {
                        toast.error("Alredy Job Added Into Tree", { position: 'top-left' })
                    } else {
                        setEnteredValues([...enteredValues, inputValueHidden])
                        setRightJobs((prev) => [...prev, { id: filterJob?.id, jobId: filterJob?.id, job: filterJob?.job }])
                        // setEditJobs((prev)=>[...prev,{id:filterJob?.id,job:filterJob?.job}])
                    }
                } else {
                    let failjobs = jobList?.filter((ele) => (ele?.job?.includes("(") ? ele?.job?.split(" ")[0] : (ele?.job?.includes("_") ? ele?.job?.split("_")[0] : ele?.job)) == inputValueHidden)[0]
                    setFailJobs((prev) => [...prev, { id: failjobs?.id ?? 0, job: failjobs?.job ?? inputValueHidden }])
                }
            }
            setInputValueHidden('');
        }
    };

    // console.log("rightJobsfilterJob",isImageVisible)

    const totalValues = enteredValues.length;


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

    const handleMoreInfoShow = () => {
        setDialogOpen(true)
        // if (addLsit === false) {
        //     setAddLsit(true);
        //     let newData = ['1/1111', '2/2222', '3/3333', '4/4444']
        //     setEnteredValues([...enteredValues, ...newData]);
        // }
    }

    const handlePrintDialogShow = () => {
        setShowPrDialog(true);
    }

    const handleInputWeightChange = (event) => {
        const { value } = event.target;
        if (value === '') {
            setTreeFlag(false);
            setInputWeightValue(value);
        } else if (parseFloat(value) > 0) {
            setTreeFlag(true);
            const newValue = value.replace(/\D/g, '');

            if (newValue.length <= 5) {
                setInputWeightValue(value);
            }
        } else if (parseFloat(value) <= 0) {
            toast.error("Weight must be greater than 0");
        }
    };

    const handleSaveNew = () => {
        sessionStorage.removeItem('remark');
        window.location.href = '/homeone';
    }

    const handleSave = () => {
        setSaveOpen(true)
    }

    const toggleImageVisibility = () => {
        // let safe = ScanRef.current

        if (ScanRef.current && !treeFlag) {
            ScanRef.current.focus();
        }

    };

    useEffect(() => {
        if (rightJobs?.length) {
            const uniqueArray = [...new Set(rightJobs)];
            setRightJobs(uniqueArray)
        }
        console.log("duplicateArr", rightJobs);
    }, [enteredValues])


    const [openRemakModal, setOpenRemarkModal] = useState(false);
    const handleOpenRemark = () => setOpenRemarkModal(true);
    const handleRemarkMClose = () => setOpenRemarkModal(false);


    return (
        <>
            <Dialog
                open={saveOpen}
                onClose={() => setSaveOpen(false)}
                maxWidth
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Are you want to Save ?
                </DialogTitle>
                <DialogActions>
                    <Button style={{ backgroundColor: 'black', color: 'white', textTransform: 'capitalize' }} onClick={handleAddJobTree}>save</Button>
                    <Button style={{ backgroundColor: 'black', color: 'white', textTransform: 'capitalize' }} onClick={() => setSaveOpen(false)}>close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={saveWtOpen}
                onClose={() => setSaveWtOpen(false)}
                maxWidth
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Enter Tree Weight
                </DialogTitle>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <input
                        type='number'
                        autoFocus
                        step="any"
                        value={inputWightValue}
                        onChange={handleInputWeightChange}
                        placeholder='TreeWeight'
                        className='infoTextInputWight'
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                setShowBtnFlag(true)
                                if (Object.keys(AddTreeResp)?.length > 0 || editTree?.length > 0) {
                                    handleUpdateWeightApi()
                                }
                                if (inputWightValue) {
                                    setFinalWeight(inputWightValue)
                                }
                                setSaveWtOpen(false)
                            }
                        }}
                    />
                    <Button
                        style={{ backgroundColor: 'black', color: 'white', textTransform: 'capitalize' }}
                        onClick={() => {
                            setSaveWtOpen(false)
                            setShowBtnFlag(true)
                            console.log("condition", Object.keys(AddTreeResp)?.length > 0, editTree?.length > 0);
                            if (Object.keys(AddTreeResp)?.length > 0 || editTree?.length > 0) {
                                handleUpdateWeightApi()
                            }
                            if (inputWightValue) {
                                setFinalWeight(inputWightValue)
                            }
                        }
                        }>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"ADD THE REMARK"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <textarea type='text' autoFocus onChange={(e) => setRemark(e.target.value)} value={remark} placeholder='Enter Remark' className='addReamrkTextBox' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemarkApi} style={{ backgroundColor: 'black', color: 'white' }}>ADD</Button>
                </DialogActions>
            </Dialog>
            <DeleteTreeModal
                open={openDelete}
                onClose={handleCloseDelete}
                title="ARE YOU SURE TO DELETE ?"
                onconfirm={handleConfirmation}
                onclickDelete={handleClickOpenDelete}
            />


            <BarcodeScanner
                onScan={handleScan}
                onError={handleError}
            />

            <div>
                <div className="TopBtnDivMainOneV2">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CgProfile style={{ height: '30px', width: '30px', marginLeft: '15px' }} onClick={handleClick} />



                        <p className='headerV2Title' >CREATE NEW BATCH</p>
                        {openMenu &&
                            <ProfileMenu open={openMenu} anchorEl={anchorEl} handleClose={handleMenuClose} />
                        }
                    </div>
                    <div>
                        {totalValues !== 0 && <p className='FixedGoldColorText'>{validateTypeColor?.metaltype} {validateTypeColor?.metalcolor}</p>}
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
                <div style={{ display: 'flex', marginTop: '0px', flexWrap: 'wrap' }} className='body_container'>
                    <div className='scaneUploadMain'>
                        <div className='createORMain' >
                            <div onClick={toggleImageVisibility} style={{ width: 'fit-content', marginLeft: isImageVisible ? '30px' : '2px', position: 'relative' }}>
                                {!isImageVisible ? <div>
                                    <img src={scaneCodeImage} className='createImageQrCode' />
                                </div> :
                                    <div style={{ marginLeft: '12px' }}>
                                        <img src={idle} />
                                    </div>}
                                <div>
                                    {isImageVisible && <p style={{ fontWeight: 'bold', marginLeft: '-30px', marginTop: '-12px' }}> <span style={{ color: 'red' }}>Click</span> On The Image For Scan<span style={{ color: 'red' }}>*</span></p>}

                                    <input
                                        type='text'
                                        id="hiddeninp"
                                        ref={ScanRef}
                                        onBlur={() => { setIsImageVisible(true) }}
                                        onFocus={() => setIsImageVisible(false)}
                                        value={inputValueHidden}
                                        // onInput={handleInputChangeHidden} 
                                        onChange={handleInputChangeHidden}
                                        onKeyDown={handleKeyDownHidden}
                                        style={{ width: '20px', position: 'absolute', top: '80px', left: '50px', zIndex: -1 }}
                                        disabled={showRemarkBtn && AddTreeResp?.stat === 1}
                                    />

                                    <button style={{
                                        position: "absolute",
                                        left: "50px",
                                        top: "70px",
                                        zIndex: -1,
                                    }}
                                        disabled={showRemarkBtn && AddTreeResp?.stat === 1}
                                    >c</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <input
                                    type='text'
                                    value={inputValue}
                                    style={{ border: inputError && '1px solid red' }}
                                    className='enterBrachItemBox'
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    disabled={showRemarkBtn && AddTreeResp?.stat === 1}
                                />
                                <Button
                                    variant='contained'
                                    className='createGoBtn'
                                    style={{ color: 'white', backgroundColor: 'black', borderRadius: '0px' }}
                                    onClick={handleGoButtonClick}
                                    disabled={showRemarkBtn && AddTreeResp?.stat === 1}
                                >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>GO</Typography>
                                </Button>
                            </div>
                            <input
                                value={todayDate}
                                onChange={(e) => setTodayDate(e.target.value)}
                                type="date"
                                style={{
                                    border: "1px solid #b8b8b8",
                                    borderRadius: '5px',
                                    outline: "none",
                                    width: "150px",
                                    height: "35px",
                                    color: 'black',
                                    backgroundColor: 'white',
                                    fontSize: '21px',
                                    marginTop: '15px'
                                }}
                            />
                            <input type='text' placeholder='Batch' disabled value={`${editTree?.length > 0 ? editTree[0]?.CastBatchNo : location?.state?.CastBatch}`} style={{ marginTop: '15px', textAlign: 'center' }} className='infoTextInputBatch' />
                            {ShowBtnFlag && finalWeight && <>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    {/* <input type='number' value={inputWightValue} style={{ marginTop: '15px', border: treeFlag && '1px solid red' }} onChange={handleInputWeightChange} placeholder='Tree Weight' className='infoTextInputWight' /> */}
                                    <input
                                        type='text'
                                        disabled
                                        value={finalWeight}
                                        style={{ marginTop: '15px', border: 'none', textAlign: 'center' }}
                                        // onChange={handleInputWeightChange} 
                                        className='infoTextInputWight'
                                    />
                                    {/* {treeFlag && <small style={{ color: 'red', marginLeft: '6px' }}>enter tree weight*</small>} */}

                                </span>
                            </>}
                            {finalWeight && (
                                <>
                                    {AddTreeResp?.stat === 1 && showRemarkBtn ? (
                                        <button className="saveEndNewBtn" onClick={handleSaveNew}>
                                            Save & New
                                        </button>
                                    ) : (
                                        <button className="saveEndNewBtn" onClick={handleSave}>
                                            Save
                                        </button>
                                    )}
                                </>
                            )}

                        </div>
                        <div className='allScaneDataMain' style={{ position: 'relative' }}>
                            <div style={{ display: 'flex' }}>
                                <p className='totalItemText'>{rightJobs?.length + failJobs?.length}</p>
                                <p className='totalItemTextTrue' onClick={() => { if (rightJobs?.length) setJobStatus("jobR"); else setJobStatus("jobF") }} >{rightJobs?.length}</p>
                                <p className='totalItemTextFail' onClick={() => { if (failJobs?.length) setJobStatus("jobF"); else setJobStatus("jobR") }} >{failJobs?.length}</p>

                            </div>

                            <div className='CreateDataMain'>
                                {(jobStatus === "jobR" ? rightJobs : failJobs)?.map((value, index) => (
                                    <div className='allScandataMain' >
                                        {value?.job?.includes("(") ? <img src={multimatel} alt={"multimatel"} style={{ width: '40px' }} /> : null}
                                        <p className='allScanData' style={{ border: jobStatus === "jobF" && '2px solid #FF0000', backgroundColor: jobStatus === "jobF" && '#ff8787' }} key={index}>{value?.job?.includes("(") ? value?.job?.split(" ")[0] : value?.job?.includes("_") ? value?.job?.split("_")[0] : value?.job}</p>
                                        <RemoveCircleRoundedIcon style={{ color: '#FF0000', cursor: 'pointer', fontSize: '30px' }} onClick={() => handleRemoveItem(index)} />
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: enteredValues.length ? 'block' : 'none', position: 'absolute', bottom: '-40px' }}>
                                <button className="saveEndNewBtn" style={{ width: '180px', marginTop: '5px' }} onClick={() => setSaveWtOpen(true)}>Save & Add Weight</button>
                            </div>
                        </div>
                    </div>
                    <div className='uplodedImageMain'>
                        <img src={CurrentImageValue ? CurrentImageValue : editTreeImg === true ? EditTreeImg : castingTree} className={CurrentImageValue ? 'uplodedImage' : editTreeImg === true ? 'uploadDefaultImg' : 'uplodedImageProfile'} />
                        <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-around' }}>
                            {(rightJobs?.length + failJobs?.length >= 1) && (
                                <button className='uploadImageBtnV2' onClick={() => setCamFlag(true)}>
                                    {editTreeImg ? 'Edit Tree' : 'Upload Tree'}
                                </button>
                            )}
                            {showRemarkBtn &&
                                <button className="homeNoteTitleV2" onClick={handleClickOpen}>
                                    Remark
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <Tooltip
                    title={
                        <div style={{ color: 'white', borderRadius: '4px' }}>
                            {rightJobs?.map((item) => (
                                <span
                                    key={item?.job}
                                    style={{
                                        display: 'block',
                                        border: '1px solid white',
                                        padding: '4px',
                                        marginBottom: '5px',
                                        borderRadius: '2px',
                                    }}
                                >
                                    {item?.job}
                                </span>
                            ))}
                        </div>
                    }
                    arrow
                    placement="right"
                    sx={{
                        backgroundColor: '#333',
                    }}
                >
                    <button className="showInfoBtn" onClick={handleMoreInfoShow}>
                        <IoInformationCircleSharp style={{ color: 'white', height: '25px', width: '25px', marginLeft: '-7px' }} />
                    </button>
                </Tooltip>
                {/* <button
                    className="printQRBtn"
                    onClick={() => { if (Object.keys(AddTreeResp)?.length > 0 || editTree?.length > 0) { navigation("/printQr", { state: { castuniqueno: editTree?.length > 0 ? editTree[0]?.CastUniqueno : AddTreeResp?.CastUniqueno } }) } else { toast.error("First Save The Tree Jobs") } }}
                >
                    <IoPrint style={{ color: 'white', height: '25px', width: '25px', marginLeft: '-7px' }} />
                </button> */}
                <button
                    className="printQRBtn"
                    onClick={handlePrintDialogShow}
                >
                    <IoPrint style={{ color: 'white', height: '25px', width: '25px', marginLeft: '-7px' }} />
                </button>
                <div className='createFooterMain'>

                    {(showEnteredValue || finalTreeRemark) && (
                        <p className='homeRemarkDesc' style={{ height: 'fit-content' }}>
                            <Typography sx={{ fontSize: '20px', color: 'darkgreen', fontWeight: '600' }}>Remark:</Typography>&nbsp;
                            <Typography sx={{ fontSize: '20px', color: '#000' }}>{finalTreeRemark?.slice(0, 100)}</Typography>
                            {finalTreeRemark?.split(' ').length > 30 && (
                                <Button onClick={handleOpenRemark} sx={{ textDecoration: 'underline', color: 'green' }}>
                                    See More
                                </Button>
                            )}
                        </p>
                    )}
                    <div>
                        <p className="homeNoteDesc">
                            Note*:
                            <b>
                                Use Wired or Wireless Barcode/QR scanner,Not Use TAB Camera
                            </b>
                        </p>
                    </div>
                </div>
            </div>
            <RemarksModal
                open={openRemakModal}
                handleClose={handleRemarkMClose}
                remarks={finalTreeRemark}
            />
            <InfoDialogModal
                open={dialogOpen}
                onClose={handleCloseDialog}
                rightJobs={rightJobs} />

            <PrintQRCodeDialog
                open={showPrintDialog}
                onClose={handleCloseDialog}
                rightJobs={rightJobs}
                castuniqueno={editTree?.length > 0 ? editTree[0]?.CastUniqueno : AddTreeResp?.CastUniqueno}
            />
            <Dialog
                open={camFlag}
                fullWidth={"sm"}
                onClose={() => setCamFlag(false)}
            >
                <ImageWebCam />
            </Dialog>
        </>
    );
}   