'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, InputBase, styled, Avatar } from '@mui/material';
import { useUser } from '@/context/userContext';
import { redirect } from 'next/navigation';

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

export default function ProfilePageForm() {
  const { user, avatar } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    async function checkUser() {
      if (!user) {
        redirect("/autentifikacia/prihlasenie"); // Redirect to login if user is not logged in
      }
    }
    checkUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSaveChanges = () => {
    // Logic for saving changes (e.g., updating profile picture, name, email, or password)
    console.log('Saving changes:', formData, profilePicture);
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: 'auto',
        padding: '3rem',
        marginTop: '10rem',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={avatar ? `data:image/png;base64,${avatar}` : undefined} // Ensure avatar is properly formatted
          alt="Profile Picture"
          sx={{ width: 150, height: 150, marginBottom: '1rem' }}
        />
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
            sx={{
              borderRadius: '2rem',
              zIndex: 3,
              width: '100%',
              height: '2.5rem',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Nahraj novú profilovú fotku
          </Button>
        </label>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <CustomInput
            placeholder="Meno"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
          <CustomInput
            placeholder="Nové heslo"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
          />
          <CustomInput
            placeholder="Zopakujte nové heslo"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          sx={{
            borderRadius: '2rem',
            zIndex: 3,
            width: '100%',
            height: '2.5rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Uložiť zmeny
        </Button>
      </CardContent>
    </Card>
  );
}
