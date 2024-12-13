import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ style, fontSize = '30px', fontWeight = 'bold', color = '#000', padding }) => {
  const navigate = useNavigate();

  return (
    <IconButton 
      onClick={() => navigate(-1)} 
      style={{ margin: '0px 10px', ...style, padding:padding }}
    >
      <ArrowBackIcon sx={{ fontSize, fontWeight, color }} />
    </IconButton>
  );
};

export default BackButton;
