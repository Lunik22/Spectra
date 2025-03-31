'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoginButton from './loginButton';
import SearchBar from './searchBar';
import { getAvatarURL, getLoggedInUser } from '@/appwrite/authService';
import { User } from '@/types';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    getLoggedInUser().then(setUser);
    getAvatarURL().then(buffer => {
      if (buffer) {
        const base64String = btoa(String.fromCharCode(...Array.from(new Uint8Array(buffer))));
        setAvatar(`data:image/png;base64,${base64String}`);
      }
    });
  }, []);
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{
        py: "2rem", 
        display: 'flex', 
        boxShadow: 'none', 
        marginBottom: '0rem', 
        backdropFilter: 'blur(30px)',
        zIndex: theme.zIndex.drawer + 1, 
        backgroundColor: `${theme.palette.primary.darker}CC`,
        }}>
        <Toolbar sx={{ 
          justifyContent: 'center',
          display: 'flex',
          gap: '15rem',
          position: 'relative',
          zIndex: 1, 
        }}>
          <SearchBar/>
          <img src={theme.custom.logoPath} alt="" style={{ height: '3rem'}}/>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img 
                src={avatar || '/imgs/main/defaultAvatar.png'} 
                style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }} 
              />
              <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                {user.name}
              </Typography>
            </Box>
          ) : (
            <LoginButton />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}