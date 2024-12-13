import React, { useCallback, useEffect, useState } from "react";
import "./BatchListingGrid.css";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Button, Divider, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import topLogo from '../../assets/oraillogo.png';
import { CommonAPI } from '../../../Utils/API/CommonApi'
import { toast } from "react-toastify";
import ImageModal from "./ImageModal";
import { formatCustomDate } from "../../../Utils/globalFunction";
import BackButton from "../../../Utils/BackButton";
import { fetchMaster } from "../../../Utils/API/MasterGridApi";
import PrintQRCodeDialog from "../printQr/PrintQRCodeDialog";


const images = [
  { url: "https://www.google.com/imgres?q=tree%20photo%20casting&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fsilver-casting-tree-on-white-260nw-353474156.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fsilver-casting-tree-on-white-background-353474156&docid=HqdmBjKXmMfT8M&tbnid=-4P4wYNDl-wW7M&vet=12ahUKEwiIq7_lvJ-KAxVNslYBHT5-KMYQM3oECF4QAA..i&w=224&h=280&hcb=2&ved=2ahUKEwiIq7_lvJ-KAxVNslYBHT5-KMYQM3oECF4QAA" },
  { url: "https://cdnfs.optigoapps.com/content-global3/test71IBOKTQHSCLEN367X9/PROCASTING/castingtree/BI20241211013042985_castingtree.jpg" },
  { url: "https://via.placeholder.com/800x600/00FF00/FFFFFF?Text=Image3" },
];

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
  // const today = new Date()?.toISOString()?.split("T")[0];
  // const [startDate, setStartDate] = useState(today);
  // const [endDate, setEndDate] = useState(today);

  const [metalColors, setMetalColors] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [castingStatuses, setCastingStatuses] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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




  useEffect(() => {
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

    fetchBatchData();
  }, []);

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
    if (batchList) {
      let data = batchFilterList?.length !== 0 ? batchFilterList : batchList;

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const filteredData = data?.filter((item) => {
        const itemDate = new Date(item?.CastingIssDate);

        const withinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);

        const matchesMetalColor = selectedMetalColor ? item?.MetalColor.toLowerCase() === selectedMetalColor?.toLowerCase() : true;
        const matchesMetalType = selectedMetalType ? item?.MetalType.toLowerCase() === selectedMetalType?.toLowerCase() : true;
        const matchesStatus = selectedStatus ? item?.status.toLowerCase() === selectedStatus?.toLowerCase() : true;

        return withinDateRange && matchesMetalColor && matchesMetalType && matchesStatus;
      });

      setBatchFilterList(filteredData);
    }
  }, [selectedMetalType, selectedMetalColor, selectedStatus, startDate, endDate, batchList]);





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
    { field: "serialjobs", headerName: "Serial Jobs", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const { value, row } = params;
        return value === "investment issue" ? (
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
    { field: "requirepowder", headerName: "Powder Weight", width: 120 },
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
      field: "Image",
      headerName: "View",
      width: 100,
      renderCell: (params) => {
        const { value, row } = params;
        return value && (value.startsWith("http://") || value.startsWith("https://")) ? (
          <button onClick={() => handleViewClick(row)}
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
            View
          </button>
        ) : (
          "-"
        );
      }
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

  return (
    <>
      <div className="grid_head_container">
        <div className="grid_head menu" >
          <MenuRoundedIcon onClick={() => setMenuFlag(true)} sx={{ fontSize: '30px' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='headerV2Title' >BATCH LIST</p>
          </div>
        </div>

        <div className="menu_responsive">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BackButton fontSize="30px" padding='2px' />
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
                <div style={{ marginTop: "4px", marginLeft: "8px" }}>
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
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
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
            <DataGrid
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
