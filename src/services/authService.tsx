import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createDocumentRegistry } from "typescript";
import env from "react-dotenv";

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: "fir-test-44f77.firebaseapp.com",
    projectId: "fir-test-44f77",
    storageBucket: "fir-test-44f77.appspot.com",
    messagingSenderId: "860583052714",
    appId: "1:860583052714:web:6d23c23cfb065ba8d997d3",
    measurementId: "G-QR1QLK1NWR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function googleSignIn() {
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential != null) {
            const token = credential.accessToken;
            console.log("Credential found.")
        } else {
            console.log("Credential not found.")    
        }
        
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export async function googleSignOut() {
    signOut(auth).then(() => {
        console.log("Signed out.");
    }).catch((error) => {
        console.log("Could not be signed out.")
    });
}