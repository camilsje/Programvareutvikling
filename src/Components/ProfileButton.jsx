import '../Style/ProfileButton.css';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
        });
        return () => unsubscribe(); 
    }, []);

    return (
        <div className='button-container'>
            {user !== null && (
                <button className="button"> 
                    <img src={user.photoURL} alt="Profile"></img>
                </button>
            )}
        </div>
    );
    }

export default Profile;