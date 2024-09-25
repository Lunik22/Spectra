import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { Container } from "@mui/material";

export default function Page() {
  return (
    <Container>
      <Stack spacing={2} sx={{ paddingTop: "10.5rem" }}>
        <Typography variant="h2">Login</Typography>
      </Stack>
    </Container>
  );
}
