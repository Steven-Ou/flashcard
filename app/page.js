import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
   <Container maxWidth="100vh">
    <Head>
      <title> Flashcard </title>
      <meta name="description" content="Create flashcard from your test" />
    </Head>

    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow:1}}> 
          Flashcard
        </Typography>
        <SignedOut>
            <Button color="inherit"> Login </Button>
            <Button color="inherit"> Sign Up </Button>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        
      </Toolbar>
    </AppBar>

    <Box sx={{textAlign:'center', my:4}}>
      <Typography variant= "h2" gutterBottom>
        Welcome to Flashcard 
      </Typography>
      <Typography variant="h5" gutterBottom>
        {' '}
        The easiest way to make flashcards from your text
      </Typography>
      <Button variant="contained" color="primary" sx={{mt:2}}>
        Get Started
      </Button>
    </Box>
    <Box sx={{my:6}}>
      <Typography variant="h4" gutterBottom >
        Feature
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom> 
            Easy Text Input
          </Typography>
          <Typography>
            {' '}
            Simply input your test and let our software do the rest. 
            Creating flashcards has never been easier.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom> 
            Smart Flashcards
          </Typography>
          <Typography>
            {' '}
            Our AI intelligently breaks down your text into concise
            flashcard, perfect for studying.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom> 
            Accessible Anywhere
          </Typography>
          <Typography>
            {' '}
            Access your flashcard from any device, at any time. 
            Study on the go with ease.
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{my:6, textAlign:'center'}}>
    <Typography variant="h4" >
        Pricing
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
         <Box sx={{
          p:3,
          border:'1px solid',
          borderColor:'grey.300', 
          borderRadius:2, 
          }}>
          <Typography variant="h5" gutterBottom> 
            Basic
          </Typography>
          <Typography variant="h6" gutterBottom>
            {' '}
            $5 / month
          </Typography>
          <Typography>
            {' '}
            Access to basic flashcard features and limited storage. 
          </Typography>
          <Button variant="contained" color="primary" sx={{mt:2}}>
            Choose basic
          </Button>
         </Box>
        </Grid>
        <Box sx={{
          p:3,
          border:'1px solid',
          borderColor:'grey.300', 
          borderRadius:2, 
          }}>
          <Typography variant="h5" gutterBottom> 
            Pro
          </Typography>
          <Typography variant="h6" gutterBottom>
            {' '}
            $10 / month
          </Typography>
          <Button variant="contained" color="primary" sx={{mt:2}}>
            Choose basic
          </Button>
        </Box>
      </Grid>
    </Box>
   </Container>
  )
}
