import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function loading() {
  return (
    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress color="primary" />
    </Stack>
  );
}