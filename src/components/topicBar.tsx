'use client';
import * as React from 'react';
import { useTheme, hexToRgb, ThemeProvider } from '@mui/material/styles';
import { defaultTheme, slovakiaTheme, worldTheme, economicsTheme, techTheme, sportTheme, cultureTheme, localTheme } from '../app/theme';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatDistanceToNow, format, formatRelative } from 'date-fns';
import { sk } from 'date-fns/locale';


interface TopicBarProps {
  topic: string;
}

const sources = {
  "index.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "svet.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "domov.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "kultura.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "komentare.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "tech.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "zena.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "primar.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "cestovanie.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "closer.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "byvanie.sme.sk": { "name": "Denník SME", "altImg": "https://play-lh.googleusercontent.com/aGRkiYx0cRu0-8vVFW7XKqDVVJE6uDACbvy1ZWN7oC-DoK5pZRnI7drScbmLPoQBaJI", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "dennikn.sk": { "name": "Denník N", "altImg": "https://www.o2.sk/documents/2355222/107247240/icon-dennikn-rect.png", "logo": "/imgs/logos/DennikNLogo.jpg", "bias": "Liberálne" },
  "e.dennikn.sk": { "name": "Denník E", "altImg": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdennikn.sk%2Fautor%2Fdennike%2F&psig=AOvVaw0uwr7U4o-jadgTJj6kOVl1&ust=1737018174187000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDJ5I2v94oDFQAAAAAdAAAAABAE", "logo": "https://img.projektn.sk/wp-static/2019/08/E-logopack-ko%CC%81pia.png", "bias": "Liberálne" },
  "aktuality.sk": { "name": "Aktuality.sk", "altImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvSB7Dmy62t58koXC7VnHpMhiAX0MFJMwg61oA62ZbsVYiDWDCpl-sBQSHj9Cuu-vjgcA&usqp=CAU", "logo": "https://yt3.googleusercontent.com/UpztC0l89FsGPrBDPOO39yCse9NtL5BMNCEUOG_RpWf2HP3JVhRYeefDd3zF2cO6Y43_Gwdkww=s900-c-k-c0x00ffffff-no-rj", "bias": "Liberálne" },
  "spravy.stvr.sk": { "name": "Správy STVR", "altImg": "https://www.rtvs.sk/media/a501/image/file/2/0991/spravy.png", "logo": "https://play-lh.googleusercontent.com/ZGHCs-gYk1Nh4feuAwS7l2A9q9yGfZ-Ol9RSUfRwromvJcV6FbDaWsHELtf40XME1y1J", "bias": "Stredové" },
};

export default function TopicBar({ topic }: TopicBarProps) {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      padding:'1rem', 
      width:'100%', 
      height:"5rem", 
      }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '30px',
        backdropFilter: 'blur(10px)', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            //backgroundColor: theme.palette.primary.main,
            opacity: 0.7, 
            zIndex: -1,
            borderRadius: '30px'
        }
        }}>
            <Typography variant="h2" sx={{ color: theme.palette.text.primary }}>{topic}</Typography>
        </Box>
    </Box>
      
  );
}


/*export default function ThemedArticleCardLg(props: ArticleCardLgProps) {
  const source = props.sourceLink.split("/")[2] as keyof typeof sources;
  const cardTheme = sources[source]?.bias === "Liberálne" ? worldTheme : sources[source]?.bias === "Stredové" ? defaultTheme : sources[source]?.bias === "Konzervatívne" ? slovakiaTheme : defaultTheme;
  return (
    <ThemeProvider theme={cardTheme}>
      <ArticleCardLg {...props} />
    </ThemeProvider>
  );
}*/