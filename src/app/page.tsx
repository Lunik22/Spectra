import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { Container } from "@mui/material";
import Navbar from "./components/navbar";
import Menu from "./components/menu";

export default function Home() {
  return (
    <Container>
      <Navbar/>
      <Menu/>
      <Stack spacing={2} sx={{ paddingTop: "10.5rem" }}>
        <Link href="/slovensko" passHref>
          <Button variant="contained" sx={{ borderRadius: "25px", py: "1rem" , width: '100%', height: "25rem"}}>
            Slovensko
          </Button>
        </Link>
        <Link href="/svet" passHref>
          <Button variant="contained" sx={{ borderRadius: "25px", py: "1rem" }}>
            Svet
          </Button>
        </Link>
        <Link href="/svet" passHref>
          <Button variant="contained" sx={{ borderRadius: "25px", py: "1rem" }}>
            Svet
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
