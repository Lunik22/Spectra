'use client';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Box, InputBase, alpha, styled, Typography, useTheme } from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  transition: '0.3s background',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  marginLeft: 0,
  width: '15rem',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0 1rem',
  height: '2.5rem',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    paddingLeft: '3rem',
    transition: theme.transitions.create('width'),
    width: '15rem',
    height: '2rem',
    [theme.breakpoints.up('md')]: {
      width: '8rem', // Reduced width
    },
  },
}));

export default function SearchedTopicsBar({ searchedTerm }: { searchedTerm: string }) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState(searchedTerm); // Initialize with the passed prop

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTopicSearch = () => {
    redirect(`/hladanie/temy/${searchTerm}`);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      padding: '1rem', 
      width: '100%', 
      height: "7.5rem", 
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        py: '1rem',
        px: '2rem',
        height: '6rem',
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
          Hľadaná téma: {searchedTerm}
        </Typography>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: theme.palette.text.primary }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Hľadať…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm} // Bind the input value to the state
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTopicSearch(); // Trigger search on Enter key
            }}
          />
        </Search>
      </Box>
    </Box>
  );
}