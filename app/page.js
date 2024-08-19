import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
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
        <Typography variant="h6" style={{flexGrow:1}}> 
          Flashcard
          <SignedOut>
            <Button color="inherit"> Login </Button>
            <Button color="inherit"> Sign Up </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Typography>
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

      </Button>
    </Box>
   </Container>
  )
}
