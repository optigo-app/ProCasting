import React, { useCallback, useState } from "react";
import "./BatchListingGrid.css";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Divider, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import topLogo from '../../assets/oraillogo.png'

const BatchListingGrid = () => {

  const [menuFlag, setMenuFlag] = useState(false)
  const navigation = useNavigate();

  const columns = [
    { field: "sr", headerName: "Sr#", width: 100 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "batch", headerName: "Batch#", width: 130 },
    {
      field: "employee",
      headerName: "Employee",
      width: 130,
    },
    { field: "treewt", headerName: "Tree Wt", width: 130 },
    {
      field: "departmentbatchno",
      headerName: "Department batch no#",
      width: 150,
    },
    { field: "metaltype", headerName: "Metal Type", width: 130 },
    { field: "metalcolor", headerName: "Metal Color", width: 130 },
    { field: "serialjobs", headerName: "serial Jobs", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "issue", headerName: "Issue", width: 130 },
    { field: "return", headerName: "Return", width: 130 },
    { field: "powderweight", headerName: "Powder Weight", width: 120 },
    { field: "metalwt", headerName: "Metal Wt(pure)", width: 130 },
    { field: "alloywt", headerName: "Alloy Wt(pure)", width: 130 },
    { field: "flask", headerName: "Flask", width: 100 },
    { field: "labelprint", headerName: "Label Print", width: 100 },
    { field: "view", headerName: "View", width: 100 },
  ];

  const rows = [
    {
      id: 1,
      sr: 1,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
    {
      id: 2,
      sr: 2,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
    {
      id: 3,
      sr: 3,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
    {
      id: 4,
      sr: 4,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
    {
      id: 5,
      sr: 5,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
    {
      id: 6,
      sr: 6,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
    {
      id: 7,
      sr: 7,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
    {
      id: 8,
      sr: 8,
      date: "24-march-23",
      batch: "AB",
      employee: "E0001",
      treewt: "90wt",
      departmentbatchno: "Investment(B1)",
      metaltype: "18K Gold",
      metalcolor: "Yellow",
      serialjobs: "1/101(see more)",
      status: "Investment issue",
      issue: "90wt",
      return: "-",
      powderweight: "400gm",
      metalwt: "50wt",
      alloywt: "40wt",
      flask: "F1",
      labelprint: "Prints",
      view: "image",
    },
  ];

  const GridHeadDate = useCallback(() => (
    <>
      <div>
        <label>Date: &nbsp;</label>
        <input
          type="date"
          style={{
            border: "1px solid #e2e2e2",
            outline: "none",
            width: "120px",
            height: "30px",
            borderRadius: "8px",
          }}
        />
      </div>
      <div>
        <label>To: &nbsp;</label>
        <input
          type="date"
          style={{
            border: "1px solid #e2e2e2",
            outline: "none",
            width: "120px",
            height: "30px",
            borderRadius: "8px",
          }}
        />
      </div>
    </>
  ), []);
  const GridHeadSelect = useCallback(() => (
    <>
      <div>
        <label>Metal Type</label>
      </div>

      <div style={{ marginLeft: '12px' }}>
        <select style={{ width: '150px', padding: '4px', backgroundColor: '#f0f0f0', border: '1px solid #b8b8b8', borderRadius: '6px' }}>
          <option style={{}}>All Type</option>
          <option style={{}}>Gold 14K WHITE</option>
          <option style={{}}>Gold 14K YELLOW</option>
          <option style={{}}>Gold 18K WHITE</option>
          <option style={{}}>Gold 18K YELLOW</option>
        </select>
      </div>

      <div style={{ marginLeft: '12px' }}>
        <label>Status</label>
      </div>

      <div style={{ marginLeft: '12px' }}>
        <select style={{ width: '150px', padding: '4px', backgroundColor: '#f0f0f0', border: '1px solid #b8b8b8', borderRadius: '6px' }}>
          <option style={{}}>All Type</option>
          <option style={{}}>Investment Process</option>
          <option style={{}}>Burnout Process</option>
          <option style={{}}>Alloying</option>
          <option style={{}}>casting Completed</option>
        </select>
      </div>
    </>
  ), []);

  return (
    <>
      <div className="grid_head_container">
        <div className="grid_head menu" >
          <MenuRoundedIcon onClick={() => setMenuFlag(true)} sx={{ fontSize: '30px' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='headerV2Title' >BATCH LIST</p>
          </div>

          {/* <div style={{display : 'flex' ,alignItems: 'stretch'}}>
            <p style={{margin : '0px 5px',cursor:'pointer', fontSize: '14px',textDecoration: 'underline', color: 'blue'}} onClick={() => navigation('/investmentFirst')}>INVESTMENT PROCESS</p>
            <p style={{margin : '0px 5px',cursor:'pointer', fontSize: '14px',textDecoration: 'underline', color: 'blue'}} onClick={() => navigation('/burnOut')}>BURNOUT</p>
            <p style={{margin : '0px 5px',cursor:'pointer', fontSize: '14px',textDecoration: 'underline', color: 'blue'}} onClick={() => navigation('/unlock')}>UNLOCK ALLOYING</p>
          </div> */}
        </div>

        <div className="menu_responsive">
          {/* <div className="grid_head btn_group">
            <button className="grid-btn" onClick={()=>navigation('/investmentFirst')}>
              INVESTMENT PROCESS
            </button>
            <button className="grid-btn" onClick={() => navigation('/burnOut')}>BURNOUT</button>
          </div> */}


          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="grid_head date">{GridHeadDate()}</div>

            <div className="grid_head_search">
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #e2e2e2",
                  borderRadius: "24px",
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
                    backgroundColor: "#f9f9f9",
                    outline: "none",
                    border: "none",
                    height: "27px",
                    width: "280px",
                    borderRadius: "24px",
                    paddingInlineStart: "12px",
                  }}
                />
              </div>
            </div>

            <div className="grid_head select_metaltype">{GridHeadSelect()}</div>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}
            onClick={() => navigation("/")}
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }} className="DataGridTable">
          <DataGrid
            rows={rows}
            columns={columns.map((column) => ({
              ...column,
              headerClassName: "customHeaderCell", // Apply custom CSS class to header cells
            }))}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}

          />
        </div>
      </div>
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
