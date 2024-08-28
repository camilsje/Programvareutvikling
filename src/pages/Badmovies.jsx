import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, Timestamp, doc, getDoc } from 'firebase/firestore';
import MovieGrid from '../Components/MovieGrid'; 
import NavBar from '../Components/NavBar.jsx';


const BadMovies = () => {
  const db = getFirestore();
  const [badMovies, setBadMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadMovies = async () => {
      try {
        
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastWeekTimestamp = Timestamp.fromDate(lastWeek);

      
        const reviewsQuery = query(collection(db, "Reviews"), where("timestamp", ">", lastWeekTimestamp));
        const reviewsSnapshot = await getDocs(reviewsQuery);

        
        const movieRatings = {};
        const reviewCounts = {};

        reviewsSnapshot.forEach(doc => {
          const movieID = doc.data().movieID;
          const rating = parseFloat(doc.data().rating);

          
          if (movieRatings[movieID]) {
            movieRatings[movieID] += rating;
            reviewCounts[movieID]++;
          } else {
            movieRatings[movieID] = rating;
            reviewCounts[movieID] = 1;
          }
        });

        
        const averageRatings = {};
        Object.keys(movieRatings).forEach(movieID => {
          averageRatings[movieID] = movieRatings[movieID] / reviewCounts[movieID];
        });

        
        const badMovieIDs = Object.keys(averageRatings).filter(movieID => averageRatings[movieID] <= 5);

        
        const badMovies = [];
        for (const movieID of badMovieIDs) {
          const movieDocRef = doc(db, 'Movie', movieID);
          const movieDocSnapshot = await getDoc(movieDocRef);

          if (movieDocSnapshot.exists()) {
            const movieData = movieDocSnapshot.data();
            const movie = {
              id: movieID,
              title: movieData.tittel,
              year: movieData.utgivelsesår,
              bilde: movieData.bilde,
              sjanger: movieData.sjanger,
              
            };
            badMovies.push(movie);
          }
        }

        
        setBadMovies(badMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bad movies:", error);
        setLoading(false);
      }
    };

    fetchBadMovies();
  }, [db]);

  return (
    <div>
      <NavBar/>
      <h1 className="movies-logo">Dårlige filmer siste uke</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MovieGrid movies={badMovies} />
      )}
    </div>
  );
}

export default BadMovies;
