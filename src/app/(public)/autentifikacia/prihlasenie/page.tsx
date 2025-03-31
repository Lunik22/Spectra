"use client";
import Typography from "@mui/material/Typography";
import { Card, Container, useTheme } from "@mui/material";
import LoginCard from "@/components/loginCard";

export default async function Login() {
    const theme = useTheme()

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
