import React, { useCallback, useEffect, useState } from "react";
import "./BatchListingGrid.css";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Divider, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import topLogo from '../../assets/oraillogo.png';
import { CommonAPI } from '../../../Utils/API/CommonApi'
import { toast } from "react-toastify";

const BatchListingGrid = () => {
  const [menuFlag, setMenuFlag] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [batchFilterList, setBatchFilterList] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedMetalType, setSelectedMetalType] = useState('');
  const [selectedMetalColor, setSelectedMetalColor] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



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
    const query = e.target.value.toLowerCase();
    const filteredResults = batchList.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(query)
      )
    );
    setBatchFilterList(filteredResults);
  };

  useEffect(() => {
    if (batchList) {
      let data = batchFilterList?.length != 0 ? batchFilterList : batchList;

      if (selectedMetalColor) {

        const matchMetalColor = data?.filter((item) => {
          return item?.MetalColor?.toLowerCase() == selectedMetalColor?.toLowerCase();

        });
        console.log("kksdjs", matchMetalColor)
        console.log("batchFilterList", batchFilterList)
        setBatchFilterList(matchMetalColor);
      }

      if (selectedMetalType) {
        const matchMetalType = data?.filter((item) => {
          return item?.MetalType?.toLowerCase() == selectedMetalType?.toLowerCase();

        });
        console.log("matchMetalType", matchMetalType)
        setBatchFilterList(matchMetalType);
      }

      if (selectedStatus) {
        const matchStatus = data?.filter((item) => {
          return item?.status?.toLowerCase() == selectedStatus?.toLowerCase();

        });
        console.log("matchStatus", matchStatus)
        setBatchFilterList(matchStatus);
      }
    }
  }, [selectedMetalType, selectedMetalColor, selectedStatus, startDate, endDate, batchList]);

  const columns = [
    { field: "id", headerName: "Sr#", width: 80 },
    { field: "CastingIssDate", headerName: "Date", width: 130 },
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
            style={{ color: 'blue', textDecoration: 'underline', textTransform:'capitalize' }}
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
    { field: "LabelPrint", headerName: "Label Print", width: 100 },
    {
      field: "Image",
      headerName: "View",
      width: 100,
      renderCell: (params) => {
        const { value } = params;
        return value && value.startsWith('data:image') ? (
          <img src={value} alt="Image" style={{ width: '100%', height: 'auto' }} />
        ) : (
          "-"
        );
      }
    },
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
          style={{ width: '150px', height: '30px', padding: '4px', backgroundColor: '#fff', border: '1px solid #1dksk', borderRadius: '6px' }}
          onChange={(e) => setSelectedMetalType(e.target.value)}
          value={selectedMetalType}
        >
          <option>All Type</option>
          <option>Gold 14K</option>
          <option>Gold 18K</option>
          <option>Gold 22K</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginLeft: '12px' }}>
        <label>Metal Color</label>
      </div>
      <div style={{ marginLeft: '12px' }}>
        <select
          style={{ width: '150px', height: '30px', padding: '4px', backgroundColor: '#fff', border: '1px solid #1dksk', borderRadius: '6px' }}
          onChange={(e) => setSelectedMetalColor(e.target.value)}
          value={selectedMetalColor}
        >
          <option>All Colors</option>
          <option>Shine Gold</option>
          <option>Yellow</option>
          <option>Rose</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginLeft: '12px' }}>
        <label>Status</label>
      </div>
      <div style={{ marginLeft: '12px' }}>
        <select
          style={{ width: '150px', height: '30px', padding: '4px', backgroundColor: '#fff', border: '1px solid #1dksk', borderRadius: '6px' }}
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
        >
          <option>All Status</option>
          <option>Investment Process</option>
          <option>Burnout Process</option>
          <option>Alloying</option>
          <option>Casting Completed</option>
        </select>
      </div>
    </>
  ), [selectedMetalType, selectedMetalColor, selectedStatus]);

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
              rows={batchFilterList?.length == 0 ? batchList : batchFilterList}
              columns={columns?.map((column) => ({
                ...column,
                headerClassName: "customHeaderCell",
              }))}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection={false}
              className="mui_DataGridCl"
            />
          </div>
        </div>
      )}
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
    </>
  );
};

export default BatchListingGrid;
