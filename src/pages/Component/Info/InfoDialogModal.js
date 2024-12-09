// import React, { useState, useEffect } from 'react';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     Button,
//     Grid,
//     DialogActions,
//     Pagination,
//     Box,
//     IconButton,
//     MenuItem,
//     Select,
//     FormControl,
//     InputLabel,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// function InfoDialogModal({ open, onClose, rightJobs }) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedFilter, setSelectedFilter] = useState('all');
//     const itemsPerPage = 10;

//     // Filtering based on the selected statusId filter
//     const filteredJobs = rightJobs?.filter((item) => {
//         if (selectedFilter === 'all') return true;
//         return item?.procastingstatusid === parseInt(selectedFilter); 
//     });

//     const totalPages = Math.ceil((filteredJobs?.length || 0) / itemsPerPage);
//     const currentJobs = filteredJobs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     const handleFilterChange = (event) => {
//         setSelectedFilter(event.target.value);
//         setCurrentPage(1); 
//     };

//     const getStatusStyles = (statusId) => {
//         switch (statusId) {
//             case 1:
//                 return { backgroundColor: '#cef6ce', borderColor: '#a6d785', color: '#000' };
//             case 2:
//                 return { backgroundColor: '#a396c8', borderColor: '#3b2181', color: '#fff' };
//             case 3:
//                 return { backgroundColor: '#ffc65d', borderColor: 'orange', color: '#fff' };
//             default:
//                 return { backgroundColor: 'white', borderColor: 'gray' };
//         }
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitle>
//                 All Job Listings
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     style={{ position: 'absolute', right: 8, top: 8 }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 {/* Filter Dropdown */}
//                 <Box
//                     display="flex"
//                     justifyContent="flex-end"
//                 >
//                     <FormControl variant="outlined" size="small">
//                         <InputLabel>Filter</InputLabel>
//                         <Select
//                             value={selectedFilter}
//                             onChange={handleFilterChange}
//                             label="Filter"
//                             style={{ width: 120, borderColor: '#7d7f85', outlineColor:'#7d7f85' }}
//                             size="small"
//                         >
//                             <MenuItem value="all">All</MenuItem>
//                             <MenuItem value="1">Wax</MenuItem> {/* Wax status */}
//                             <MenuItem value="2">Regular</MenuItem>  {/* Regular status */}
//                         </Select>
//                     </FormControl>
//                 </Box>
//             </DialogTitle>
//             <DialogContent>
//                 <Grid container spacing={2}>
//                     {currentJobs?.map((item) => {
//                         const statusStyles = getStatusStyles(item?.procastingstatusid);
//                         return (
//                             <Grid item xs={6} sm={4} md={4} key={item?.job}>
//                                 <div
//                                     style={{
//                                         border: `2px solid ${statusStyles?.borderColor}`,
//                                         padding: '5px',
//                                         borderRadius: '4px',
//                                         textAlign: 'center',
//                                         backgroundColor: statusStyles?.backgroundColor,
//                                         color: statusStyles?.color,
//                                         fontSize: '20px',
//                                     }}
//                                 >
//                                     {item?.job}
//                                 </div>
//                             </Grid>
//                         );
//                     })}
//                 </Grid>
//                 <Box display="flex" justifyContent="center" mt={2}>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={handlePageChange}
//                         variant="outlined"
//                         sx={{
//                             color: '#000',
//                         }}
//                     />
//                 </Box>
//             </DialogContent>
//         </Dialog>
//     );
// }

// export default InfoDialogModal;


import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Pagination,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import './infodialog.css'

function InfoDialogModal({ open, onClose, rightJobs }) {
    console.log('rightJobs: ', rightJobs);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMetalColor, setSelectedMetalColor] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const itemsPerPage = 5;

    // Filter the jobs based on the selected metal color and status
    const filteredJobs = rightJobs?.filter((item) => {
        const matchesMetalColor =
            selectedMetalColor === 'all' || item?.metalColor === selectedMetalColor;
        const matchesStatus =
            selectedStatus === 'all' || item?.procastingstatusid === parseInt(selectedStatus);
        return matchesMetalColor && matchesStatus;
    });

    const metalColors = [...new Set(rightJobs?.map((item) => item?.metalColor))];

    const totalPages = Math.ceil((filteredJobs?.length || 0) / itemsPerPage);
    const currentJobs = filteredJobs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleMetalColorChange = (event) => {
        setSelectedMetalColor(event.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
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

    const columns = [
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                All Job Listings
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Box display="flex" justifyContent="flex-end">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel>Metal Color</InputLabel>
                        <Select
                            value={selectedMetalColor}
                            onChange={handleMetalColorChange}
                            label="Metal Color"
                            size="small"
                        >
                            <MenuItem value="all">All</MenuItem>
                            {metalColors.map((color, index) => (
                                <MenuItem key={index} value={color}>
                                    {color}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={selectedStatus}
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
            </DialogTitle>
            <DialogContent sx={{ padding: '26px 24px' }}>
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={currentJobs || []}
                        columns={columns?.map((column) => ({
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
        </Dialog>
    );
}

export default InfoDialogModal;





// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     IconButton,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     Pagination,
//     Box,
//     Paper
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import './infodialog.css';

// function InfoDialogModal({ open, onClose, rightJobs }) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const itemsPerPage = 10;

//     // Filter the jobs based on the search term
//     const filteredJobs = rightJobs?.filter((job) =>
//         job?.job?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const totalPages = Math.ceil((filteredJobs?.length || 0) / itemsPerPage);
//     const currentJobs = filteredJobs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     // Separate regular and wax jobs by jobId
//     const regularJobs = currentJobs?.filter((job) => job?.procastingstatusid === 2) || [];
//     const waxJobs = currentJobs?.filter((job) => job?.procastingstatusid === 1) || [];

//     // Create a new array that combines regular and wax jobs, adding empty strings where needed
//     const combinedJobs = [];

//     // Create a combined jobs array
//     const allJobIds = new Set([
//         ...regularJobs.map((job) => job.jobId),
//         ...waxJobs.map((job) => job.jobId),
//     ]);

//     allJobIds.forEach((jobId) => {
//         const regularJob = regularJobs.find((job) => job.jobId === jobId);
//         const waxJob = waxJobs.find((job) => job.jobId === jobId);

//         combinedJobs.push({
//             jobId,
//             regularJob: regularJob ? regularJob.job : "-",
//             waxJob: waxJob ? waxJob.job : "-",
//         });
//     });

//     // Handle page change
//     const handlePageChange = (event, value) => setCurrentPage(value);

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitle>
//                 All Job Listings
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     style={{ position: 'absolute', right: 8, top: 8 }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>
//             <DialogContent>
//                 {/* Search field */}
//                 <Box mb={2} mt={2} sx={{ display: 'flex', justifyContent: 'end' }}>
//                     <TextField
//                         label="Search Jobs"
//                         variant="outlined"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </Box>

//                 {/* Job Listings */}
//                 <TableContainer
//                     component={Paper}
//                     sx={{
//                         boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px !important"
//                     }}
//                 >
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell align="center" className='tablecellCl'>
//                                     <Typography variant="h6">Regular Jobs</Typography>
//                                 </TableCell>
//                                 <TableCell align="center" className='tablecellCl'>
//                                     <Typography variant="h6">Wax Jobs</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {combinedJobs.length > 0 && combinedJobs.map((job) => (
//                                 <TableRow key={job.jobId}>
//                                     <TableCell align="center" className='tablecellCl'>
//                                         {job.regularJob || ""} {/* Show regular job name or empty if not available */}
//                                     </TableCell>
//                                     <TableCell align="center" className='tablecellCl'>
//                                         {job.waxJob || ""} {/* Show wax job name or empty if not available */}
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {/* Pagination */}
//                 <Box display="flex" justifyContent="center" mt={2}>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={handlePageChange}
//                         variant="outlined"
//                         shape="rounded"
//                         color="primary"
//                         disabled={filteredJobs?.length === 0}
//                     />
//                 </Box>
//             </DialogContent>
//         </Dialog>
//     );
// }

// export default InfoDialogModal;



