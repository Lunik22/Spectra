'use client';

import { Box, InputBase, alpha, styled } from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  transition: '0.3s background',
  transform: 'translatex(15px)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '10rem',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '10rem',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    paddingLeft: '2rem',
    transition: theme.transitions.create('width'),
    width: '10rem',
    height: '2rem',
    [theme.breakpoints.up('md')]: {
      width: '8rem', // Reduced width
    },
  },
}));

export default function SearchBar() {
  return (
    <Box sx={{ display: 'hidden', opacity: 0 }}>
      <Search>
        <SearchIconWrapper>
          <i className="fas fa-search"></i> {/* Replace with your search icon */}
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Hľadať…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </Box>
  );
}