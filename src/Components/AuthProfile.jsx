import React, { useState, useEffect } from "react";
import {addDoc, collection, where, getDocs, query} from "@firebase/firestore"
import { signInWithRedirect, getRedirectResult} from "firebase/auth";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firestore } from "../firebase";
import { Link } from 'react-router-dom'; 

const provider = new GoogleAuthProvider;
const auth = getAuth();



// Make sure to check if auth.currentUser is not null before accessing its properties


getRedirectResult(auth)
.then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const pic = auth.currentUser ? auth.currentUser.photoURL : null;
    
    // Remove the reference to the profile picture element
    // var profileEl = document.getElementById("picture");
    var loginButtonEl = document.getElementById("log");
    
    const user = result.user;
    console.log(user);
    
    addUser(user);
    console.log(pic)
    // Remove the assignment of the profile picture source
    // profileEl.src = pic;
    loginButtonEl.innerHTML = "Sign out";
}).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const credential = GoogleAuthProvider.credentialFromError(error);
});

export const addUser = async (user) => {
    const auth = getAuth();
    const userRef = collection(firestore, "users");
    
    try {
        // Get the currently signed-in user
        const currentUser = auth.currentUser;
        
        const userQuery = query(userRef, where("uid", "==", currentUser.uid));
        const userSnapshot = await getDocs(userQuery);
        
        
        // Check if the user is signed in before adding to Firestore
        if (currentUser) {
            
            console.log(currentUser.displayName + "is signed in");
            
            if (!userSnapshot.empty) {
                // User already exists
                console.log("User allready added to DB");
                
            } else{
                
                // Add user data to Firestore
                await addDoc(userRef, {
                    creationTime: auth.currentUser.metadata.creationTime,
                    lastSignInTime: auth.currentUser.metadata.lastSignInTime,
                    
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    
                    movies_watched: [],
                    favourite: []
                    
                    // ...user // You can add additional user data here
                });
                
                console.log("User regisered to firebase");
            }
            
            // loginButtonEl.innerHTML = "Sign out"
            
            
        } else {
            console.log("No user is signed in.");
        }
    } catch (error) {
        console.error("Error adding user: ", error);
    }
};

const SignIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Use the useEffect hook to set up an event listener for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);
    // Define a function to handle sign in/sign out

    const handleSignIn = () => {
        // Sign in if the user is not logged in
        if (!isLoggedIn) {
            signInWithRedirect(auth, provider);
        } else {
            // Sign out if the user is logged in
            signOut(auth).then(() => {
                console.log("Successful sign out");
            }).catch((error) => {
                console.error("Sign out error:", error);
            });
        }
    };
    // Render a button that toggles between "Sign In" and "Sign Out" based on isLoggedIn state
    return (
        
        <div className="profile">
             <Link to="/frontpage">
                <button className= 'log' id="login" onClick={handleSignIn}>
                    <h3>{isLoggedIn ? "Logg ut" : "Logg inn"}</h3>
                </button>
            </Link>
        </div>
    );
};

export default SignIn;

