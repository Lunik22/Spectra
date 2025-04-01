'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoginButton from './loginButton';
import SearchBar from './searchBar';
import { getAvatarURL, getLoggedInUser } from '@/appwrite/authService';
import { User } from '@/types';

export default function ProfileDropdown() {
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    try {
      getLoggedInUser().then(setUser).catch(console.error);
      getAvatarURL()
        .then(buffer => {
          if (buffer) {
            const base64String = btoa(String.fromCharCode(...Array.from(new Uint8Array(buffer))));
            setAvatar(`data:image/png;base64,${base64String}`);
          }
        })
        .catch(console.error);
    } catch (error) {
      console.error("Error in Navbar useEffect:", error);
    }
  }, []);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img 
          src={avatar || '/imgs/main/defaultAvatar.png'} 
          style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }} 
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}