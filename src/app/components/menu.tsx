'use client';
import React from 'react';
import { AppBar, Box, Button, InputBase, Toolbar, Typography } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Link from 'next/link';

export default function menu() {
    const theme = useTheme();
    return (
      <AppBar position="fixed" sx={{paddingTop:"7rem", display:'flex', boxShadow: 'none'}} color='transparent'>
        <Toolbar sx={{ justifyContent: 'center'}}>
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex'}, 
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem',
            bgcolor: 'transparent',
            height: '2.5rem',
            width: 'calc(100% + 100%)', 
            marginLeft: '-2%',
            marginRight: '-2%',
            backdropFilter: 'blur(10px)', // Apply blur effect
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                opacity: 0.75, // Set the opacity here
                zIndex: -1,
            },
          }}>
            <Link href="/" passHref>
              <Typography variant="h2">
                Hlavne Správy
              </Typography>
            </Link>
            <Link href="/pre-teba" passHref>
              <Typography variant="h2">
                Pre Teba
              </Typography>
            </Link>
            <Link href="/slovensko" passHref>
              <Typography variant="h2"  sx={{ ":hover": `color: ${theme.palette.background.default}`}}>
                Slovensko
              </Typography>
            </Link>
            <Link href="/svet" passHref>
              <Typography variant="h2">
                Svet
              </Typography>
            </Link>
            <Link href="/politika-a-ekonomika" passHref>
              <Typography variant="h2">
                Politika a Ekonomika
              </Typography>
            </Link>
            <Link href="/technologie-a-veda" passHref>
              <Typography variant="h2">
                Technológie a Veda
              </Typography>
            </Link>
            <Link href="/sport" passHref>
              <Typography variant="h2">
                Šport
              </Typography>
            </Link>
            <Link href="/kultura-a-zabava" passHref>
              <Typography variant="h2">
                Kultúra a Zábava
              </Typography>
            </Link>
            <Link href="/miestne-spravy" passHref>
              <Typography variant="h2">
                Miestne Správy
              </Typography>
            </Link>


          </Box>
          
        </Toolbar>
      </AppBar>
    );
  }