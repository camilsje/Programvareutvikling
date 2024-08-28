import React, { useState, useEffect } from 'react';
import { updateDoc, doc, addDoc } from 'firebase/firestore';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../Style/GridComponent.css";
import heart from "../img/heart-svgrepo-com.svg";
import star from "../img/star-sharp-svgrepo-com.svg";
import check from "../img/check-circle-svgrepo-com.svg";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const db = getFirestore();
const auth = getAuth();


function MovieGrid({ movies }) {
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

  const updateFirestore = async () => {
    if (user === null) {
      return
    }
    const userQuery = await getDocs(query(collection(db, "users"), where("uid", "==", user.uid)));
    const userDoc = userQuery.docs[0];
    const userRef = doc(db, "users", userDoc.id);
    try {
      await updateDoc(userRef, {
        movies_watched: Array.from(seenMovies),
        favourite: Array.from(likedMovies)
      });
      console.log("Firestore document updated successfully.");
    } catch (error) {
      console.error("Error updating Firestore document:", error);
    }
  };

  function addToSeenMovies (movieID) {
    if (seenMovies.has(movieID)) {
      seenMovies.delete(movieID);
    } else {
      seenMovies.add(movieID);
    }
    setSeenMovies(new Set(seenMovies));
    updateFirestore();
  };

  function addToLikedMovies(movieID) {
    if (likedMovies.has(movieID)) {
      likedMovies.delete(movieID);
    } else {
      likedMovies.add(movieID);
    }
    setLikedMovies(new Set(likedMovies));
    updateFirestore();
  }

  const addReview = (movieID) => {
    let reviewNumber, reviewText;

    Swal.fire({
      title: 'Write a Review',
      html: `
        <input type="number" id="reviewNumber" class="swal2-input" placeholder="0-10" min="0" max="10"/>
        <textarea id="reviewText" class="swal2-textarea" placeholder="Your review"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Retrieve values from the input fields
        reviewNumber = document.getElementById('reviewNumber').value;
        reviewText = document.getElementById('reviewText').value;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const timestamp = new Date()
        
        // Add review to Firestore
        // number, text, movieID, user.uid, timestamp
        const q = (query(collection(db, "Reviews"), where("movieID", "==", movieID), where("userID", "==", user.uid)));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          const dataToAdd = {
            rating: reviewNumber,
            comment: reviewText,
            movieID: movieID,
            userID: user.uid,
            timestamp: timestamp
          }
          await addDoc(collection(db, "Reviews"), dataToAdd);
          Swal.fire('Review submitted successfully!', '', 'success');
        } else {
          const userRef = doc(db, "Reviews", querySnapshot.docs[0].id);
          await updateDoc(userRef, {
            rating: reviewNumber,
            comment: reviewText,
            timestamp: timestamp
          });
          Swal.fire('Review updated successfully!', '', 'success');
        }
      }
    });
  };

  return (
    <div className="grid">
      {movies.map((movie, index) => (
        <div key={index} className="grid-item">
          <Link to="/movie-page" state={{ movie: movie }}>
            <img src={movie.bilde} alt={movie.title} className="movie-image"/>
          </Link>
          {user && (
            <div className="movie-actions">
              <img
                src={heart}
                alt="heart"
                className={`like ${likedMovies.has(movie.id) ? 'red' : ''}`}
                onClick={() => addToLikedMovies(movie.id)}
              />
              <img
                src={check}
                alt="check mark"
                className={`seen ${seenMovies.has(movie.id) ? 'green' : ''}`}
                onClick={() => addToSeenMovies(movie.id)}
              />
              <img src={star} alt="star" className="review" onClick={() => addReview(movie.id)} />
            </div>
          )}
          <div className="movie-info">
            <em>{movie.title}</em>({movie.year})
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;

