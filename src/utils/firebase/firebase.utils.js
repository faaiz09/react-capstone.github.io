import { initializeApp } from 'firebase/app' ;
import { 
    getAuth,
    SignInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBlmawTqBeagmyNyG9S196wabQCorhPUZQ",
    authDomain: "ae-db-786.firebaseapp.com",
    projectId: "ae-db-786",
    storageBucket: "ae-db-786.appspot.com",
    messagingSenderId: "837850305491",
    appId: "1:837850305491:web:ca7bc1748d408e11af1526"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
};