'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchBar from './searchBar';
import { getAvatarURL, getLoggedInUser } from '@/appwrite/authService';
import { User } from '@/types';
import ProfileDropdown from './profileDropdown';
import { defaultTheme } from '@/app/theme';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [avatar, setAvatar] = useState<string | null>(null);
  

  useEffect(() => {
    try {
      getLoggedInUser().then(setUser).catch(console.error);
      if(user) {
        getAvatarURL()
          .then(buffer => {
            if (buffer) {
              const base64String = btoa(String.fromCharCode(...Array.from(new Uint8Array(buffer))));
              setAvatar(`data:image/png;base64,${base64String}`);
            }
          })
          .catch(console.error);
      }
    } catch (error) {
      console.error("Error in Navbar useEffect:", error);
    }
  }, []);
  const theme = useTheme();

  return (
    <>
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
            <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
              <SearchBar/>
              {user ? (
                <ProfileDropdown/>
              ) : (
                <Button 
                variant="contained" 
                color="primary" 
                href='/autentifikacia/prihlasenie'
                fullWidth
                sx={{ 
                    borderRadius: '2rem',
                    zIndex: 3,
                    width: '10rem', 
                    height: '2.5rem',
                    backdropFilter: 'blur(10px)', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `linear-gradient(to right,${defaultTheme.palette.primary.left}, ${defaultTheme.palette.primary.main}, ${defaultTheme.palette.primary.right})`,
                        opacity: 0.8, 
                        zIndex: -1,
                        borderRadius: '30px',
                        transition: '0.3s',
                    },
                    ':hover': {
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 1, 
                        zIndex: -1,
                        borderRadius: '30px'
                      }
                    }
                }}>
                    Prihlásiť sa
                </Button>
              )}
            </Container>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}>
              <img src={theme.custom.logoPath} alt="" style={{ height: '3rem', marginTop: '0.5rem' }}/>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
}

//<img src={theme.custom.logoPath} alt="" style={{ height: '3rem'}}/>