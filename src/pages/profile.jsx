import NavBar from "../Components/NavBar";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import * as React from 'react';
import Tabs from "../Components/tabs"

export default function Profile() {
  const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
  return (
    <body>
       <NavBar/>
       
      <Tabs/>
          </body>

  )
}

