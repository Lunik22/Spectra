'use client';
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { defaultTheme, slovakiaTheme, worldTheme, economicsTheme, techTheme, sportTheme, cultureTheme, localTheme } from './theme';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { UserProvider } from '@/context/userContext';

const montserrat = Montserrat({ subsets: ['latin-ext'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const theme = pathname.startsWith('/kategoria/slovensko') || pathname.startsWith('/tema/slovensko') ? slovakiaTheme : pathname.startsWith('/kategoria/svet') || pathname.startsWith('/tema/svet') ? worldTheme : pathname.startsWith('/kategoria/ekonomika') || pathname.startsWith('/tema/ekonomika')  ? economicsTheme : pathname.startsWith('/kategoria/technologie-a-veda') || pathname.startsWith('/tema/technologie-a-veda') ? techTheme : pathname.startsWith('/kategoria/sport') || pathname.startsWith('/tema/sport')? sportTheme : pathname.startsWith('/kategoria/kultura-a-zabava') || pathname.startsWith('/tema/kultura-a-zabava') ? cultureTheme : pathname.startsWith('/kategoria/zivotny-styl') || pathname.startsWith('/tema/zivotny-styl') ? localTheme : defaultTheme;
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
