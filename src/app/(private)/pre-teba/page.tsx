"use client";

import { Box, Container, Fade, Link, Typography, useTheme } from '@mui/material';
import { worldTheme } from '../../theme';
import Navbar from "../../../components/navbar";
import Menu from "../../../components/menu";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryPage() {
  const [fadeIn, setFadeIn] = useState(true);
  const router = useRouter();
  const theme = useTheme();

  const handleRouteChange = (url: string) => {
    setFadeIn(false);
    setTimeout(() => {
      router.push(url);
    }, 500); // Match the fade-out duration
  };

  return (
    <Fade in={fadeIn} timeout={500}>
      <Container>
        <Navbar />
        <Menu onNavigate={handleRouteChange} />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          py: '1rem',
          px: '2rem',
          height: "7.5rem",
          marginTop: '12rem',
          borderRadius: '30px',
          backdropFilter: 'blur(10px)', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transform: 'translateX(15px)',
          '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(to right,${worldTheme.palette.primary.main}, ${worldTheme.palette.primary.dark})`,
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
          <Link href={`/ulozene-clanky`} sx={{ textDecoration: 'none' }}>
            <Typography variant="h1" sx={{ color: worldTheme.palette.text.primary}}>
              Uložené články
            </Typography>
          </Link>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          py: '1rem',
          px: '2rem',
          height: "7.5rem",
          marginTop: '2rem',
          borderRadius: '30px',
          backdropFilter: 'blur(10px)', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transform: 'translateX(15px)',
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
          <Link href={`/sledovane-temy`} sx={{ textDecoration: 'none' }}>
            <Typography variant="h1" sx={{ color: theme.palette.text.primary }}>
              Sledované témy
            </Typography>
          </Link>
        </Box>
      </Container>
    </Fade>
  );
}
