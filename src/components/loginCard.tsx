import * as React from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { slovakiaTheme, worldTheme } from '@/app/theme';

export default function LoginCard() {
  const theme = useTheme();

  const handleGoogleLogin = () => {
    // Add your Google login logic here
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // Add your Facebook login logic here
    console.log('Facebook login');
  };

  const handleRegisterRedirect = () => {
    // Add your registration page redirect logic here
    console.log('Redirect to registration page');
  };

  return (
    <Card sx={{ 
        maxWidth: 400, 
        margin: '10rem auto auto auto',
        padding: '2rem', 
        mt: 5,
        borderRadius: '25px',
        background: `linear-gradient(to left, ${slovakiaTheme.palette.primary.darker}, ${theme.palette.primary.darker}, ${worldTheme.palette.primary.darker})`,
        }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Prihlásenie
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Password" type="password" variant="outlined" fullWidth />
          <Button variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={handleGoogleLogin}>
            Login with Google
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={handleFacebookLogin}>
            Login with Facebook
          </Button>
          <Button variant="text" color="secondary" fullWidth onClick={handleRegisterRedirect}>
            Don't have an account? Register
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}