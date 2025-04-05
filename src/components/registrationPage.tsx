"use client";
import { Box, Card, Container, Typography, useTheme } from "@mui/material";
import RegistrationCard from "@/components/registrationCard";

export default function RegistrationPage() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                position: 'relative',
                backgroundImage: 'url(/imgs/main/newspapers.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'transparent',
                    zIndex: 1,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.left}, ${theme.palette.primary.main}, ${theme.palette.primary.right})`,
                        opacity: 0.5,
                    },
                }}
            />
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: 'transparent',
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '3rem',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <img src={theme.custom.logoPath} alt="" style={{ height: '5rem', paddingBottom: "0.5rem" }} />
                    <Typography variant="h4" align="center" sx={{ paddingTop: "0.5rem" }}>Všetky uhly pohľadov na jednom mieste</Typography>
                </Card>
                <Card
                    sx={{
                        padding: '2rem',
                        borderRadius: '20px',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <RegistrationCard />
                </Card>
            </Container>
        </Box>
    );
}
