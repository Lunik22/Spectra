'use client';
import React from 'react';
import { AppBar, Box, Button, InputBase, Toolbar } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function navbar() {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{
        py:"2rem", 
        display:'flex', 
        boxShadow: 'none', 
        marginBottom: '0rem', 
        backdropFilter: 'blur(30px)',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.75, // Set the opacity here
            zIndex: -1,
            backgroundColor: theme.palette.primary.darker,
          },
        }} color='transparent'>
        <Toolbar sx={{ justifyContent: 'center'}}>
          <img src={theme.custom.logoPath} alt="" style={{ height: '3rem'}}/>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}