import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../Style/GridComponent.css";
import { Link } from 'react-router-dom';

const db = getFirestore();
const auth = getAuth();

function MovieGridForProfile({ movies }) {
  const [user, setUser] = useState(null);
  const [seenMovies, setSeenMovies] = useState(new Set());
  const [likedMovies, setLikedMovies] = useState(new Set());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user != null) {
        let bruker = await getDocs(query(collection(db, "users"), where("uid", "==", user.uid)));
        let brukerData = bruker.docs[0].data();
        setSeenMovies(new Set(brukerData.movies_watched));
        setLikedMovies(new Set(brukerData.favourite));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid">
      {movies.map((movie, index) => (
        <div key={index} className="grid-item">
          <Link to= "/movie-page" state={{ movie: movie }}>
            <img src={movie.bilde} alt={movie.title} className="movie-image"/>
          </Link>
          <div className="movie-actions"></div>
          <div className="movie-info">
            <em>{movie.title}</em>({movie.year})
            <br />
            {movie.rating !== undefined ? (
              <em>Din vurdering: {movie.rating}/10
              <br />
              Kommentar: {movie.comment}
              </em>
              
            ) : (
              <em></em>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieGridForProfile;

