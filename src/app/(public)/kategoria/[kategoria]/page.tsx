"use client"

import { Container, Fade } from '@mui/material';
import Navbar from "../../../../components/navbar";
import Menu from "../../../../components/menu";
import Feed from '@/components/feed';

export default function CategoryPage() {
  return (
    <Fade in={true} timeout={500}>
      <Container>
        <Navbar/>
        <Menu/>
        <Feed/>
      </Container>
    </Fade>
  );
}
