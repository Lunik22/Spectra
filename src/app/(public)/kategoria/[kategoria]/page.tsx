"use client";

import { Container, Fade } from '@mui/material';
import Navbar from "../../../../components/navbar";
import Menu from "../../../../components/menu";
import Feed from '@/components/feed';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryPage() {
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
        <Feed />
      </Container>
    </Fade>
  );
}
