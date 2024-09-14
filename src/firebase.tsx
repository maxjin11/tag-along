// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import env from "react-dotenv";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: 'tag-along-a0f5f.firebaseapp.com',
  projectId: 'tag-along-a0f5f',
  storageBucket: 'tag-along-a0f5f.appspot.com',
  messagingSenderId: '984211526045',
  appId: '1:984211526045:web:5d7df699c5fcd49baa9f74',
  measurementId: 'G-SHT8K87R49',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances of Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); 

export default app;