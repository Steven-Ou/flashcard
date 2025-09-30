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
    <Container>
      
    </Container>
  );
}
