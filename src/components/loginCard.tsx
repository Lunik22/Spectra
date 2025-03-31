'use client';
import * as React from 'react';
import { Box, Button, Card, CardContent, Typography, InputBase, styled, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getAvatarURL, getLoggedInUser, signInWithEmail } from '@/appwrite/authService';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/useAuth';
import Cookies from 'js-cookie';

const CustomInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function LoginCard() {
  const theme = useTheme();
  const router = useRouter();
  const { setAuthStatus } = useAuth();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);

      await signInWithEmail(formDataObj);

      // Clear existing cookies
      Cookies.remove('user');
      Cookies.remove('avatar');

      // Fetch and store new user data
      const loggedInUser = await getLoggedInUser();
      const avatarResponse = await getAvatarURL();
      const avatarBase64 = Buffer.from(await avatarResponse).toString('base64');
      const avatarData = `data:image/png;base64,${avatarBase64}`;

      Cookies.set('user', JSON.stringify(loggedInUser), { expires: 7 });
      Cookies.set('avatar', avatarData, { expires: 7 });

      setAuthStatus(true);
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', padding: '2rem', borderRadius: '25px' }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Prihlásenie</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CustomInput
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
          />
          <CustomInput
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
}