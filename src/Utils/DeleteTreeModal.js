import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'

const DeleteTreeModal = ({ open,
    onClose,
    title,
    onconfirm,
    onclickDelete }) => {
    return (
        <Dialog
            open={open}
            onClose={onclose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs" 
            fullWidth
        >
            <Box sx={{padding:'20px'}}>
            <DialogTitle id="alert-dialog-title" style={{textAlign:'center' }}>
                {"ARE YOU SURE TO DELETE ?"}
            </DialogTitle>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={onclickDelete} sx={{outlineColor:'#000', color:'#000', borderColor:'#000', '&:hover':{
                    background:'#fff',
                    borderColor:'#000'
                }}}>NO</Button>
                <Button variant="contained" onClick={onconfirm} sx={{background:'#000', color:'#fff','&:hover':{
                    background:"#000"
                }}}>YES</Button>
            </DialogActions>
            </Box>
        </Dialog>
    )
}

export default DeleteTreeModal