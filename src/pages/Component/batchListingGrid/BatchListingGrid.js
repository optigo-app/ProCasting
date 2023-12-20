import React from "react";
import "./BatchListingGrid.css";
import { DataGrid } from "@mui/x-data-grid";

const BatchListingGrid = () => {
  const columns = [
    { field: "sr", headerName: "Sr#", width: 90 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "batch", headerName: "Batch#", width: 150 },
    {
      field: "employee",
      headerName: "Employee",
      width: 110,
    },
    { field: "treewt", headerName: "Tree Wt", width: 150 },
    {
      field: "departmentbatchno",
      headerName: "Department batch no#",
      width: 150,
    },
    { field: "metaltype", headerName: "Metal Type", width: 150 },
    { field: "metalcolor", headerName: "Metal Color", width: 150 },
    { field: "serialjobs", headerName: "serial Jobs", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "issue", headerName: "Issue", width: 150 },
    { field: "return", headerName: "Return", width: 150 },
    { field: "powderweight", headerName: "Powder Weight", width: 150 },
    { field: "metalwt", headerName: "Metal Wt(pure)", width: 150 },
    { field: "alloywt", headerName: "Alloy Wt(pure)", width: 150 },
    { field: "flask", headerName: "Flask", width: 150 },
    { field: "labelprint", headerName: "Label Print", width: 150 },
    { field: "view", headerName: "View", width: 150 },
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

  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "#f1f1f1",
            padding: "12px",
            display: "flex",
            gap: "12px",
          }}
        >
          <button className="grid-btn">
            <span style={{ fontSize: "18px" }}>+</span> Add
          </button>
          <button className="grid-btn">All</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "90%", marginTop: "30px" }}>
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
    </>
  );
};

export default BatchListingGrid;
