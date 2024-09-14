import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import env from "react-dotenv";
import { db } from "../firebase";

export async function createActivity(time: string, location: string, title: string, userId: string, bio?: string){
  try {
    const docRef = await addDoc(collection(db, "activities"), {
      time: time,
      location: location,
      title: title,
      user: userId,
      bio: bio
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getActivityById(id: string) {
    // Create a reference to the document
    const docRef = doc(db, "activities", id);
  
    try {
      // Fetch the document
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Document data
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }

export async function deleteActivity(id: string) {
  await deleteDoc(doc(db, "activities", id));
}