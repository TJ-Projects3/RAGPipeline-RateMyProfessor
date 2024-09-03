'use client';
import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Height, Widgets } from '@mui/icons-material';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5', // Light grey background
  color: '#333', // Dark text color
}));

const LearnMore = () => {
  return (
    <Box
    sx={{
      backgroundImage: 'url("")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      overflow: "scroll",
    }}
    >
    <Container maxWidth="lg" sx={{ marginTop: 4}}>
      <Typography variant="h2" align="center" gutterBottom>
        Contact or connect with our founders
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" paragraph>
        Rate My Professor AI is a platform <em>created by students, for students</em>. Connect with us on LinkedIn and
        other platforms, we are happy to speak with you!! Thank you for supporting us and using Rate My Professor AI!
      </Typography>
      <Box sx={{width:1200, height:500, backgroundColor: '#8ABD91', borderRadius:80, display: 'flex'}} ml={'auto'} mr={'auto'}>
        <img src=""></img>
      </Box>
      <Box mt={4} textAlign="center">
        <Typography variant="h6" gutterBottom>
          Have Questions?
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Visit our FAQ section to find answers to common questions or contact our support team for more information.
        </Typography>
        <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
          Learn More
        </Button>
      </Box>
    </Container>
    </Box>
  );
};

export default LearnMore;
