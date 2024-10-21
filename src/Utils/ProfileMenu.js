import React from 'react';
import { Menu } from '@mui/material'; 

const getUserInfo = () => {
  const user = JSON.parse(localStorage.getItem('getemp'));
  return user || {};
};

const ProfileMenu = ({ open, anchorEl, handleClose }) => {
  const user = getUserInfo();

  return (
    <div>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div style={{ padding: '10px' }}>
          <p style={{ margin: '7px', color: '#b8b8b8', fontWeight: 500, fontSize: '20px' }}>
            {user?.firstname} {user?.lastname}
          </p>
          <p style={{ margin: '7px', color: '#b8b8b8', fontWeight: 500, fontSize: '20px', textAlign: 'center' }}>
            {user?.barcode}
          </p>
        </div>
        {/* Add any additional MenuItems here if needed */}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
};

export default ProfileMenu;