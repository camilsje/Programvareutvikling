
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs} from 'firebase/firestore';


import "../Style/Movie.css";
import NavBar from '../Components/NavBar.jsx';

const Movie = () => {

const location = useLocation();
const selectedMovie = location.state.movie;
const selectedID = selectedMovie.id;


// State to hold genre data
const [genres, setGenres] = useState([]);
const [skuespillere, setSkuespiller] = useState([]);

const [reviews, setReviews] = useState({
  movieComments: [],
  movieRatings: [],
  userIDs: [],
  reviewCount: 0
})

const ratingSum = 0;

// Effect to populate genres when selectedMovie changes
useEffect(() => {

  const db = getFirestore();
  

    if (selectedMovie && selectedMovie.sjanger && selectedMovie.skuespillere) {
      setGenres(selectedMovie.sjanger);
      setSkuespiller(selectedMovie.skuespillere);
    }

  const fetchReviews = async () => {
    try {
      const reviewsSnapshot = await getDocs(collection(db, "Reviews"));

              reviewsSnapshot.forEach(doc => {
                const movieID = doc.data().movieID;
                const user = doc.data().userID;
                const rating = parseFloat(doc.data().rating);
  
                if (movieID == selectedID) {
                    
                  setReviews(prevReviews => ({
                    movieComments: [...prevReviews.movieComments, doc.data().comment],
                    movieRatings: [...prevReviews.movieRatings, rating],
                    userIDs: [...prevReviews.userIDs, user],
                    reviewCount: reviews.reviewCount++
                  }));
                }
              });
  
          
    
            

            for (const rating in reviews.movieRatings) {
              ratingSum += rating;
            }

            console.log(reviews);

          } catch (error) {
            console.error("Error fetching bad movies:", error);
          }
        };

        if (selectedMovie && selectedID) {
          fetchReviews();
        }

        
                  
}, [selectedMovie]);



    return (
      <div id="movie_container">
      <NavBar/>

      <div id='movie_preheader'>
        <h1>{selectedMovie.title}</h1>

        </div>

      <div id='moive-subcontainer'>
        

        <div id='popup_header'>
            <div id='genreTags'>
              {genres.map((genre, index) => (
                <div key={index}>{genre}</div>
              ))}
            </div>
      
        </div>

        <div id='trailer'>
            <iframe src= {selectedMovie.trailer} title="YouTube video player" autoPlay="autoplay" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
          
        <div id='poster_info'>
    
          <div id='poster'><img width={325} height={500}  src= {selectedMovie.bilde} alt='' /></div>
            <div id='info'> 


            <div id='movieAttributs'>
              <h3>Utgivelses år: {selectedMovie.year}</h3>
              <h3>Regissør år: {selectedMovie.regissor}</h3>
              <h3>Skuespillere: {skuespillere.map((skuespiller, index) => (
                 <span key={index}>
                 <h3 style={{display : 'inline'}}>{skuespiller}</h3>
                 {index !== skuespillere.length - 1 && <span>, </span>}
               </span>
              ))}
              </h3>
            </div>

            
              
          <p id="movieparagraph">{selectedMovie.beskrivelse}</p>

          </div>

          </div>
   
          <div id='reviews'>
          
          </div>
              

        </div>
        </div>
    );
}
  
export default Movie;