"use client"


import { useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"


import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation"
import { Container } from "@mui/system";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";


export default function Flashcards() {
   const router = useRouter();
   const { isLoaded, isSignedIn, user } = useUser();
   const [flashcards, setFlashcards] = useState([]);


   useEffect(() => {
     
       async function getFlashCards() {
           if (!user) return
           const docRef = doc(collection(db, "users"), user.id);
           const docSnap = await getDoc(docRef);
           if (docSnap.exists()) {
               setFlashcards(docSnap.data().flashcards || [])
           } else {
               await setDoc(docRef, {flashcards: []})
           }
       }


       getFlashCards()


   }, [user]);


   if (!isLoaded || !isSignedIn) {
       return <></>
   }


   const handleCardClick = (id) => {
       router.push(`/flashcard?id=${id}`)
   }


   return (
       <Container
       maxWidth="100vw"


       >
           <Grid container spacing= {3} sx={{mt: 4}}>
               {
                   flashcards.map((flashcard, index) => (
                       <Grid
                       item
                       xs={12}
                       md={4}
                       key={index}
                       >
                           <Card>
                               <CardActionArea
                               onClick={() => handleCardClick(flashcard.id)}
                               >
                                   <CardContent>
                                       <Typography variant="h6">
                                           {flashcard.name}
                                       </Typography>
                                   </CardContent>
                               </CardActionArea>
                           </Card>
                       </Grid>
                   ))
               }
           </Grid>
       </Container>
   )
}
