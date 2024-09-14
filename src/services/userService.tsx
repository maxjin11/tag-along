import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBoTyNqEqAIQWAru1Rt-dQ3bW0WX3yr0xM",
  authDomain: "tag-along-a0f5f.firebaseapp.com",
  projectId: "tag-along-a0f5f",
  storageBucket: "tag-along-a0f5f.appspot.com",
  messagingSenderId: "984211526045",
  appId: "1:984211526045:web:5d7df699c5fcd49baa9f74",
  measurementId: "G-SHT8K87R49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function createUser(name: string, pfp: string, bio?: string){
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      pfp: pfp,
      bio: bio,
      activities: [],
      friends: []
    }); 
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
  