'use client';
import * as React from 'react';
import { Box, Button, Card, CardContent, Typography, InputBase, styled, Modal, Fade, Checkbox } from '@mui/material';
import { signUpWithEmail } from '@/appwrite/authService';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';

const CustomInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: '30px',
    backgroundColor: 'transparent',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${theme.palette.text.primary}`,
    transition: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
    '&:focus': {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '30px',
}));

const FileInput = styled('input')({
  display: 'none',
});

export default function RegistrationCard() {
  const theme = useTheme();
  const router = useRouter();
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '', confirmPassword: '', profilePicture: null });
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [profilePicture, setProfilePicture] = React.useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSizeInBytes = 102400 ; 

      if (!validTypes.includes(file.type)) {
        setError('Podporované sú iba formáty JPG, PNG a GIF.');
        setOpen(true);
        return;
      }

      if (file.size > maxSizeInBytes) {
        setError('Maximálna veľkosť profilovej fotky je 1MB.');
        setOpen(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        Cookies.set('profile-picture', base64String, { expires: 7 }); // Save profile picture to cookies
        setProfilePicture(file);
      };
      reader.readAsDataURL(file);
      
    }
  };

  const handleRegister = async () => {
    if (!termsAccepted) {
      setError('Musíte súhlasiť s podmienkami používania.');
      setOpen(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Heslá sa nezhodujú.');
      setOpen(true);
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      if (profilePicture) {
        formDataObj.append('profilePicture', profilePicture);
      }
      await signUpWithEmail(formDataObj);
      router.push('/autentifikacia/prihlasenie');
    } catch (error) {
      setError('Registrácia zlyhala. Skontrolujte svoje údaje.');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
          <Typography variant="h1" sx={{ mb: '2rem' }}>Registrácia</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <CustomInput
              placeholder="Používateľské meno"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
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
            <CustomInput
              placeholder="Zopakujte heslo"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
            />
            <Box>
              <label htmlFor="profile-picture-upload">
                <FileInput
                  id="profile-picture-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{
                    borderRadius: '2rem',
                    zIndex: 3,
                    width: '100%',
                    height: '2.5rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Nahrať profilovú fotku
                </Button>
              </label>
              {profilePicture && (
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  {profilePicture.name}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                sx={{ color: theme.palette.text.primary, '&.Mui-checked': { color: theme.palette.primary.main } }}
                color="primary"
              />
              <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                Súhlasím so spracovaním osobných údajov a s podmienkami používania
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRegister}
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
                Registrovať sa
            </Button>
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
