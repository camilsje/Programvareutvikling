import React, { useState, useEffect } from 'react';
import { getFirestore,collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import "../Style/GridComponent.css";
import {getAuth} from "firebase/auth"
import MovieGridForProfile from './MovieGridForProfile';

const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;

function MovieProfile() {
  const [movies, setMovies] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);

  useEffect(() => {
    async function fetchMovies() {
      
      let userId=[];
      if (user!=null) {
        userId= [user.uid];
      
      }
      else{
        userId = ["e"];
      
      }
      const q = query(collection(db, "Reviews"), where("userID", "in", userId));
      const querySnapshot = await getDocs(q);
      const movieIDs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          movieID: data.movieID,
          rating: data.rating,
          comment: data.comment
        };
      });


      console.log(movieIDs);
      const movies = [];
      for (const movieID of movieIDs) {
        const movieDocRef = doc(db, 'Movie', movieID.movieID);
        const movieDocSnapshot = await getDoc(movieDocRef);
        
        if (movieDocSnapshot.exists()) {
          const movieData = movieDocSnapshot.data();
          movies.push({ 
            id: doc.id,
            rating: movieID.rating,
            comment: movieID.comment,
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

  return ( <MovieGridForProfile movies={movies}/>);
}

export default MovieProfile;