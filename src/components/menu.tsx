'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { defaultTheme, slovakiaTheme, worldTheme, economicsTheme, techTheme, sportTheme, cultureTheme, localTheme } from '../app/theme';
import Link from 'next/link';
import { getLoggedInUser } from '@/appwrite/authService';
import { useRouter, usePathname } from 'next/navigation';

interface MenuProps {
  onNavigate?: (url: string) => void;
}

export default function Menu({ onNavigate }: MenuProps) {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      const user = await getLoggedInUser();
      setIsLoggedIn(!!user);
    }
    checkAuth();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (pathname === url) {
      e.preventDefault();
      return;
    }
    if (onNavigate) {
      e.preventDefault();
      onNavigate(url);
    }
  };

  const handlePreTebaClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push('/autentifikacia/prihlasenie');
    } else {
      handleLinkClick(e, url);
    }
  };

  return (
    <AppBar position="fixed" sx={{ paddingTop: "7rem", display: 'flex', boxShadow: 'none', zIndex: 2 }} color='transparent'>
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{
          flexGrow: 1,
          display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.25rem',
          bgcolor: 'transparent',
          height: '2.5rem',
          width: 'calc(100% + 100%)',
          marginLeft: '-2%',
          marginRight: '-2%',
          backdropFilter: 'blur(10px)',
          paddingTop: '0.25rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(to right, ${theme.palette.primary.left || theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.right || theme.palette.primary.dark})`,
            opacity: 0.8,
            zIndex: -1,
          },
        }}>
          <Link href="/" passHref onClick={(e) => handleLinkClick(e, "/")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: defaultTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Hlavne Správy
            </Typography>
          </Link>
          <Link href="/pre-teba" passHref onClick={(e) => handlePreTebaClick(e, "/pre-teba")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: defaultTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Pre Teba
            </Typography>
          </Link>
          <Link href="/kategoria/slovensko" passHref onClick={(e) => handleLinkClick(e, "/kategoria/slovensko")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: slovakiaTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Slovensko
            </Typography>
          </Link>
          <Link href="/kategoria/svet" passHref onClick={(e) => handleLinkClick(e, "/kategoria/svet")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: worldTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Svet
            </Typography>
          </Link>
          <Link href="/kategoria/ekonomika" passHref onClick={(e) => handleLinkClick(e, "/kategoria/ekonomika")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: economicsTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Ekonomika
            </Typography>
          </Link>
          <Link href="/kategoria/technologie-a-veda" passHref onClick={(e) => handleLinkClick(e, "/kategoria/technologie-a-veda")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: techTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Technológie a Veda
            </Typography>
          </Link>
          <Link href="/kategoria/sport" passHref onClick={(e) => handleLinkClick(e, "/kategoria/sport")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: sportTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Šport
            </Typography>
          </Link>
          <Link href="/kategoria/zivotny-styl" passHref onClick={(e) => handleLinkClick(e, "/kategoria/zivotny-styl")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: localTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Životný štýl
            </Typography>
          </Link>
          <Link href="/kategoria/kultura-a-zabava" passHref onClick={(e) => handleLinkClick(e, "/kategoria/kultura-a-zabava")}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  color: cultureTheme.palette.primary.main,
                  transition: 'color 0.3s',
                }
              }}>
              Kultúra a Zábava
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}