import { Box, CircularProgress, Fade } from '@mui/material';

export default function Loading() {
  return (
    <Fade in={true} timeout={500}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <CircularProgress />
      </Box>
    </Fade>
  );
}
