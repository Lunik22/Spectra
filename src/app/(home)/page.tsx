"use client"
import { Container } from "@mui/material";
import Navbar from "../../components/navbar";
import Menu from "../../components/menu";
import Feed from "@/components/feed";

export default function Home() {
  return (
    <Container>
      <Navbar/>
      <Menu/>
      <Feed/>
    </Container>
  );
}
