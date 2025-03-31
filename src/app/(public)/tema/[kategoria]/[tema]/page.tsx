"use client"

import { Container, Typography } from '@mui/material';
import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";
 
export default function TopicPage() {

  return (
    <Container>
      <Navbar/>
      <Menu/>
      <Typography variant="h4" sx={{ paddingTop: "11rem" }}>
        Témák
      </Typography>
    </Container>
  );
}