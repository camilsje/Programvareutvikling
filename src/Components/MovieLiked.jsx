import React, { useState, useEffect } from 'react';
import { getFirestore,collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import "../Style/GridComponent.css";
import {getAuth} from "firebase/auth"
import MovieGridForProfile from './MovieGridForProfile';

const db = getFirestore();

function MovieLiked() {
  const [movies, setMovies] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchMovies() {
      if (user==null) return; 
      const usMail = [user.email];
      const q = query(collection(db, "users"), where("email", "in", usMail));
      const querySnapshot = await getDocs(q);
      const movieIDs = querySnapshot.docs.flatMap(doc => doc.data().favourite);

      const movies = [];
      for (const movieID of movieIDs) {
        const movieDocRef = doc(db, 'Movie', movieID);
        const movieDocSnapshot = await getDoc(movieDocRef);
        
        if (movieDocSnapshot.exists()) {
          const movieData = movieDocSnapshot.data();
          movies.push({
            id: doc.id,
            title: movieData.tittel,
            year: movieData.utgivelsesår,
            bilde: movieData.bilde,
            sjanger: movieData.sjanger, 
            trailer: movieData.trailer,
            beskrivelse: movieData.beskrivelse,
            regissor: movieData.regissør,
            skuespillere: movieData.skuespillere 
          });
        }
      }
      
      setMovies(movies);
    }

    fetchMovies();
  }, []);

  return (<MovieGridForProfile movies={movies}/>);
}

export default MovieLiked;