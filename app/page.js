import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateContent = async (type) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/generate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes, type }),
      });
    } catch (error) {
      console.error("Failed to generate content:", error);
    }
    setLoading(false);
  };

  const renderResult = () => {
    if (!result) return null;

    switch (result.type) {
      case "flashcards":
        return (
          <Grid container spacing={2}>
            {result.data.flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Front:</Typography>
                    <Typography>{flashcard.front}</Typography>
                    <hr />
                    <Typography variant="h6">Back:</Typography>
                    <Typography>{flashcard.back}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case "test":
        return (
          <Box>
            {result.data.questions.map((question, index) => (
              <Card sx={{ mb: 2 }} key={index}>
                <CardContent>
                  <Typography variant="h6">{`Question ${index + 1}: ${
                    question.question
                  }`}</Typography>
                  {question.options && (
                    <ul>
                      {question.options.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  )}
                  <Typography>
                    <strong>Answer:</strong> {question.answer}
                  </Typography>
                  <Typography>
                    <strong>Hint:</strong> {question.hint}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case "guide":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5">Study Guide</Typography>
              <Typography>{result.data.guide}</Typography>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };
  return(
    <Container maxWidth="100vh">
      <Head>
        <title>Flashcard</title>
        <meta name="description" content="Create flashcard from your test" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Flashcard
          </Typography>
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard
        </Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to make flashcards for your test
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started!
        </Button>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Notes
        </Typography>
        <TextField label="Paste your notes here..."
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}/>
        <Box>
          <Button>Generating Flashcards</Button>
          <Button>Generate Test</Button>
          <Button>Generate Study Guide</Button>
        </Box>
      </Box>

      {loading && (
        <Box>
          <CircularProgress/>
        </Box>
      )}

      {result &&(
        <Box>
          <Typography>
            Generated Content
          </Typography>
          {renderResult()}
        </Box>
      )}
    </Container>
  );
}
