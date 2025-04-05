'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FollowedTopicsBar() {
  const theme = useTheme();
  return (
    <Box sx={{ 
      display: 'flex', 
      padding:'1rem', 
      width:'100%', 
      height:"7.5rem", 
      justifyContent: 'space-between',
      }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        py: '1rem',
        px: '2rem',
        borderRadius: '30px',
        backdropFilter: 'blur(10px)', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transform: 'translateX(15px)',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(to right,${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
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
        <Typography variant="h1" sx={{ color: theme.palette.text.primary, fontSize: '1.5rem', fontWeight: '700' }}>
          Sledované témy
        </Typography>
      </Box>
    </Box>
  );
  
}