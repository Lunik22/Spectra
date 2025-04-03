"use client"

import { Container, Typography } from '@mui/material';
import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";
import TopicFeed from '@/components/topicFeed';
 
export default function TopicPage() {

  return (
    <Container>
      <Navbar/>
      <Menu/>
      <TopicFeed/>
    </Container>
  );
}