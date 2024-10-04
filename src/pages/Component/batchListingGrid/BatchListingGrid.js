import React, { useCallback, useEffect, useState } from "react";
import "./BatchListingGrid.css";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Divider, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import topLogo from '../../assets/oraillogo.png'
import { CommonAPI } from "../../../Utils/CommonApi";
import { toast } from "react-toastify";

const BatchListingGrid = () => {

  const [menuFlag, setMenuFlag] = useState(false)
  const [batchList,setBatchList] = useState([]);
  const [batchFilterList,setBatchFilterList] =  useState([]);
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();

  const navigation = useNavigate();


  useEffect(()=>{
    console.log("date",startDate,endDate)

    let filterDate

    if(endDate && !startDate){
      toast.error("First Choose the Starting Date !!")
      setEndDate(undefined);
      return;
    }


    if(startDate){
      filterDate = batchList?.filter((ele)=>{
        const itemDate = ele.CastingIssDate.split('T')[0];
        return itemDate == startDate 
      })
      setBatchFilterList(filterDate)
    }

    if(startDate && endDate){
      filterDate = batchList?.filter((ele)=>{
      const itemDate = ele.CastingIssDate.split('T')[0];
      return itemDate >= startDate && itemDate <= endDate;
    })
    setBatchFilterList(filterDate)
    }

    if(!startDate && !endDate){
      setBatchFilterList([]);
    }

    
    // filterDate = batchList?.filter((ele)=>{
    //   const itemDate = ele.CastingIssDate.split('T')[0];
    //   return itemDate >= startDate && itemDate <= endDate;
    // })


  },[startDate,endDate])

  const replaceEmptyStrings = obj => {
    for (let key in obj) {
        if (obj[key] === "") {
            obj[key] = "-";
        }
    }
};

  const GETTREELIST = async() => {

    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    let bodyparam = {"deviceToken":`${deviceT}`}

    let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

    let body = {
        "con":`{\"id\":\"\",\"mode\":\"TREELIST\",\"appuserid\":\"\"}`,
        "p":`${ecodedbodyparam}`,  
        "f":"formname (album)"
    }

    await CommonAPI(body).then((res)=>{
        if(res){
          let ListData = res?.Data?.rd

          ListData?.forEach((ele,i) => {
            ele.id = i+1;
            ele.CastingIssDate = ele.CastingIssDate.split('T')[0];
            replaceEmptyStrings(ele); 
          });

          console.log("res",ListData) 
          setBatchList(ListData)
        }
    }).catch((err)=>{
      console.log("GETTREELIST ERROR",err)
      toast.error("something went wrong please try again !!")
    })
  }


  useEffect(()=>{
    GETTREELIST();
  },[])

  const handleSearch = (e) =>{
    const query = e.target.value.toLowerCase();

    const results = batchList.filter(item => {
      return Object.values(item).some(value => 
        value.toString().toLowerCase().includes(query)
      );
    });

    console.log("result",results);

    setBatchFilterList(results)  
  }




  const columns = [
    { field: "id", headerName: "Sr#", width: 80 },
    { field: "CastingIssDate", headerName: "Date", width: 130 },
    { field: "Batch#", headerName: "Batch#", width: 130 },
    {
      field: "Barcode",
      headerName: "Employee",
      width: 130,
    },
    { field: "TreeWt", headerName: "Tree Wt", width: 100 },
    {
      field: "Investment",
      headerName: "Department batch no#",
      width: 170,
    },
    { field: "MetalType", headerName: "Metal Type", width: 130 },
    { field: "MetalColor", headerName: "Metal Color", width: 130 },
    { field: "serialjobs", headerName: "serial Jobs", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "Issuewt", headerName: "Issue", width: 100 },
    { field: "Returnwt", headerName: "Return", width: 100 },
    { field: "requirepowder", headerName: "Powder Weight", width: 120 },
    { field: "metalwtpure", headerName: "Metal Wt(pure)", width: 130 },
    { field: "alloywt", headerName: "Alloy Wt(pure)", width: 130 },
    { field: "flaskbarcode", headerName: "Flask", width: 100 },
    { field: "LabelPrint", headerName: "Label Print", width: 100 },
    { field: "Image",
     headerName: "View", 
     width: 100,
     renderCell: (params) => {
      const {value} = params;
      const isBase64 = value && value.startsWith('data:image');
      return isBase64 ? (
        <img src={value} alt="Image" style={{ width: '100%', height: 'auto' }} />
      ) : (
        "-"
      );

     }
    },
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
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>&nbsp;&nbsp;To: &nbsp;</label>
        <input
          type="date"
          style={{
            border: "1px solid #e2e2e2",
            outline: "none",
            width: "120px",
            height: "30px",
            borderRadius: "8px",
          }}
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)}
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
                  onChange={(e)=>handleSearch(e)}
                />
              </div>
            </div>

            <div className="grid_head select_metaltype">{GridHeadSelect()}</div>
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
            rows={batchFilterList?.length == 0  ? batchList : batchFilterList}
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
