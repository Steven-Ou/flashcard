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

  return <main></main>;
}
