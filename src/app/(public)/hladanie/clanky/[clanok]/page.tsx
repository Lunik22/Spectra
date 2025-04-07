"use client"

import { Container, Fade } from '@mui/material';
import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { useState } from 'react';
import SearchedArticlesFeed from '@/components/searchedArticlesFeed';

export default function SearchArtilcesPage() {
  const [fadeIn, setFadeIn] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get the current page link
  let searchedTerm = pathname.split("/").pop() || ''; // Extract the search term from the URL
  searchedTerm = decodeURIComponent(searchedTerm); // Decode the term to handle diacritics
  console.log(searchedTerm); // Log the searched term for debugging


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
        <SearchedArticlesFeed searchedTerm={searchedTerm}/>
      </Container>
    </Fade>
  );
}