import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
   <Container maxWidth="lg">
    <Head>
      <title> Flashcard </title>
      <meta name="description" content="Create flashcard from your test" />
    </Head>

    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6"> 
          Flashcard
          <SignedOut>
            <Button> Login </Button>
            <Button> Sign Up </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Typography>
      </Toolbar>
    </AppBar>
   </Container>
  )
}
