import { initializeApp } from 'firebase/app' ;
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
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

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect  = () => 
    signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {Name: ''} 
) => {
    if (!userAuth) return ;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { Name, Email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                Name,
                Email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
    };