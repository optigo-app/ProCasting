import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Grid,
    DialogActions,
    Pagination,
    Box,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function InfoDialogModal({ open, onClose, rightJobs }) {
    console.log('rightJobs: ', rightJobs);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil((rightJobs?.length || 0) / itemsPerPage);
    const currentJobs = rightJobs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getStatusStyles = (statusId) => {
        switch (statusId) {
            case 1:
                return { backgroundColor: '#cef6ce', borderColor: '#a6d785', color:'#000' };
            case 2:
                return { backgroundColor: '#a396c8', borderColor: '#3b2181', color:'#fff' };
            case 3:
                return { backgroundColor: '#ffc65d', borderColor: 'orange', color:'#fff' };
            default:
                return { backgroundColor: 'white', borderColor: 'gray' };
        }
    };

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
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {currentJobs?.map((item) => {
                        const statusStyles = getStatusStyles(item?.procastingstatusid);
                        return (
                            <Grid item xs={6} sm={4} md={4} key={item?.job}>
                                <div
                                    style={{
                                        border: `2px solid ${statusStyles?.borderColor}`,
                                        padding: '5px',
                                        borderRadius: '4px',
                                        textAlign: 'center',
                                        backgroundColor: statusStyles?.backgroundColor,
                                        color: statusStyles?.color,
                                        fontSize:'20px' 
                                    }}
                                >
                                    {item?.job}
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        sx={{
                            color: '#000',
                        }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default InfoDialogModal;
