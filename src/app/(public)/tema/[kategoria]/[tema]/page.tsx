"use client"

import { Container, Fade } from '@mui/material';
import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";
import TopicFeed from '@/components/topicFeed';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
 
export default function TopicPage() {
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
        <Navbar/>
        <Menu onNavigate={handleRouteChange}/>
        <TopicFeed/>
      </Container>
    </Fade>
  );
}