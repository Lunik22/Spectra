'use client';
import * as React from 'react';
import { useTheme, hexToRgb, ThemeProvider } from '@mui/material/styles';
import { defaultTheme, slovakiaTheme, worldTheme, economicsTheme, techTheme, sportTheme, cultureTheme, localTheme } from '../app/theme';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatDistanceToNow, format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { sources } from 'next/dist/compiled/webpack/webpack';

interface ArticleCardLgProps {
  title: string;
  image: string;
  date: string;
  sourceLink: string;
}

const sources = {
  "index.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "svet.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "domov.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "kultura.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "komentare.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "tech.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "zena.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "primar.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "cestovanie.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "closer.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" },
  "byvanie.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "bias": "Liberálne" }
};

function ArticleCardLg({ title, image, date, sourceLink }: ArticleCardLgProps) {
  const theme = useTheme();

  const source = sourceLink.split("/")[2] as keyof typeof sources;

  if (!sources[source]) {
    console.error(`Source not found for link: ${sourceLink}`);
    return null; // Return null if the source is not found
  }

  if (image == null) {
    image = sources[source]["altImg"];
  }


  const articleDate = new Date(1000 * Number(date));
  const now = new Date();
  const timeDifference = now.getTime() - articleDate.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const formattedDate = timeDifference < oneDayInMilliseconds
    ? formatDistanceToNow(articleDate, { addSuffix: true, locale: sk })
    : format(articleDate, 'dd.MM.yyyy HH:mm');


  return (
    <Card sx={{ display: 'flex', bgcolor: "primary.main", borderRadius: '25px', height: '20rem', marginY: '1.5rem'}}>
      <CardMedia
        component="img"
        sx={{ width: '50%' }}
        image={image}
        alt="Img"
      />
      <Box sx={{ display: 'flex', padding:'1rem', width:'50%', flexDirection: 'column', background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`}}>
        <CardContent sx={{ flex: '1 0 auto'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <CardMedia
                  component="img"
                  sx={{ width: '10%', marginRight: '1rem', borderRadius: '25%' }}
                  image={sources[source]["altImg"]}
                  alt="Img"
              />
              <Typography 
                component="div" 
                variant="h3"
                sx={{
                  color: 'text.primary',
                  WebkitTapHighlightColor: 'primary.main',
                  '&::selection': {
                    backgroundColor: theme.palette.text.primary,
                    color: theme.palette.primary.dark,
                  },
                }}>
                
                {sources[source]["name"]}
              </Typography>
            </Box>
            <Typography 
              component="div" 
              variant="h3"
              sx={{
                color: 'text.primary',
                WebkitTapHighlightColor: 'primary.main',
                '&::selection': {
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.primary.dark,
                },
              }}>
              {formattedDate}
            </Typography>
          </Box>
          <Typography
            variant="h1"
            component="div"
            sx={{
              color: 'text.primary',
              padding: '1rem 0 1rem 0',
              WebkitTapHighlightColor: 'primary.main',
              '&::selection': {
                backgroundColor: theme.palette.text.primary,
                color: theme.palette.primary.dark,
              },
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Box>
      
    </Card>
  );
}


export default function ThemedArticleCardLg(props: ArticleCardLgProps) {
  const source = props.sourceLink.split("/")[2] as keyof typeof sources;
  const cardTheme = sources[source]?.bias === "Liberálne" ? worldTheme : defaultTheme;
  return (
    <ThemeProvider theme={cardTheme}>
      <ArticleCardLg {...props} />
    </ThemeProvider>
  );
}