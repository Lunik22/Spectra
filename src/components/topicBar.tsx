'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { defaultTheme, slovakiaTheme, worldTheme } from '../app/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getArticle } from '@/services/articleService';
import { Topic } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TopicBarProps {
  topic: Topic;
  alignment: 'l' | 's' | 'k';
  onArticleChange: (topicId: string, newArticle: any, alignment: 'l' | 's' | 'k') => void;
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

/*123*/ 

export default function TopicBar({ topic, alignment, onArticleChange, alignmentCounts }: TopicBarProps) {
    const theme = useTheme();
    const [currentAlignment, setCurrentAlignment] = React.useState(alignment);

    const handleAlignment = async (event: React.MouseEvent<HTMLElement>, newAlignment: 'l' | 's' | 'k') => {
      if (newAlignment !== null) {
        setCurrentAlignment(newAlignment);
        const newArticles = await getArticle(topic.$id, alignmentCounts, newAlignment);
        onArticleChange(topic.$id, newArticles, newAlignment);
        console.log(newArticles);
      }
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
      } else {
        themePalette = slovakiaTheme.palette;
      }

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
      };
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
    console.log(alignment);


    if (alignment === 'l' || alignment === 's' || alignment === 'k') {
      return (
        <Box sx={{ 
          display: 'flex', 
          padding:'1rem', 
          width:'100%', 
          height:"5rem", 
          justifyContent: 'space-between',
          }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            py: '1rem',
            px: '2rem',
            borderRadius: '30px',
            width: '50%',
            backdropFilter: 'blur(10px)', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transform: 'translateX(15pt)',
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
            <Link href={`/tema/${category}/${topic.$id}`} passHref>
              <Typography variant="h2" sx={{ color: theme.palette.text.primary }}>{topic.TopicName}</Typography>
            </Link>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: '1rem',
            transform: 'translateX(-15pt)'
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
              <ToggleButton value='l' aria-label='l' sx={getButtonStyles('l', alignmentCounts['l'] === 0)} disabled={alignmentCounts['l'] === 0}>
                {alignmentCounts['l']} {articleName(alignmentCounts['l'])}
              </ToggleButton>
              <ToggleButton value='s' aria-label='s' sx={getButtonStyles('s', alignmentCounts['s'] === 0)} disabled={alignmentCounts['s'] === 0}>
                {alignmentCounts['s']} {articleName(alignmentCounts['s'])}
              </ToggleButton>
              <ToggleButton value='k' aria-label='k' sx={getButtonStyles('k', alignmentCounts['k'] === 0)} disabled={alignmentCounts['k'] === 0}>
                {alignmentCounts['k']} {articleName(alignmentCounts['k'])}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      );
    } else{
      
    }
    
}