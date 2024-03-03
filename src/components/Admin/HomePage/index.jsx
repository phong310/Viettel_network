import React from 'react'
import { Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
      <Box sx={{ ...styleBoxContaier }}>
    </Box>
  )
}

const styleBoxContaier = {
  backgroundImage: 'url("https://uet.vnu.edu.vn/wp-content/uploads/2022/03/z3247701162175_2de9f1942525ada2e2ce51ca8d1e2511.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '92vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
};