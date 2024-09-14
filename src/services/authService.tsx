import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createDocumentRegistry } from "typescript";
import { auth} from "../firebase";
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


export async function googleSignIn(): Promise<any>{
    return signInWithPopup(auth, provider).then((result) => {
        console.log("1")
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential != null) {
            console.log("2")
            const token = credential.accessToken;
            const user = result.user;  
            console.log("Credential found.")
            return {user, token}
        } else { 
            console.log("3")
            console.log("Credential not found.")    
            return {user: null, token: null}
        } 
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        console.log(error)
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {user: null, token: null}
    });
}

export async function googleSignOut() {
    signOut(auth).then(() => {
        console.log("Signed out.");
    }).catch((error) => {
        console.log("Could not be signed out.")
    });
}