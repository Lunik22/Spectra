'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { defaultTheme, slovakiaTheme, worldTheme} from '../app/theme';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatDistanceToNow, format } from 'date-fns';
import { sk } from 'date-fns/locale';
import Link from 'next/link';
import { ArticleCardLgProps } from '@/types';



const sources: { [key: string]: { name: string; altImg: string; logo?: string; bias: string } } = {
  "index.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "svet.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "domov.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "kultura.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "komentare.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "tech.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "zena.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "primar.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "cestovanie.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "closer.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "byvanie.sme.sk": { "name": "Denník SME", "altImg": "/imgs/altImgs/DennikSmeAlt.jpg", "logo": "/imgs/logos/DennikSMELogo.jpg", "bias": "Liberálne" },
  "dennikn.sk": { "name": "Denník N", "altImg": "/imgs/altImgs/DennikNAlt.jpg", "logo": "/imgs/logos/DennikNLogo.jpg", "bias": "Liberálne" },
  "e.dennikn.sk": { "name": "Denník N", "altImg": "/imgs/altImgs/DennikNAlt.jpg", "logo": "/imgs/logos/DennikNLogo.jpg", "bias": "Liberálne" },
  "www.aktuality.sk": { "name": "Aktuality.sk", "altImg": "/imgs/altImgs/AktualitySkAlt.jpg", "logo": "/imgs/logos/AktualitySkLogo.jpg", "bias": "Liberálne" },
  "spravy.stvr.sk": { "name": "Správy STVR", "altImg": "/imgs/altImgs/SpravyStvrAlt.jpg", "logo": "/imgs/logos/SpravyStvrLogo.jpg", "bias": "Stredové" },
  "tvnoviny.sk": { "name": "TVNoviny.sk", "altImg": "/imgs/altImgs/TvNovinyAlt.jpg", "logo": "/imgs/logos/TvNovinyLogo.jpg", "bias": "Stredové" },
  "www.postoj.sk": { "name": "Denník Postoj", "altImg": "/imgs/altImgs/DennikPostojAlt.jpg", "logo": "/imgs/logos/DennikPostojLogo.jpg", "bias": "Konzervatívne" },
  "hnonline.sk": { "name": "Hospodárske Noviny", "altImg": "/imgs/altImgs/HospodarskeNovinyAlt.jpg", "logo": "/imgs/logos/HospodarskeNovinyLogo.jpg", "bias": "Konzervatívne" },
};

export default function ArticleCardLg({ title, image, date, sourceLink }: ArticleCardLgProps) {
  const theme = useTheme();

  if (!sourceLink) {
    console.error("Source link is undefined or null.");
    return null; // Return early to avoid further errors
  }

  const source = sourceLink.split("/")[2] as keyof typeof sources;

  if (!sources[source]) {
    console.error(`Source not found for link: ${sourceLink}`);
    return null; // Return null if the source is not found
  }


  console.log(image)
  if (image == null || image == "") {
    image = sources[source]["altImg"];
  }


  const articleDate = new Date(1000 * Number(date));
  const now = new Date();
  const timeDifference = now.getTime() - articleDate.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  let formattedDate = timeDifference < oneDayInMilliseconds
    ? formatDistanceToNow(articleDate, { addSuffix: true, locale: sk })
    : format(articleDate, 'dd.MM.yyyy HH:mm');

  if (formattedDate.toString().includes("približne")) {
    console.log(formattedDate.toString());
    formattedDate = formattedDate.toString().replace("približne", "");
  }
  
  let appliedTheme = theme
  if (sources[source]?.bias === 'Liberálne') {
    appliedTheme = worldTheme;
  } else if (sources[source]?.bias === 'Stredové') {
    appliedTheme = defaultTheme;
  } else if (sources[source]?.bias === 'Konzervatívne') {
    appliedTheme = slovakiaTheme;
  }

  return (
    <Card sx={{ display: 'flex', height: '20rem', marginY: '1.5rem', alignItems: 'center'}}>
      <CardMedia
        component="img"
        sx={{ width: '50%', transform: 'translateX(30px)', borderRadius: '30px', height: '100%'}}
        image={image}
        alt="Img"
      />
      <Box sx={{ 
        display: 'flex', 
        padding:'1rem', 
        width:'50%', 
        height:"95%", 
        flexDirection: 'column',  
        transform: 'translateX(-30px)', 
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
            backgroundImage: `radial-gradient(${appliedTheme.palette.primary.main}, ${appliedTheme.palette.primary.dark})`,
            //backgroundColor: theme.palette.primary.main,
            opacity: 0.8, 
            zIndex: -1,
            borderRadius: '30px'
        }
        }}>
        <CardContent sx={{ flex: '1 0 auto'}}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            height: '100%'
          }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', width: '75%'}}>
                  <CardMedia
                      component="img"
                      sx={{ width: '2rem', marginRight: '1rem', borderRadius: '25%' }}
                      image={sources[source]["logo"]}
                      alt="Img"
                  />
                  <Typography 
                    component="div" 
                    variant="h3"
                    sx={{
                      color: appliedTheme.palette.text.primary,
                      WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                      '&::selection': {
                        backgroundColor: appliedTheme.palette.text.primary,
                        color: appliedTheme.palette.primary.dark,
                      },
                  }}>
                    {sources[source]["name"]}
                  </Typography>
                </Box>
                <Typography 
                  component="div" 
                  variant="h3"
                  sx={{
                    color: appliedTheme.palette.text.primary,
                    WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                    width: '100%',
                    '&::selection': {
                      backgroundColor: appliedTheme.palette.text.primary,
                      color: appliedTheme.palette.primary.dark,
                    },
                    textAlign: 'right'
                  }}>
                  {formattedDate}
                </Typography>
              </Box>
              <Typography
                variant="h1"
                component="div"
                sx={{
                  color: appliedTheme.palette.text.primary,
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  padding: '1rem 0 1rem 0',
                  WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                  transition: '0.3s',
                  ':hover': {
                    color: appliedTheme.palette.primary.main,
                    transition: '0.3s',
                  }
                }}
              >
                <Link href={sourceLink} passHref>
                  {title}
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
      
    </Card>
  );
}

