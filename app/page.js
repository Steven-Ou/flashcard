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
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Audio recording hook
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const handleTranscribe = async () => {
    if (!mediaBlobUrl) return;
    setLoading(true);

    const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setNotes((prevNotes) => prevNotes + " " + data.text);
      } else {
        throw new Error(data.error || "Transcription failed");
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
    setLoading(false);
  };

  const generateContent = async (type) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes, type }),
      });
      const data = await response.json();
      setResult({ type, data });
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {result.data.flashcards.map((flashcard, index) => (
              <Card key={index} className="shadow-md">
                <CardContent>
                  <Typography variant="h6" className="font-bold">
                    Front:
                  </Typography>
                  <Typography>{flashcard.front}</Typography>
                  <hr className="my-2" />
                  <Typography variant="h6" className="font-bold">
                    Back:
                  </Typography>
                  <Typography>{flashcard.back}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "test":
        return (
          <div className="space-y-4">
            {result.data.questions.map((question, index) => (
              <Card key={index} className="shadow-md">
                <CardContent>
                  <Typography variant="h6">{`Question ${index + 1}: ${
                    question.question
                  }`}</Typography>
                  {question.options && (
                    <ul className="list-disc list-inside ml-4">
                      {question.options.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-2">
                    <strong>Answer:</strong> {question.answer}
                  </p>
                  <p>
                    <strong>Hint:</strong> {question.hint}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "guide":
        return (
          <Card className="shadow-md">
            <CardContent>
              <Typography variant="h5" className="font-bold mb-2">
                Study Guide
              </Typography>
              <Typography className="whitespace-pre-wrap">
                {result.data.guide}
              </Typography>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Flashcard AI</title>
        <meta
          name="description"
          content="Generate study materials from your notes"
        />
      </Head>

      <AppBar position="static" className="bg-white text-black shadow-md">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" className="font-bold">
            Flashcard AI
          </Typography>
          <div>
            <SignedOut>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="py-8">
        <Box className="text-center my-8">
          <Typography variant="h2" className="font-bold mb-2">
            AI-Powered Study Tools
          </Typography>
          <Typography variant="h5" className="text-gray-600">
            Turn your notes and voice recordings into study materials instantly
          </Typography>
        </Box>

        <Card className="shadow-lg mb-8">
          <CardContent className="p-6">
            <Typography variant="h4" className="mb-4">
              Your Notes
            </Typography>
            <TextField
              label="Paste your notes here, or record your voice below..."
              multiline
              rows={10}
              fullWidth
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button
                variant="contained"
                onClick={
                  status === "recording" ? stopRecording : startRecording
                }
                className={
                  status === "recording"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }
              >
                {status === "recording" ? "Stop Recording" : "Start Recording"}
              </Button>
              <Button
                variant="contained"
                onClick={handleTranscribe}
                disabled={!mediaBlobUrl || status === "recording"}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Transcribe Recording
              </Button>
            </div>
            <p className="text-center mt-2 text-gray-600">
              Recording Status: {status}
            </p>
          </CardContent>
        </Card>

        <Box className="text-center my-8">
          <Typography variant="h4" className="mb-4">
            Generate Study Materials
          </Typography>
          <Box className="flex justify-center gap-4 mt-4">
            <Button
              variant="contained"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => generateContent("flashcards")}
            >
              Generate Flashcards
            </Button>
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => generateContent("test")}
            >
              Generate Test
            </Button>
            <Button
              variant="contained"
              className="bg-purple-500 hover:bg-purple-600"
              onClick={() => generateContent("guide")}
            >
              Generate Study Guide
            </Button>
          </Box>
        </Box>

        {loading && (
          <Box className="flex justify-center my-8">
            <CircularProgress />
          </Box>
        )}

        {result && (
          <Box className="my-8">
            <Typography variant="h4" className="text-center mb-4 font-bold">
              Your Generated Content
            </Typography>
            {renderResult()}
          </Box>
        )}
      </Container>
    </div>
  );
}
