'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoginButton from './loginButton';
import SearchBar from './searchBar';
import { getAvatarURL, getLoggedInUser } from '@/appwrite/authService';
import { User } from '@/types';
import ProfileDropdown from './profileDropdown';

export default function Navbar() {
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

  return (
    <Container sx={{ flexGrow: 1 }}>
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
          justifyContent: 'space-between',
          display: 'flex',
          position: 'relative',
          zIndex: 1, 
        }}>
          <SearchBar/>
          
          {user ? (
<<<<<<< HEAD
            <ProfileDropdown/>
=======
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img 
                src={avatar || '/imgs/main/defaultAvatar.png'} 
                style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }} 
              />
            </Box>
>>>>>>> 1bf5f80f214ee3327b78e6a618266bf7d520f889
          ) : (
            <LoginButton />
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

//<img src={theme.custom.logoPath} alt="" style={{ height: '3rem'}}/>