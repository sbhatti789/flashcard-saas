"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { doc, collection, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Flashcard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashCard() {
      if (!search || !user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFlashcards(docSnap.data().flashcards || []);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }

    getFlashCard();
  }, [user]);

  return <></>
};

export default Flashcard;
