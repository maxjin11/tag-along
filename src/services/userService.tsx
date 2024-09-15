import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export async function createUser(name: string, pfp: string, bio?: string){ 

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      pfp: pfp,
      bio: bio ?? null,
      activities: [],
      friends: []
    }); 
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function createUserWithId(id: string, name: string, pfp: string, bio?: string){ 

  const docRef = doc(db, "users", id);
  const userData = {
    id:id,
    name: name,
    pfp: pfp,
    bio: bio ?? null,
    activities: [],
    friends: [],
  };
  try {
    await setDoc(docRef, userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserById(id: string) {
    // Create a reference to the document
    const docRef = doc(db, "users", id);
  
    try {
      // Fetch the document
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Document data
        console.log("Document data:", docSnap.data());
        return docSnap.data()
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }

export async function friendById(id1: string, id2: string) {
  const docRef1 = doc(db, "users", id1);
  const docRef2 = doc(db, "users", id2);

  try {
    await updateDoc(docRef1, {friends: arrayUnion(id2)});
    await updateDoc(docRef2, {friends: arrayUnion(id1)});
  } catch (error) {
    console.error("Error adding friend", error);
  }
}