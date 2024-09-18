'use client';
import type { Metadata } from "next";
import "./globals.css";
import Container from "@mui/material/Container"
import Navbar from "./components/navbar";
import Menu from "./components/menu";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { defaultTheme, slovakiaTheme, worldTheme, economicsTheme, techTheme, sportTheme, cultureTheme, localTheme } from './theme';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';

const montserrat = Montserrat({ subsets: ['latin-ext'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const theme = pathname.startsWith('/slovensko') ? slovakiaTheme : pathname.startsWith('/svet') ? worldTheme : pathname.startsWith('/politika-a-ekonomika') ? economicsTheme : pathname.startsWith('/technologie-a-veda') ? techTheme : pathname.startsWith('/sport') ? sportTheme : pathname.startsWith('/kultura-a-zabava') ? cultureTheme : pathname.startsWith('/miestne-spravy') ? localTheme : defaultTheme;
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Navbar/>
            <Menu/>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
