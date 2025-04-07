'use client';
import React, { useEffect, useState } from 'react';
import { alpha, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { getAvatarURL, getLoggedInUser, signOut } from '@/appwrite/authService';
import { cultureTheme } from '@/app/theme';
import { useTheme } from '@mui/material';
import { User } from '@/types';
import { redirect } from 'next/navigation';

export default function ProfileDropdown() {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Call the logout function
      window.location.reload(); // Reload the page to reflect the logout state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleArticles = async () => {
    redirect('/ulozene-clanky');
  }

  const handleTopics = async () => {
    redirect('/sledovane-temy');
  }

  const handleProfile = async () => {
    redirect('/moj-profil');
  }

  return (
    <Box sx={{ transform: 'translatex(-30px)',}}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: '50%',
        }}
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
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: alpha(theme.palette.primary.main, 0.5),
            color: theme.palette.text.primary,
            borderRadius: '30px',
            padding: '0.5rem',
            backdropFilter: 'blur(10px)', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: alpha(theme.palette.primary.main, 0.5),
                opacity: 0.8, 
                zIndex: -1,
                borderRadius: '30px'
            }
          },
          '& .MuiMenuItem-root': {
            transition: '0.3s',
            '&:hover': {
              color: theme.palette.primary.main,
            },
          },
        }}
      >
        <MenuItem onClick={handleProfile}>Môj profil: {user?.name}</MenuItem>
        <MenuItem onClick={handleArticles}>Uložené články</MenuItem>
        <MenuItem onClick={handleTopics}>Sledované témy</MenuItem>
        <MenuItem onClick={handleLogout}><Typography sx={{ transition: 'color 0.3s', ':hover': { color: cultureTheme.palette.primary.main } }}>Odhlásiť sa</Typography></MenuItem>
      </Menu>
    </Box>
  );
}