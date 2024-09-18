'use client';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';


declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      logoPath: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      logoPath?: string;
    };
  }

  interface PaletteColor {
    darker?: string;
  }
  
  interface SimplePaletteColorOptions {
    darker?: string;
  }
}
  
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#C61AFF',
      dark: '#630D80',
      light: '#DF80FF',
      darker: "#0A010D",
      contrastText: "#F9E5FF",
    },
    background:{
      default: "#0A010D",
      paper: "#0A010D",
    },
    text: {
      primary: "#F9E5FF",
      secondary: "#DF80FF",
    },
  },
  typography: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
      h1: {
        fontWeight: 900,
      },
      h2: {
        fontWeight: 700,
        fontSize: '1rem',
      },
      h3: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      body1: {
        fontWeight: 400,
      }
  },
  custom: {
    logoPath: '/imgs/main/SpectraLogoMain.svg',
  },
});

const slovakiaTheme = createTheme({
  palette: {
    primary: {
      main: "#2D1AFF",
      dark: "#160D80",
      light: "#8A80FF",
      darker: "#02010D",
      contrastText: "#E8E5FF",
    },
    background:{
      default: "#02010D",
      paper: "#02010D",
    },
    text: {
      primary: "#E8E5FF",
      secondary: "#8A80FF",
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    }
  },
  custom: {
    logoPath: '/imgs/slovensko/SpectraLogo-slovensko.svg',
  },
  
});

const worldTheme = createTheme({
  palette: {
    primary: {
      main: "#FF1A9F",
      dark: "#800D50",
      light: "#FF80CA",
      darker: "#0D0108",
      contrastText: "#FFE5F4",
    },
    background:{
        default: "#0D0108",
        paper: "#0D0108",
    },
    text: {
      primary: "#FFE5F4",
      secondary: "#FF80CA",
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    }
  },
  custom: {
    logoPath: '/imgs/svet/SpectraLogo-svet.svg',
  },
  
});

const economicsTheme = createTheme({
  palette: {
    primary: {
      main: "#1A9FFF",
      dark: "#0D5080",
      light: "#80CAFF",
      darker: "#01080D",
      contrastText: "#E5F4FF",
    },
    background:{
        default: "#01080D",
        paper: "#01080D",
    },
    text: {
      primary: "#E5F4FF",
      secondary: "#80CAFF",
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    }
  },
  custom: {
    logoPath: '/imgs/politika-a-ekonomika/SpectraLogo-politika-a-ekonomika.svg',
  },
  
});

const techTheme = createTheme({
  palette: {
    primary: {
      main: "#1AFFC6",
      dark: "#0D8063",
      light: "#80FFDF",
      darker: "#010D0A",
      contrastText: "#E5F4FF",
    },
    background:{
        default: "#010D0A",
        paper: "#010D0A",
    },
    text: {
      primary: "#E5F4FF",
      secondary: "#80FFDF",
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    }
  },
  custom: {
    logoPath: '/imgs/technologie-a-veda/SpectraLogo-technologie-a-veda.svg',
  },
  
});

const sportTheme = createTheme({
  palette: {
    primary: {
      main: "#1AFF2D",
      dark: "#0D8016",
      light: "#80FF8B",
      darker: "#010D0A",
      contrastText: "#E5FFE8",
    },
    background:{
        default: "#010D02",
        paper: "#010D02",
    },
    text: {
      primary: "#E5FFE8",
      secondary: "#80FF8B",
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    }
  },
  custom: {
    logoPath: '/imgs/sport/SpectraLogo-sport.svg',
  },
  
});

const cultureTheme = createTheme({
  palette: {
    primary: {
      main: "#FFC61A",
      dark: "#80630D",
      light: "#FFDF80",
      darker: "#0D0A01",
      contrastText: "#FFF9E5",
    },
    background:{
        default: "#0D0A01",
        paper: "#0D0A01",
    },
    text: {
      primary: "#FFF9E5",
      secondary: "#FFDF80",
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    }
  },
  custom: {
    logoPath: '/imgs/kultura-a-zabava/SpectraLogo-kultura-a-zabava.svg',
  },
  
});

const localTheme = createTheme({
  palette: {
    primary: {
      main: "#FF2D1A",
      dark: "#80160D",
      light: "#FF8B80",
      darker: "#0D0201",
      contrastText: "#FFE8E5",
    },
    background:{
        default: "#0D0201",
        paper: "#0D0201",
    },
    text: {
      primary: "#FFF9E5",
      secondary: "#FFE8E5",
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    }
  },
  custom: {
    logoPath: '/imgs/miestne-spravy/SpectraLogo-miestne-spravy.svg',
  },
  
});




export { defaultTheme, slovakiaTheme, worldTheme, economicsTheme, techTheme, sportTheme, cultureTheme, localTheme };