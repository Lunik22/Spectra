'use client';
import * as React from 'react';
import { Box, Button, Card, CardContent, Typography, InputBase, styled, Modal, Fade } from '@mui/material';
import { getAvatarURL, getLoggedInUser, signInWithEmail } from '@/appwrite/authService';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/useAuth';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const CustomInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: '30px', // Rounded corners
    backgroundColor: 'transparent', // Fill with background color
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${theme.palette.text.primary}`, // Border color
    transition: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
    '&:focus': {
      backgroundColor: theme.palette.text.primary, // Slightly lighter fill on focus
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main, // Change border color on focus
    },
  },
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '30px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
    zIndex: -1,
    borderRadius: '30px',
  }
}));

export default function LoginCard() {
  const theme = useTheme();
  const router = useRouter();
  const { setAuthStatus } = useAuth();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false); // State to control the popup

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const formDataObj = {
        email: formData.email,
        password: formData.password,
      };

      await signInWithEmail(formDataObj);

      // Clear existing cookies
      Cookies.remove('user');
      Cookies.remove('avatar');

      // Fetch and store new user data
      const loggedInUser = await getLoggedInUser();
      const avatarResponse = await getAvatarURL();
      const avatarBase64 = avatarResponse ? Buffer.from(avatarResponse).toString('base64') : '';
      const avatarData = `data:image/png;base64,${avatarBase64}`;

      Cookies.set('user', JSON.stringify(loggedInUser), { expires: 7 });
      Cookies.set('avatar', avatarData, { expires: 7 });

      setAuthStatus(true);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Login failed');
      } else {
        setError('Login failed');
      }
      setOpen(true); // Open the popup on error
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the popup
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          margin: 'auto',
          padding: '3rem',
          borderRadius: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: 'transparent',
          position: 'relative',
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h1" sx={{ mb: '2rem' }}>Prihlásenie</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <CustomInput
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
            />
            <CustomInput
              placeholder="Heslo"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleLogin}
              fullWidth
              sx={{ 
                  borderRadius: '2rem',
                  zIndex: 3,
                  width: '100%', 
                  height: '2.5rem',
                  backdropFilter: 'blur(10px)', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `linear-gradient(to right,${theme.palette.primary.left}, ${theme.palette.primary.main}, ${theme.palette.primary.right})`,
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
                Prihlásiť sa
            </Button>
            <Link href="/autentifikacia/registracia" passHref>
              <Typography variant="h3" sx={{ 
                textAlign: 'center', 
                color: theme.palette.text.primary,
                transition: 'color 0.3s',
                '&:hover': {
                  color: theme.palette.primary.main,
                  transition: 'color 0.3s',
                },
                
              }}>
                Ešte nemáte účet? Zaregistrujte sa!
              </Typography>
            </Link>
          </Box>
        </CardContent>
      </Card>

      {/* Error Popup */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              backdropFilter: 'blur(10px)',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              borderRadius: '20px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleClose}
              sx={{ 
                  borderRadius: '2rem',
                  zIndex: 3,
                  width: '10rem', 
                  height: '2.5rem',
              }}>
                Zavrieť
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
