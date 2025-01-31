import React, { useCallback, useEffect, useState } from "react";
import "./BatchListingGrid.css";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Drawer, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Skeleton, TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import topLogo from '../../assets/oraillogo.png';
import { CommonAPI } from '../../../Utils/API/CommonApi'
import { toast } from "react-toastify";
import ImageModal from "./ImageModal";
import { formatCustomDate } from "../../../Utils/globalFunction";
import BackButton from "../../../Utils/BackButton";
import { fetchMaster } from "../../../Utils/API/MasterGridApi";
import PrintQRCodeDialog from "../printQr/PrintQRCodeDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfoDialogModal from "../Info/InfoDialogModal";
import { fetchTreeDetails } from "../../../Utils/API/GetTreeQrAPI";
import CloseIcon from '@mui/icons-material/Close';

const BatchListingGrid = () => {
  const navigate = useNavigate();
  const [menuFlag, setMenuFlag] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [batchFilterList, setBatchFilterList] = useState([]);
  const [selectedMetalType, setSelectedMetalType] = useState('');
  const [selectedMetalColor, setSelectedMetalColor] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [openImgDrawer, setOpenImgDrawer] = useState(false);
  const [showPrintDialog, setShowPrDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [metalColors, setMetalColors] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [castingStatuses, setCastingStatuses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [joblist, setJobList] = useState([]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setShowPrDialog(false);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePrintDialogShow = (rowData) => {
    setSelectedRowData(rowData);
    setShowPrDialog(true);
  }

  const handleClosePrintDialog = () => {
    setShowPrDialog(false);
  }

  const handleViewClick = (rowData) => {
    setSelectedRowData(rowData);
    setOpenImgDrawer(true);
  };
  const handleClose = () => setOpenImgDrawer(false);

  // open joblist info dialog
  const handleOpenDialog = (row) => {
    debugger
    getTreeQrData(row);
    setDialogOpen(true);
    setSelectedRowData(row);
  };

  // getTreeQr
  const [infoloding, setInfoloding] = useState(false);
  const getTreeQrData = async (row) => {
    debugger
    setInfoloding(true);
    try {
      const batchKey = row['Batch#'];
      const castuniqueno = batchKey?.split(' ')[1]?.replace(/[()]/g, '');

      const response = await fetchTreeDetails(castuniqueno);

      if (response?.Data?.rd[0]?.stat !== 0) {
        const joblistArray = response?.Data.rd[0]?.joblist?.split(',');
        const data = joblistArray.map((job) => {
          const jobId = job?.split('/')[1];
          const jobDetails = response?.Data.rd2?.find((rd2Item) => rd2Item?.serialjobno === job);
          return {
            id: jobId,
            jobId: jobId,
            job: job,
            procastingstatusid: jobDetails?.job_procastingstatusid ?? null,
            metalColor: jobDetails?.MetalColor ?? "Default",
            metaltype: `${row?.MetalType}${row?.MetalPurity ?? ''}`,
            Locationname: `${response?.Data.rd[0]?.Locationname ?? ''}`,
          };
        });
        setJobList(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setInfoloding(false);
    }
  };

  // grid master
  useEffect(() => {
    const fetchData = async () => {
      try {
        let masterApiRes;
        const masteData = sessionStorage.getItem("gridMaster");
        const data = masteData ? JSON.parse(masteData) : null;
        if (data) {
          masterApiRes = data;
        } else {
          masterApiRes = await fetchMaster();
          if (masterApiRes) {
            sessionStorage.setItem("gridMaster", JSON.stringify(masterApiRes));
          }
        }

        if (masterApiRes?.Data) {
          const { rd, rd1, rd2 } = masterApiRes.Data;
          setMetalColors(rd || []);
          setMetalTypes(rd1 || []);
          setCastingStatuses(rd2 || []);
        }
      } catch (error) {
        console.error('Error fetching master data:', error);
      }
    };

    fetchData();
  }, []);

  // tree list api
  const fetchBatchData = async () => {
    setLoading(true);
    try {
      const deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;
      const bodyparam = { deviceToken: deviceT };
      const encodedBodyParam = btoa(JSON.stringify(bodyparam));
      const body = {
        con: `{\"id\":\"\",\"mode\":\"TREELIST\",\"appuserid\":\"\"}`,
        p: encodedBodyParam,
        f: "formname (album)"
      };

      const res = await CommonAPI(body);
      if (res) {
        const ListData = res?.Data?.rd;
        ListData.forEach((ele, i) => {
          ele.id = i + 1;
          ele.CastingIssDate = ele.CastingIssDate.split('T')[0];
          replaceEmptyStrings(ele);
        });
        setBatchList(ListData);
      }
    } catch (err) {
      console.error("GETTREELIST ERROR", err);
      toast.error("Something went wrong, please try again!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBatchData();
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    fetchBatchData();
  };

  const replaceEmptyStrings = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === "") {
        obj[key] = "-";
      }
    });
  };

  const handleSearch = (e) => {
    const query = e.target?.value?.toLowerCase();
    const filteredResults = batchList?.filter(item =>
      Object.values(item)?.some(value =>
        value?.toString()?.toLowerCase()?.includes(query)
      )
    );
    setBatchFilterList(filteredResults);
  };

  useEffect(() => {
    const filterData = () => {
      let data = batchList;
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const filteredData = data.filter((item) => {
        const itemDate = new Date(item?.CastingIssDate);
        const withinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);
        const matchesMetalColor = selectedMetalColor ? item?.MetalColor.toLowerCase() === selectedMetalColor?.toLowerCase() : true;
        const matchesMetalType = selectedMetalType ? item?.MetalType.toLowerCase() === selectedMetalType?.toLowerCase() : true;
        const matchesStatus = selectedStatus ? item?.status.toLowerCase() === selectedStatus?.toLowerCase() : true;
        return withinDateRange && matchesMetalColor && matchesMetalType && matchesStatus;
      });

      setBatchFilterList(filteredData);
    };

    if (batchList.length > 0) {
      filterData();
    }
  }, [startDate, endDate, selectedMetalColor, selectedMetalType, selectedStatus, batchList]);


  const handleresetFilter = () => {
    setSelectedMetalType('');
    setSelectedMetalColor('');
    setSelectedStatus('');
    setStartDate('');
    setEndDate('');
  };


  const columns = [
    { field: "id", headerName: "Sr#", width: 80 },
    {
      field: "CastingIssDate",
      headerName: "Date",
      width: 130,
      valueFormatter: (params) => formatCustomDate(params.value),
    },
    { field: "Batch#", headerName: "Batch#", width: 130 },
    { field: "Barcode", headerName: "Employee", width: 130 },
    { field: "TreeWt", headerName: "Tree Wt", width: 100 },
    { field: "Investment", headerName: "Department batch no#", width: 170 },
    { field: "MetalType", headerName: "Metal Type", width: 130 },
    { field: "MetalColor", headerName: "Metal Color", width: 130 },
    {
      field: "serialjobs",
      headerName: "Serial Jobs",
      width: 100,
      renderCell: (params) => {
        const { value, row } = params;
        return value ? (
          <button onClick={() => handleOpenDialog(row)}
            className="button-print"
            style={{
              color: 'blue',
              textDecoration: 'underline',
              textTransform: 'capitalize',
              padding: '0px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {value}
          </button>
        ) : (
          "-"
        );
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const { value, row } = params;
        return value?.toLowerCase() === "investment issue" ? (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/investmentFirst?flask=${row?.flaskbarcode}`, { state: { ...row } });
            }}
            style={{ color: 'blue', textDecoration: 'underline', textTransform: 'capitalize' }}
          >
            {value}
          </a>
        ) : (
          value
        );
      }
    },
    { field: "Issuewt", headerName: "Issue", width: 100 },
    { field: "Returnwt", headerName: "Return", width: 100 },
    { field: "powderwt", headerName: "Powder Weight", width: 120 },
    { field: "metalwtpure", headerName: "Metal Wt(pure)", width: 130 },
    { field: "alloywt", headerName: "Alloy Wt(pure)", width: 130 },
    { field: "flaskbarcode", headerName: "Flask", width: 100 },
    // { field: "LabelPrint", headerName: "Label Print", width: 100 },
    {
      field: "LabelPrint",
      headerName: "Label Print",
      width: 100,
      renderCell: (params) => {
        const { value, row } = params;
        return value ? (
          <button onClick={() => handlePrintDialogShow(row)}
            className="button-print"
            style={{
              color: 'blue',
              textDecoration: 'underline',
              textTransform: 'capitalize',
              padding: '0px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Print
          </button>
        ) : (
          "-"
        );
      }
    },
    {
      field: "View",
      headerName: "View",
      width: 100,
      renderCell: (params) => {
        const imageValue = params.row.Image;
        const investmentPhotoValue = params.row.investmentphoto;
        const validImageURL =
          (imageValue && (imageValue.startsWith("http://") || imageValue.startsWith("https://"))) ||
          (investmentPhotoValue &&
            (investmentPhotoValue.startsWith("http://") || investmentPhotoValue.startsWith("https://")));

        return validImageURL ? (
          <button
            onClick={() => handleViewClick(params.row)}
            className="button-print"
            style={{
              color: "blue",
              textDecoration: "underline",
              textTransform: "capitalize",
              padding: "0px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    }

  ];

  const GridHeadDate = useCallback(() => (
    <>
      <div>
        <label>Date: &nbsp;</label>
        <input
          type="date"
          style={{ border: "1px solid #e2e2e2", outline: "none", width: "120px", height: "30px", borderRadius: "8px" }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>&nbsp;&nbsp;To: &nbsp;</label>
        <input
          type="date"
          style={{ border: "1px solid #e2e2e2", outline: "none", width: "120px", height: "30px", borderRadius: "8px" }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </>
  ), [startDate, endDate]);

  const GridHeadSelect = useCallback(() => (
    <>
      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginLeft: '12px' }}>
        <label>Metal Type</label>
      </div>
      <div style={{ marginLeft: '12px' }}>
        <select
          style={{ width: '150px', height: '30px', padding: '4px', backgroundColor: '#fff', border: '1px solid #e2e2e2', borderRadius: '6px' }}
          onChange={(e) => setSelectedMetalType(e.target.value)}
          value={selectedMetalType}
        >
          <option value="">All Type</option>
          {metalTypes && metalTypes?.map(({ id, metaltype }) => (
            <option key={id} value={metaltype}>
              {metaltype}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginLeft: '12px' }}>
        <label>Metal Color</label>
      </div>
      <div style={{ marginLeft: '12px' }}>
        <select
          style={{ width: '150px', height: '30px', padding: '4px', backgroundColor: '#fff', border: '1px solid #e2e2e2', borderRadius: '6px' }}
          onChange={(e) => setSelectedMetalColor(e.target.value)}
          value={selectedMetalColor}
        >
          <option value="">All Colors</option>
          {metalColors && metalColors?.map(({ id, metalcolorname }) => (
            <option key={id} value={metalcolorname}>
              {metalcolorname}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginLeft: '12px' }}>
        <label>Status</label>
      </div>
      <div style={{ marginLeft: '12px' }}>
        <select
          style={{ width: '150px', height: '30px', padding: '4px', backgroundColor: '#fff', border: '1px solid #e2e2e2', borderRadius: '6px' }}
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
        >
          <option value="">All Status</option>
          {castingStatuses && castingStatuses?.map(({ id, procasting_process_statusname }) => (
            <option key={id} value={procasting_process_statusname}>
              {procasting_process_statusname}
            </option>
          ))}
        </select>
      </div>
    </>
  ), [selectedMetalColor, selectedMetalType, selectedStatus, metalColors, metalTypes, castingStatuses]);

  /// info modal

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMetalColors, setSelectedMetalColors] = useState('all');
  const [selectedStatuss, setSelectedStatuss] = useState('all');
  const itemsPerPage = 5;

  // Filter the jobs based on the selected metal color and status
  const filteredJobs = joblist?.filter((item) => {
    const matchesMetalColor =
      selectedMetalColors === 'all' || item?.metalColor === selectedMetalColors;
    const matchesStatus =
      selectedStatuss === 'all' || item?.procastingstatusid === parseInt(selectedStatuss);
    return matchesMetalColor && matchesStatus;
  });

  const metalColorss = [...new Set(joblist?.map((item) => item?.metalColor))];

  const totalPages = Math.ceil((filteredJobs?.length || 0) / itemsPerPage);
  const currentJobs = filteredJobs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleMetalColorChange = (event) => {
    setSelectedMetalColors(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setSelectedStatuss(event.target.value);
    setCurrentPage(1);
  };

  const getStatusStyles = (statusId) => {
    switch (statusId) {
      case 1:
        return { backgroundColor: '#cef6ce', color: '#000' };
      case 2:
        return { backgroundColor: '#a396c8', color: '#fff' };
      default:
        return { backgroundColor: 'white', color: '#000' };
    }
  };


  const columnss = [
    {
      field: 'job',
      headerName: 'Job ID',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'metalColor',
      headerName: 'Metal Color',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const styles = getStatusStyles(params.row.procastingstatusid);
        const label = params.row.procastingstatusid === 1 ? 'Wax' : 'Regular';
        return (
          <div
            style={{
              ...styles,
              padding: '5px 10px',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            {label}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="grid_head_container">
        <div className="grid_head menu" >
          <div className="HomeBtnMo">
            <BackButton fontSize="30px" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='headerV2Title' >BATCH LIST</p>
          </div>
        </div>

        <div className="menu_responsive">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="HomeBtnPc">
              <BackButton fontSize="30px" />
            </div>
            <div className="fileIconBtn">
              <FilterAltIcon
                onClick={() => setMenuFlag(true)}
                sx={{
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div className="grid_head date">{GridHeadDate()}</div>
            <div className="grid_head select_metaltype">{GridHeadSelect()}</div>
            <div className="grid_head_search">
              <div
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e2e2",
                  borderRadius: "6px",
                  display: "flex",
                  // boxShadow: '2px 4px 3px #dbdbdb',
                }}
                className="grid_search"
              >
                <div style={{ marginTop: "4px", marginLeft: "8px" }} >
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    backgroundColor: "#fff",
                    outline: "none",
                    border: "none",
                    height: "30px",
                    width: "280px",
                    borderRadius: "6px",
                    paddingInlineStart: "12px",
                  }}
                  className="grid_searchInput"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="resetBtn">
              <Button
                variant="outlined"
                onClick={handleresetFilter}
                // startIcon={<RefreshIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: 'rgb(226, 226, 226)',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#fff',
                    borderColor: 'rgb(226, 226, 226)',
                  },
                }}
              >
                All
              </Button>
            </div>
            {/* <div className="refressBtn">
            <Button
              variant="outlined"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'rgb(226, 226, 226)',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#fff',
                  borderColor: 'rgb(226, 226, 226)',
                },
              }}
            >
              Refresh
            </Button>
            </div> */}
          </div>

          <div
            style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}
            onClick={() => navigate("/homeone")}
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
      </div>
      {loading ? (
        <div style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: '600' }}>Loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%" }} className="DataGridTable">
            {/* <DataGrid
              rows={batchFilterList}
              columns={columns?.map((column) => ({
                ...column,
                headerClassName: "customHeaderCell",
                disableColumnMenu: true,
              }))}
              initialState={{
                ...batchFilterList.initialState,
                pagination: { paginationModel: { pageSize: 20 } },
              }}
              pageSizeOptions={[20, 30, 50, 100]}
              checkboxSelection={false}
              className="mui_DataGridCl"
            /> */}

            <DataGrid
              rows={batchFilterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
              columns={columns?.map((column) => ({
                ...column,
                headerClassName: "customHeaderCell",
                disableColumnMenu: true,
              }))}
              checkboxSelection={false}
              className="mui_DataGridCl"
              components={{
                Footer: () => (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px 20px' }}>
                    {/* <IconButton
                      onClick={handleRefresh}
                    >
                      <RefreshIcon />
                    </IconButton> */}
                    <Button
                      variant="outlined"
                      onClick={handleRefresh}
                      startIcon={<RefreshIcon />}
                      sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        borderColor: 'rgb(226, 226, 226)',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#fff',
                          borderColor: 'rgb(226, 226, 226)',
                        },
                      }}
                    >
                      Refresh
                    </Button>
                    <TablePagination
                      component="div"
                      count={batchFilterList?.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[20, 30, 50, 100]}
                    />
                  </div>
                ),
              }}
            />
          </div>
        </div>
      )}
      <PrintQRCodeDialog
        open={showPrintDialog}
        onClose={handleClosePrintDialog}
        rightJobs={selectedRowData}
        castuniqueno={selectedRowData?.['Batch#']?.match(/\((\d+)\)/)?.[1]}
      />

      {/* <InfoDialogModal
        open={dialogOpen}
        onClose={handleCloseDialog}
        rightJobs={joblist} /> */}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            paddingBottom: '10px',
            minWidth: '300px',
            borderRadius: '10px',
            minHeight: '310px',
            // padding:'10px 20px 10px 20px'
          },
        }}
      >
        <>
          {/* {joblist?.length !== 0 && */}
          <>
            <DialogTitle>
              All Job Listings
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                style={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
              {infoloding ? <div style={{ padding: '26px 24px', display: 'flex', justifyContent: 'end' }}><Skeleton variant="rectangular" width='40%' height='30px' /> </div> :
                <Box display="flex" justifyContent="flex-end">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel>Metal Color</InputLabel>
                    <Select
                      value={selectedMetalColors}
                      onChange={handleMetalColorChange}
                      label="Metal Color"
                      size="small"
                    >
                      <MenuItem value="all">All</MenuItem>
                      {metalColorss?.map((color, index) => (
                        <MenuItem key={index} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedStatuss}
                      onChange={handleStatusChange}
                      label="Status"
                      size="small"
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="1">Wax</MenuItem>
                      <MenuItem value="2">Regular</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              }
            </DialogTitle>
            {infoloding ? <div style={{ padding: '26px 24px' }}><Skeleton variant="rectangular" width='100%' height='140px' /> </div> :
              <DialogContent sx={{ padding: '26px 24px' }}>
                <div style={{ width: '100%' }}>
                  <DataGrid
                    rows={currentJobs || []}
                    columns={columnss?.map((column) => ({
                      ...column,
                      headerClassName: 'customInfoHeaderCells',
                      disableColumnMenu: true,
                    }))}
                    pageSize={itemsPerPage}
                    rowsPerPageOptions={[itemsPerPage]}
                    hideFooter
                    disableColumnMenu
                    getRowId={(row) => row?.job}
                    sx={{
                      '& .MuiDataGrid-virtualScroller': {
                        minHeight: '50px',
                      },
                    }}
                  />
                </div>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </Box>
              </DialogContent>
            }
          </>
          {/* } */}
        </>
      </Dialog>

      <Drawer anchor="left" open={menuFlag} onClose={() => setMenuFlag(false)}>
        <div style={{ paddingLeft: '30px' }}>
          <h1>
            Filter
          </h1>
        </div>
        <Divider />
        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>{GridHeadDate()}</div>
          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>{GridHeadSelect()}</div>
        </div>
      </Drawer>
      <ImageModal open={openImgDrawer} onClose={handleClose} images={selectedRowData} />
    </>
  );
};

export default BatchListingGrid;
