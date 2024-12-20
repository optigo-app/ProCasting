import React from 'react';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ style, fontSize = '30px', fontWeight = 'bold', color = '#000', padding }) => {
  const navigate = useNavigate();

  return (
    <IconButton 
      onClick={() => navigate('/homeone')} 
      style={{ margin: '0px 10px', ...style, padding:padding }}
    >
      <HomeIcon sx={{ fontSize, fontWeight, color }} />
    </IconButton>
  );
};

export default BackButton;
