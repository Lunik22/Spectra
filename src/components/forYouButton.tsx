'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { slovakiaTheme, worldTheme, defaultTheme, economicsTheme, techTheme, sportTheme, localTheme, cultureTheme } from '../app/theme';

export default function ForYouButton({ name, category = '', link }: { name: string; category: string; link: string }) {

  // Map categories to themes
  const categoryThemes: { [key: string]: typeof slovakiaTheme } = {
    "": defaultTheme,
    "1": slovakiaTheme,
    "2": worldTheme,
    "3": economicsTheme,
    "4": techTheme,
    "5": sportTheme,
    "6": localTheme,
    "7": cultureTheme,
    "Liberálne": worldTheme,
    "Stredové": defaultTheme,
    "Konzervatívne": slovakiaTheme,
  };


  // Assign theme based on category, fallback to defaultTheme
  const appliedTheme = categoryThemes[category] || defaultTheme;

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      width: 'calc(100% - 30px)',
      gap: '2rem',
      py: '1rem',
      px: '2rem',
      height: "7.5rem",
      marginTop: '2rem',
      borderRadius: '30px',
      backdropFilter: 'blur(10px)', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transform: 'translateX(30px)',
      position: 'relative',
      '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to right,${appliedTheme.palette.primary.main}, ${appliedTheme.palette.primary.dark})`,
          opacity: 0.8, 
          zIndex: -1,
          borderRadius: '30px',
          transition: '0.3s',
      },
      ':hover': {
        '&::before': {
          opacity: 1, 
        }
      }
    }}>
      <Link href={link} style={{ textDecoration: 'none' }}>
        <Typography variant="h1" sx={{ color: appliedTheme.palette.text.primary }}>
          {name}
        </Typography>
      </Link>
    </Box>
  );
}