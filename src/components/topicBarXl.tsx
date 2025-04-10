'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { defaultTheme, slovakiaTheme, worldTheme } from '../app/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import { Topic } from '@/types';
import { redirect, usePathname } from 'next/navigation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import { getLoggedInUser } from '@/appwrite/authService';
import { getFollowedTopics, setFollowedTopics, undoFollowedTopics } from '@/services/followService';

interface TopicBarProps {
  $id: string;
  topic: Topic;
  alignment: '' | 'l' | 's' | 'k';
  onArticleChange: (alignment: '' | 'l' | 's' | 'k') => void;
  alignmentCounts: { 'l': number, 's': number, 'k': number };
}

const articleName = (count: number): string => {
  if (count === 1) {
    return 'článok';
  } else if (count > 1 && count < 5) {
    return 'články';
  } else {
    return 'článkov';
  }
}

export default function TopicBarXl({ $id, topic, alignment, onArticleChange, alignmentCounts }: TopicBarProps) {
  const theme = useTheme();
  const [currentAlignment, setCurrentAlignment] = useState(alignment);
  const [userId, setUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false); // State to track follow status

  const handleAlignment = async (event: React.MouseEvent<HTMLElement>, newAlignment: '' | 'l' | 's' | 'k') => {
    if (newAlignment !== null) {
      setCurrentAlignment(newAlignment);
      onArticleChange(newAlignment);
    }
  };

  useEffect(() => {
    getLoggedInUser().then(user => {
      setUserId(user?.$id || null); // Get the user ID from the logged-in user
    });
  }, []);

  useEffect(() => {
    if (userId) {
      getFollowedTopics(userId, $id).then((response: unknown) => {
        if (response) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
    }
  }, [userId, $id]); // Ensure this hook runs when `userId` or `$id` changes
  

  const handleFollowChange = () => {
    if (!userId) {
      redirect('/autentifikacia/prihlasenie');
    } else {
      if (!isFollowing) {
        setFollowedTopics(userId, $id).then(() => {
          console.log("Article bookmarked successfully!");
        }).catch((error) => {
          console.error("Error bookmarking article:", error);
        });
      } else {
        undoFollowedTopics(userId, $id).then(() => {
          console.log("Article unbookmarked successfully!");
        }).catch((error) => {
          console.error("Error unbookmarking article:", error);
        });
      }
    }
    setIsFollowing(!isFollowing);
  };

  React.useEffect(() => {
    setCurrentAlignment(alignment);
  }, [alignment]);

  const getButtonStyles = (value: string, disabled: boolean) => {
    let themePalette;
    if (value === 'l') {
      themePalette = worldTheme.palette;
    } else if (value === 's') {
      themePalette = defaultTheme.palette;
    } else if (value === 'k') {
      themePalette = slovakiaTheme.palette;
    } else {
      themePalette = defaultTheme.palette;
    }

    if (value !== ''){
      return {
        borderRadius: '30px',
        py: '0.5rem',
        px: '1rem',
        color: themePalette.text.primary,
        transition: 'color 0.3s, background 0.3s',
        '&::before': {
              content: '""',
              position: 'absolute',
              background: disabled ? 'grey' : `radial-gradient(${themePalette.primary.main}, ${themePalette.primary.dark})`,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.8, 
              zIndex: -1,
              borderRadius: '30px',
              transition: '0.3s',
        },
        ":hover": {
          transition: 'color 0.3s, background 0.3s',
          borderRadius: '30px',
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
        },
        "&.Mui-selected": {
          color: themePalette.primary.main,
          borderRadius: '30px',
          background: disabled ? 'grey' : `${themePalette.text.primary}`,
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
          },
          ":hover": {
            borderRadius: '30px',
            background: disabled ? 'grey' : `${themePalette.text.primary}`,
          }
        }
      }
    } else {
      return {
        borderRadius: '30px',
        py: '0.5rem',
        px: '1rem',
        color: themePalette.text.primary,
        transition: 'color 0.3s, background 0.3s',
        '&::before': {
              content: '""',
              position: 'absolute',
              background: disabled ? 'grey' : `linear-gradient(90deg, ${themePalette.primary.left}, ${themePalette.primary.main}, ${themePalette.primary.right})`,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.8, 
              zIndex: -1,
              borderRadius: '30px',
              transition: '0.3s',
        },
        ":hover": {
          transition: 'color 0.3s, background 0.3s',
          borderRadius: '30px',
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
        },
        "&.Mui-selected": {
          color: themePalette.primary.main,
          borderRadius: '30px',
          background: disabled ? 'grey' : `${themePalette.text.primary}`,
          
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
          },
          ":hover": {
            borderRadius: '30px',
            background: disabled ? 'grey' : `${themePalette.text.primary}`,
          }
        }
      }
    }
    
  };

  const hostname = usePathname();
  const parts = hostname.split('/');
  let category = "0";
  if (parts[1] === 'kategoria') {
    category = parts[2];
  } else {
    category
  }

  console.log(alignmentCounts);


  if (alignment === '' || alignment === 'l' || alignment === 's' || alignment === 'k') {
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
            Téma {topic.TopicName}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              '&:hover .tooltip': {
                visibility: 'visible',
                opacity: 1,
              },
            }}
          >
            <IconButton
              onClick={handleFollowChange}
              sx={{
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {isFollowing ? <CheckCircleIcon /> : <AddCircleOutlineIcon />}
            </IconButton>
            <Box
              sx={{
                visibility: 'hidden',
                backgroundColor: theme.palette.primary.darker,
                color: theme.palette.text.primary,
                textAlign: 'center',
                borderRadius: '30px',
                px: '1rem',
                py: '0.5rem',
                position: 'absolute',
                zIndex: 1,
                bottom: '125%',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                opacity: 0,
                transition: 'opacity 0.3s, visibility 0.3s',
              }}
              className="tooltip"
            >
              {isFollowing ? 'Vymazať sledovanie' : 'Sledovať tému'}
            </Box>
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: '1rem',
          transform: 'translateX(-15px)'
        }}>
          <ToggleButtonGroup
            value={currentAlignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{ 
              display: 'flex',
              gap: '1rem', 
            }}
          >
            <ToggleButton value='' aria-label='' sx={getButtonStyles('', (alignmentCounts['l'] + alignmentCounts['s'] + alignmentCounts['k']) === 0)} disabled={(alignmentCounts['l'] + alignmentCounts['s'] + alignmentCounts['k']) === 0}>
              {currentAlignment === '' 
                ? `Všetky zdroje`
                : `${(alignmentCounts['l'] + alignmentCounts['s'] + alignmentCounts['k'])} ${articleName((alignmentCounts['l'] + alignmentCounts['s'] + alignmentCounts['k']))}`}
            </ToggleButton>
            <ToggleButton
                value='l'
                aria-label='l'
                sx={getButtonStyles('l', alignmentCounts['l'] <= 0)} // Ensure button is only disabled if count is 0 or less
                disabled={alignmentCounts['l'] <= 0}
              >
                {currentAlignment === 'l'
                  ? `Liberálne zdroje`
                  : `${alignmentCounts['l']} ${articleName(alignmentCounts['l'])}`}
              </ToggleButton>
              <ToggleButton
                value='s'
                aria-label='s'
                sx={getButtonStyles('s', alignmentCounts['s'] <= 0)} // Ensure button is only disabled if count is 0 or less
                disabled={alignmentCounts['s'] <= 0}
              >
                {currentAlignment === 's'
                  ? `Stredové zdroje`
                  : `${alignmentCounts['s']} ${articleName(alignmentCounts['s'])}`}
              </ToggleButton>
              <ToggleButton
                value='k'
                aria-label='k'
                sx={getButtonStyles('k', alignmentCounts['k'] <= 0)} // Ensure button is only disabled if count is 0 or less
                disabled={alignmentCounts['k'] <= 0}
              >
                {currentAlignment === 'k'
                  ? `Konzervatívne zdroje`
                  : `${alignmentCounts['k']} ${articleName(alignmentCounts['k'])}`}
              </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    );
  }
  
}