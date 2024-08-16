'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Typography, Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Head from "next/head";

// Main Home Component
export default function Home() {

  const handleSubmit = async()=>{
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const{error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }
  }

  return (
    // Container for the entire page layout
    <Container maxWidth="100vw">
      {/* Head section for meta tags and page title */}
      <Head>
        <title> Flashcard SaaS </title>
        <meta name="description" content="Create Flashcard from your text" />
      </Head>

      {/* AppBar for the navigation header */}
      <AppBar position="static">
        <Toolbar>
          {/* Website title */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {" "}
            Flashcard SaaS{" "}
          </Typography>

          {/* Buttons for login and signup when the user is signed out */}
          <SignedOut>
            <Button color="inherit" href="/signIn">
              {" "}
              Log In{" "}
            </Button>
            <Button color="inherit" href="/signUp">
              {" "}
              Sign Up{" "}
            </Button>
          </SignedOut>

          {/* User profile button when signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Welcome section */}
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to make flashcards from your text
        </Typography>
        {/* Get Started button */}
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>

      {/* Features section */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1: Easy Text Input */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {" "}
              Easy Text Input
            </Typography>
            <Typography>
              Simply input your text and let our software do the rest. Creating
              flashcards has never been easier.
            </Typography>
          </Grid>

          {/* Feature 2: Smart Flashcards */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {" "}
              Smart Flashcards{" "}
            </Typography>
            <Typography>
              Our AI intelligently breaks down your text into concise flashcards
              perfect for studying.
            </Typography>
          </Grid>

          {/* Feature 3: Accessible Anywhere */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {" "}
              Accessible Anywhere
            </Typography>
            <Typography>
              Access your flashcards from any device, at any time. Study on the
              go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>

        <Grid container spacing={4}>
          {/* Pricing Plan: Basic */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "3px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / Month
              </Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              {/* Button to choose the Basic plan */}
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>

          {/* Pricing Plan: Pro */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "3px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / Month
              </Typography>
              <Typography>
                Unlimited flashcards and storage with priority support.
              </Typography>
              {/* Button to choose the Pro plan */}
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
