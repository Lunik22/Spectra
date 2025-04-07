'use client';

import { Box, InputBase, alpha, styled, Typography, Link, useTheme } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { redirect } from "next/navigation";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  transition: '0.3s background',
  transform: 'translatex(15px)',
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

const SuggestionBubble = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '30px',
  width: '100%',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  transform: 'translateY(-15px)',
  backdropFilter: 'blur(10px)',
  '& .MuiPaper-root': {
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
      color: theme.palette.text.primary,
      borderRadius: '30px',
      padding: '0.5rem',
      backdropFilter: 'blur(10px)', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: alpha(theme.palette.primary.main, 0.5),
          opacity: 0.8, 
          zIndex: -1,
          borderRadius: '30px'
      }
  },
  '&.visible': {
    transform: 'translateX(25px)',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'transparent', // Ensure solid background remains
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
      opacity: 0.8,
      zIndex: -1,
      borderRadius: '30px',
    },
    '& .MuiPaper-root': {
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
      color: theme.palette.text.primary,
      borderRadius: '30px',
      padding: '0.5rem',
      backdropFilter: 'blur(10px)', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: alpha(theme.palette.primary.main, 0.5),
          opacity: 0.8, 
          zIndex: -1,
          borderRadius: '30px'
      }
    },
  },
}));

export default function SearchBar() {
  const theme = useTheme();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(e.target.value.length > 0);
    setSearchTerm(e.target.value);
  };

  const handleArticleSearch = () => {
    redirect(`/hladanie/clanky/${searchTerm}`);
  }
  const handleTopicSearch = () => {
    redirect(`/hladanie/temy/${searchTerm}`);
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: theme.palette.text.primary }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Hľadať…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleInputChange}
        />
      </Search>
      {showSuggestions && (
        <Box sx={{ position: 'absolute', top: '2.5rem', width: '100%' }}>
          <SuggestionBubble className="visible">
            <Link sx={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.3s', ':hover': { color: theme.palette.primary.main } }} onClick={handleTopicSearch}>
              <Typography variant="body1">Hľadať v témach</Typography>
            </Link>
          </SuggestionBubble>
          <SuggestionBubble className="visible">
            <Link sx={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.3s', ':hover': { color: theme.palette.primary.main } }} onClick={handleArticleSearch}>
              <Typography variant="body1">Hľadať v článkoch</Typography>
            </Link>
          </SuggestionBubble>
        </Box>
      )}
    </Box>
  );
}