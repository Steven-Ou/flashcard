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
      <Typography variant= "h2">
        Welcome to Flashcard 
      </Typography>
      <Typography variant="h5">
        {' '}
        The easiest way to make flashcards from your text
      </Typography>
      <Button variant="contained" color="primary" sx={{mt:2}}>
        Get Started
      </Button>
    </Box>
    <Box sx={{my:6}}>
      <Typography variant="h4" component={"h2"}>
        Feature
      </Typography>
      <Grid contained spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6"> 
            Easy Text Input
          </Typography>
        </Grid>
      </Grid>
    </Box>
   </Container>
  )
}
