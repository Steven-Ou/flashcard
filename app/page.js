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

    switch (result.type){
      case 'flashcards':
        return(
          <Grid container spacing ={2}>
            
          </Grid>
        )
    }
  };
  return <main></main>;
}
