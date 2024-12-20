import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Button, Typography, Grid, Box, Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import { fetchTreeDetails } from '../../../Utils/API/GetTreeQrAPI';
import QRCode from 'qrcode.react';

function PrintQRCodeDialog({ open, onClose, castuniqueno }) {
  const [qrdata, setQrData] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  const getTreeQrData = async () => {
    setIsLoding(true);
    try {
      const response = await fetchTreeDetails(castuniqueno);
      if (response?.Data?.rd[0]?.stat !== 0) {
        setQrData(response?.Data.rd[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoding(false);
    }
  };

  useEffect(() => {
    if (open) {
      setQrData([]);
      getTreeQrData();
    }
  }, [open]);

  const handleClose = () => {
    setQrData([]);
    onClose();
  }

  const handlePrint = () => {
    window.print();
  };
  console.log("qrdata", qrdata)

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        QR Scan for Tree Details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          className="no-print"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {qrdata?.length !== 0 && !isLoding ? (
        <>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                  <Typography variant="body2"><strong style={{ textTransform: "uppercase" }}>Cast Batch No :</strong> {qrdata?.CastBatchNo ?? ''}{" "}({qrdata?.CastUniqueno})</Typography>
                  <Typography variant="body2">
                    <strong>METAL :</strong> {
                      (qrdata?.metaltype ?? '') + ' ' +
                      (qrdata?.metalpurity ?? '') + ' ' +
                      (qrdata?.MetalColor ?? '')
                    }
                  </Typography>
                  <Typography variant="body2"><strong>TREE WT :</strong>{' '}{qrdata?.TreeWeight} gm</Typography>
                  <Typography variant="body2"><strong>DIA WT :</strong>{' '}{qrdata?.DiaWt} ctw</Typography>
                  <Typography variant="body2"><strong>CS WT :</strong>{' '}{qrdata?.CSWt} ctw</Typography>
                  <Typography variant="body2"><strong>MISC WT :</strong>{' '}{qrdata?.MiscWt} gm</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <QRCode value={`${qrdata?.CastUniqueno}`} />
              </Grid>
            </Grid>
          </DialogContent>
          <Box display="flex" justifyContent="center" p={2}>
            <Button variant="outlined" onClick={handlePrint} startIcon={<PrintIcon />} className="no-print" sx={{
              background: '#000', color: '#fff', '&:hover': {
                background: '#000',
                outline: '#000',
                border: '1px solid #000'
              }
            }}>
              Print QR
            </Button>
          </Box>
        </>
      ) :
        <Box sx={{ textAlign: 'center' }}>
          <Skeleton
            sx={{ height: 190, margin: '0 auto' }}
            animation="wave"
            variant="rectangular"
          />
          <Skeleton
            sx={{ height: 50, margin: '0 auto', width: '60%' }}
            animation="wave"
          />
        </Box>
      }
    </Dialog>
  );
}

export default PrintQRCodeDialog;
