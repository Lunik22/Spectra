'use client';
import React from 'react';
import { AppBar, Box, Button, InputBase, Toolbar, Typography } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { defaultTheme, slovakiaTheme, worldTheme, economicsTheme, techTheme, sportTheme, cultureTheme, localTheme } from '../app/theme';
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
            backdropFilter: 'blur(10px)', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(to right, ${theme.palette.primary.left || theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.right || theme.palette.primary.dark})`,
                opacity: 0.75, 
                zIndex: -1,
            },
          }}>
            <Link href="/" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: defaultTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Hlavne Správy
              </Typography>
            </Link>
            <Link href="/kategoria/pre-teba" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: defaultTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Pre Teba
              </Typography>
            </Link>
            <Link href="/kategoria/slovensko" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: slovakiaTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Slovensko
              </Typography>
            </Link>
            <Link href="/kategoria/svet" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: worldTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Svet
              </Typography>
            </Link>
            <Link href="/kategoria/politika-a-ekonomika" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: economicsTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Politika a Ekonomika
              </Typography>
            </Link>
            <Link href="/kategoria/technologie-a-veda" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: techTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Technológie a Veda
              </Typography>
            </Link>
            <Link href="/kategoria/sport" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: sportTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Šport
              </Typography>
            </Link>
            <Link href="/kategoria/kultura-a-zabava" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: cultureTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Kultúra a Zábava
              </Typography>
            </Link>
            <Link href="/kategoria/miestne-spravy" passHref>
              <Typography 
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: localTheme.palette.text.secondary,
                    transition: 'color 0.3s',
                  }
                }}>
                Miestne Správy
              </Typography>
            </Link>


          </Box>
          
        </Toolbar>
      </AppBar>
    );
  }