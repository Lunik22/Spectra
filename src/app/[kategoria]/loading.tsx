import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress color="primary" />
    </div>
  );
}