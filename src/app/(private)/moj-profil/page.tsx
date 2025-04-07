"use client";

import { Container, Fade } from '@mui/material';
import Navbar from "../../../components/navbar";
import Menu from "../../../components/menu";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProfilePageForm from "../../../components/profilePage"; // Import the actual ProfilePage component

export default function ProfilePage() { // Rename this function to avoid conflict
  const [fadeIn, setFadeIn] = useState(true);
  const router = useRouter();

  const handleRouteChange = (url: string) => {
    setFadeIn(false);
    setTimeout(() => {
      router.push(url);
    }, 500); // Match the fade-out duration
  };

  return (
    <Fade in={fadeIn} timeout={500}>
      <Container>
        <Navbar />
        <Menu onNavigate={handleRouteChange} />
        <ProfilePageForm /> {/* Render the actual ProfilePage component */}
      </Container>
    </Fade>
  );
}