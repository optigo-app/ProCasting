import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

const RemarksModal = ({ open, handleClose, remarks }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Remark</DialogTitle>
            <DialogContent>
                <Typography>{remarks}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" sx={{
                    background: '#000', color: '#fff', '&:hover': {
                        background: '#000'
                    }
                }}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemarksModal;
