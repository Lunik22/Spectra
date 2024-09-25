'use client';
import type { Metadata } from "next";
import "./globals.css";
import Container from "@mui/material/Container"
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

  const theme = pathname.startsWith('/kategoria/slovensko') ? slovakiaTheme : pathname.startsWith('/kategoria/svet') ? worldTheme : pathname.startsWith('/kategoria/politika-a-ekonomika') ? economicsTheme : pathname.startsWith('/kategoria/technologie-a-veda') ? techTheme : pathname.startsWith('/kategoria/sport') ? sportTheme : pathname.startsWith('/kategoria/kultura-a-zabava') ? cultureTheme : pathname.startsWith('/kategoria/miestne-spravy') ? localTheme : defaultTheme;
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
