"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { AppBar, Card, Container, Toolbar, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import LoginCard from "@/components/loginCard";

export default function Login() {
    const router = useRouter();
    const theme = useTheme();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/profile");
        return <></>;
    }

    return(
        <Container sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            height: '100vh', 
            justifyContent: 'space-evenly'
            }}>
            <Card sx={{ display: 'flex', flexDirection: 'column'}}>
                <img src={theme.custom.logoPath} alt="" style={{ height: '4rem'}}/>
                <Typography variant="h3" align="center">Prihlásenie</Typography>
            </Card>
            <Card>
                <LoginCard/>
            </Card>
        </Container>
    )
}
