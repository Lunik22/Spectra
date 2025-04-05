"use client";
import Typography from "@mui/material/Typography";
import { Box, Card, Container, useTheme } from "@mui/material";
import LoginCard from "@/components/loginCard";

export default function LoginPage() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                position: 'relative', // Ensure the overlay is positioned correctly
                backgroundImage: 'url(/imgs/main/newspapers.jpg)', // Apply the background image
                backgroundSize: 'cover', // Ensure the image covers the entire screen
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent the image from repeating
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Blurry overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: 'blur(10px)', // Apply blur effect
                    backgroundColor: 'transparent', // Add a semi-transparent dark overlay
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
                    position: 'relative', // Ensure content is above the overlay
                    zIndex: 2, // Ensure content is above the overlay
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
                    <LoginCard />
                </Card>
            </Container>
        </Box>
    );
}
