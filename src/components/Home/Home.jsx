import { Box, Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Home({ sectionIds }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 600) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {sectionIds.map((item, index) => (
        <Grid id={item.target} key={index}>
          {item.component}
        </Grid>
      ))}
      {showBackToTop && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <IconButton onClick={scrollToTop} aria-label="back to top" sx={{ color: 'black', width: '48px', height: '48px' }}>
            <KeyboardArrowUpIcon sx={{ width: '38px', height: '38px' }} />
          </IconButton>
        </Box>
      )}
    </>
  );
}
