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
import { ArticleCardXlProps } from '@/types';
import { IconButton } from '@mui/material';
/*import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';*/
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getLoggedInUser } from '@/appwrite/authService';
import { getBookmarks, setBookmark, undoBookmark } from '@/services/bookmarkService';
import { redirect } from "next/navigation";
import { useEffect, useState } from 'react';
import { getFollowedSources } from '@/services/followService';



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

export default function ArticleCardXl({ $id, title, image, date, sourceLink, paywall, authors, preview, reliability, type, language }: ArticleCardXlProps) {
  const theme = useTheme();
  const [userId, setUserId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); 
  const [isBookmarked, setIsBookmarked] = useState(false); 

  useEffect(() => {
    getLoggedInUser().then(user => {
      setUserId(user?.$id || null); // Get the user ID from the logged-in user
    });
  }, []);

  useEffect(() => {
    if (userId) {
      getBookmarks(userId, $id).then((response: unknown) => {
        if (response) {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      });
    }
  }, [userId, $id]); // Ensure this hook runs when `userId` or `$id` changes

  if (!sourceLink) {
    console.error("Source link is undefined or null.");
    return null; // Return early to avoid further errors
  }

  const source = sourceLink.split("/")[2] as keyof typeof sources;

  useEffect(() => {
    if (userId) {
      getFollowedSources(userId, sources[source].name).then((response: unknown) => {
        if (response) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
    }
  }, [userId, $id]); // Ensure this hook runs when `userId` or `$id` changes

  

  if (!sources[source]) {
    console.error(`Source not found for link: ${sourceLink}`);
    return null; // Return null if the source is not found
  }

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
    formattedDate = formattedDate.toString().replace("približne", "");
  }

  let appliedTheme = theme;
  if (sources[source]?.bias === 'Liberálne') {
    appliedTheme = worldTheme;
    console.log(paywall)
    console.log(reliability)
    console.log(language)
  } else if (sources[source]?.bias === 'Stredové') {
    appliedTheme = defaultTheme;
  } else if (sources[source]?.bias === 'Konzervatívne') {
    appliedTheme = slovakiaTheme;
  }

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  /*const handleFollowChange = () => {
    if (!userId) {
      redirect('/autentifikacia/prihlasenie');
    } else {
      if (!isFollowing) {
        setFollowedSources(userId, sources[source].name).then(() => {
          console.log("Article bookmarked successfully!");
        }).catch((error) => {
          console.error("Error bookmarking article:", error);
        });
      } else {
        undoFollowedSources(userId, sources[source].name).then(() => {
          console.log("Article unbookmarked successfully!");
        }).catch((error) => {
          console.error("Error unbookmarking article:", error);
        });
      }
    }
    setIsFollowing(!isFollowing);
  };*/

  const handleBookmarkChange = () => {
    if (!userId) {
      redirect('/autentifikacia/prihlasenie');
    } else {
      if (!isBookmarked) {
        setBookmark(userId, $id).then(() => {
          console.log("Article bookmarked successfully!");
        }).catch((error) => {
          console.error("Error bookmarking article:", error);
        });
      } else {
        undoBookmark(userId, $id).then(() => {
          console.log("Article unbookmarked successfully!");
        }).catch((error) => {
          console.error("Error unbookmarking article:", error);
        });
      }
    }
    setIsBookmarked(!isBookmarked); 
  }

  return (
    <Card
      sx={{
        display: 'flex',
        height: expanded ? '30rem' : '20rem',
        marginY: '1.5rem',
        alignItems: 'center',
        transition: 'height 0.3s ease-in-out', // Smooth transition for height
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: expanded ? '40%' : '50%',
          transform: 'translateX(30pt)',
          borderRadius: '30px',
          height: '100%',
          transition: '0.3s ease-in-out', // Smooth transition for image height
        }}
        image={image}
        alt="Img"
      />
      <Box
        sx={{
          display: 'flex',
          padding: '1rem',
          width: expanded ? '60%' : '50%',
          height: '95%',
          flexDirection: 'column',
          transform: 'translateX(-30pt)',
          borderRadius: '30px',
          backdropFilter: 'blur(10px)',
          transition: '0.3s ease-in-out',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(${appliedTheme.palette.primary.main}, ${appliedTheme.palette.primary.dark})`,
            opacity: 0.8,
            zIndex: -1,
            borderRadius: '30px',
          },
        }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', width: '70%' }}>
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
                      marginRight: '0.5rem',
                      color: appliedTheme.palette.text.primary,
                      WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                      '&::selection': {
                        backgroundColor: appliedTheme.palette.text.primary,
                        color: appliedTheme.palette.primary.dark,
                      },
                    }}
                  >
                    {sources[source]["name"]}
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
                      onClick={handleBookmarkChange}
                      sx={{
                        color: theme.palette.text.primary,
                        opacity: expanded ? 1 : 0,
                        transform: expanded ? 'scale(1)' : 'scale(0.8)',
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out, color 0.3s ease-in-out',
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
                      {isFollowing ? 'Vymazať uložnie' : 'Uložiť článok'}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  width: '100%',
                }}>
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
                    <CardMedia
                      component="img"
                      sx={{
                        width: '1.75rem',
                        marginRight: '1rem',
                        borderRadius: '25%',
                        opacity: expanded ? 1 : 0,
                        transform: expanded ? 'scale(1)' : 'scale(0.8)',
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      }}
                      image={reliability == 2 ? '/imgs/main/true.svg' : reliability == 1 ? '/imgs/main/misleading.svg' : '/imgs/main/false.svg'}
                      alt="Reliability"
                    />
                    <Box
                      sx={{
                        visibility: 'hidden',
                        backgroundColor: appliedTheme.palette.primary.darker,
                        color: appliedTheme.palette.text.primary,
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
                      {reliability == 2 ? 'Tento článok bol vyhodnotený ako pravdivý.' : reliability == 1 ? 'Tento článok bol vyhodnotený ako zavádzajúci, alebo vyjadrujúci subjektívny názor.' : 'Tento článok bol vyhodnotený ako nepravdivý.'}
                    </Box>
                  </Box>
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
                    <CardMedia
                      component="img"
                      sx={{
                        width: '1.75rem',
                        marginRight: '1rem',
                        borderRadius: '25%',
                        opacity: expanded ? 1 : 0,
                        transform: expanded ? 'scale(1)' : 'scale(0.8)',
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      }}
                      image={paywall ? '/imgs/main/paywall.svg' : '/imgs/main/noPaywall.svg'}
                      alt="Paywall"
                    />
                    <Box
                      sx={{
                        visibility: 'hidden',
                        backgroundColor: appliedTheme.palette.primary.darker,
                        color: appliedTheme.palette.text.primary,
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
                      {paywall ? 'Na prečítanie celého článku je nutné zakúpenie predplatného.' : 'Na prečítanie celého článku nie je nutné zakúpenie predplatného.'}
                    </Box>
                  </Box>
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
                    <CardMedia
                      component="img"
                      sx={{
                        width: '1.75rem',
                        marginRight: '1rem',
                        borderRadius: '25%',
                        opacity: expanded ? 1 : 0,
                        transform: expanded ? 'scale(1)' : 'scale(0.8)',
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      }}
                      image={language == 'Štandardný' ? '/imgs/main/informational.svg' : '/imgs/main/sensational.svg'}
                      alt="Language"
                    />
                    <Box
                      sx={{
                        visibility: 'hidden',
                        backgroundColor: appliedTheme.palette.primary.darker,
                        color: appliedTheme.palette.text.primary,
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
                      {language == 'Štandardný' ? 'Tento článok je písaný štandardným jazykom.' : 'Článok je písaný senzaciálnym jazykom, alebo sa vyjadruje názor.'}
                    </Box>
                  </Box>
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
                      textAlign: 'right',
                    }}
                  >
                    {formattedDate}
                  </Typography>
                </Box>
                  
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  marginTop: '1rem',
                  opacity: expanded ? 1 : 0,
                  maxHeight: expanded ? '100px' : '0px',
                  overflow: 'hidden',
                  transition: 'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out',
                }}
              >
                {authors.map((author, index) => {
                  if (index == 2) {
                    return (
                      <Typography
                        key={index}
                        component="div"
                        variant="h4"
                        sx={{
                          color: appliedTheme.palette.text.primary,
                          marginRight: '0.5rem',
                          WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                          '&::selection': {
                            backgroundColor: appliedTheme.palette.text.primary,
                            color: appliedTheme.palette.primary.dark,
                          },
                        }}
                      >
                        A ďalší
                      </Typography>
                    );
                  } else if (index >= 3) {
                    return null; // Skip rendering for authors after the third one
                  
                  } else {
                    return (
                      <Typography
                        key={index}
                        component="div"
                        variant="h4"
                        sx={{
                          color: appliedTheme.palette.text.primary,
                          marginRight: '0.5rem',
                          WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                          '&::selection': {
                            backgroundColor: appliedTheme.palette.text.primary,
                            color: appliedTheme.palette.primary.dark,
                          },
                        }}
                      >
                        {author}
                      </Typography>
                    );
                  }
                })}
                <Typography
                    component="div"
                    variant="h4"
                    sx={{
                      color: appliedTheme.palette.text.primary,
                      marginRight: '0.5rem',
                      WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                      '&::selection': {
                        backgroundColor: appliedTheme.palette.text.primary,
                        color: appliedTheme.palette.primary.dark,
                      },
                    }}
                  >
                    |  {type}
                  </Typography>
              </Box>
              <Typography
                variant="h1"
                component="div"
                sx={{
                  color: appliedTheme.palette.text.primary,
                  fontSize: expanded ? '2rem' : '1.75rem',
                  fontWeight: '700',
                  padding: expanded ? '1rem 0 1rem 0' : '0 0 1rem 0',
                  WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                  transition: '0.3s',
                  ':hover': {
                    color: appliedTheme.palette.primary.main,
                    transition: '0.3s',
                  },
                }}
              >
                <Link href={sourceLink} passHref>
                  {title}
                </Link>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  opacity: expanded ? 1 : 0,
                  maxHeight: expanded ? '100px' : '0px',
                  overflow: 'hidden',
                  transition: 'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out',
                }}
              >
                <Typography>{preview}</Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
              onClick={toggleExpand}
            >
              <Typography
                variant="h3"
                sx={{
                  color: appliedTheme.palette.text.primary,
                  fontSize: '1rem',
                  WebkitTapHighlightColor: appliedTheme.palette.primary.main,
                  transition: '0.3s',
                  marginLeft: '0.5rem'
                }}
              >
                {expanded ? 'Zobraziť menej' : 'Čítať viac'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

