import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import MovieGridForProfile from './MovieGridForProfile';

const db = getFirestore();

function MovieRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchRecommendations() {
      if (user === null) return;

      // Henter brukerens likte filmer
      const userQuery = query(collection(db, "users"), where("email", "==", user.email));
      const userSnapshot = await getDocs(userQuery);
      const userFavorites = userSnapshot.docs.flatMap(doc => doc.data().favourite || []);
      const userSeen = userSnapshot.docs.flatMap(doc => doc.data().movies_watched || []);

      const movieRefs = userFavorites.map(fav => doc(db, 'Movie', fav));
      const moviePromises = movieRefs.map(ref => getDoc(ref));
      const movieSnapshots = await Promise.all(moviePromises);
      const likedMovies = movieSnapshots.map(snap => snap.data()).filter(Boolean);

      // Bestemmer favorittregissører og -sjangre
      const directors = [...new Set(likedMovies.map(movie => movie.regissør))];
      const genreCounts = likedMovies.flatMap(movie => movie.sjanger || []).reduce((count, genre) => {
        if (genre !== 'Drama') { // Ekskluderer 'Drama'
          count[genre] = (count[genre] || 0) + 1;
        }
        return count;
      }, {});

      const genresLiked = Object.entries(genreCounts).filter(([_, count]) => count > 1).map(([genre, _]) => genre);

      // Anbefaler nye filmer basert på likte regissører og sjangre
      const allMoviesQuery = query(collection(db, 'Movie'));
      const allMoviesSnapshot = await getDocs(allMoviesQuery);
      const allMovies = allMoviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const recommended = allMovies.filter(movie =>
        (directors.includes(movie.regissør) || genresLiked.some(genre => movie.sjanger?.includes(genre)))
        && !userFavorites.includes(movie.id) && !userSeen.includes(movie.id)// Fjerner filmer brukeren allerede har likt eller sett
      );

      setRecommendations(recommended);
    }

    fetchRecommendations();
  }, [user]);

  return (
    <MovieGridForProfile movies={recommendations.map(movie => ({
      id: doc.id,
        title: movie.tittel,
        year: movie.utgivelsesår,
        bilde: movie.bilde,
        sjanger: movie.sjanger, 
        trailer: movie.trailer,
        beskrivelse: movie.beskrivelse,
        regissor: movie.regissør,
        skuespillere: movie.skuespillere
    }))}/>
  );
}

export default MovieRecommendations;
