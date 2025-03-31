'use client';

import { Button } from "@mui/material";


export default function LoginButton() {
    return (
        <Button 
          variant="contained" 
          color="primary" 
          href="/autentifikacia/prihlasenie" 
          sx={{ 
              borderRadius: '2rem',
              zIndex: 3,
              width: '10rem', 
              height: '2.5rem',
              
          }}>
            Prihlásiť sa
        </Button>
    );
}