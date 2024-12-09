import React from 'react';
import "./for_confirmation.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className='DRM'
    >
      <DialogTitle id="alert-dialog-title" className='alert-TitleCl'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className='alert-titleContent'>
          {content}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button className='for_DialogBtn' onClick={onClose} autoFocus fullWidth>
          Close
        </Button>
        <Button className='for_DialogBtn' onClick={onConfirm} autoFocus fullWidth>
          Save
        </Button>
        <Divider orientation="vertical" flexItem />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
