import React, { useState } from 'react';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import { Button, TablePagination } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const MyDataGridComponent = () => {
  // Dummy data for the DataGrid
  const batchFilterList = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 150 },
    { id: 4, name: 'Product 4', price: 120 },
    { id: 5, name: 'Product 5', price: 180 },
    { id: 6, name: 'Product 6', price: 220 },
    { id: 7, name: 'Product 7', price: 250 },
    { id: 8, name: 'Product 8', price: 300 },
    { id: 9, name: 'Product 9', price: 130 },
    { id: 10, name: 'Product 10', price: 160 },
    { id: 11, name: 'Product 11', price: 190 },
    { id: 12, name: 'Product 12', price: 210 },
    { id: 13, name: 'Product 13', price: 170 },
    { id: 14, name: 'Product 14', price: 230 },
    { id: 15, name: 'Product 15', price: 270 },
  ];

  // Dummy columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 150 },
  ];

  const [page, setPage] = useState(0); // Page index (zero-based)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when page size changes
  };

  // Handle refresh
  const handleRefresh = () => {
    console.log('Data refreshed');
    // Example: Reset to initial data or fetch new data from the server
  };

  // Custom Footer with Refresh Button and Pagination
  const CustomFooter = () => (
    <GridFooterContainer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        variant="outlined"
        // color="default"
        onClick={handleRefresh}
        startIcon={<RefreshIcon />}
      >
        Refresh
      </Button>
      <TablePagination
        component="div"
        count={batchFilterList.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </GridFooterContainer>
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={batchFilterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        columns={columns}
        pageSize={rowsPerPage}
        checkboxSelection={false}
        className="mui_DataGridCl"
        slots={{
          footer: CustomFooter, // Use the custom footer
        }}
      />
    </div>
  );
};

export default MyDataGridComponent;
