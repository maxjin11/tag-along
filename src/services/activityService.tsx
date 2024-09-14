import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {activities: arrayUnion(docRef.id)})
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
  try {
    const docRef = doc(db, "activities", id);
    const activity = await getDoc(docRef);
    if (activity.exists()) {
      const userId = activity.data().user;
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {activities: arrayRemove(userRef.id)})
      await deleteDoc(docRef);
    } else {
      console.log("No activity exists");
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  } 
}