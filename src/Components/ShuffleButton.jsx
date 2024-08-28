import React, { useState, useEffect } from 'react';
import { getFirestore,collection, getDocs } from 'firebase/firestore';
import shuffle from '../img/shuffle-svgrepo-com.svg';
import { useNavigate} from 'react-router-dom';

const db = getFirestore();

function ShuffleButton() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const querySnapshot = await getDocs(collection(db, "Movie"));
      const dataFilmer = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().tittel,
        year: doc.data().utgivelsesår,
        bilde: doc.data().bilde,
        sjanger: doc.data().sjanger, // Add sjanger property
        trailer: doc.data().trailer,
        beskrivelse: doc.data().beskrivelse,
        regissor: doc.data().regissør,
        skuespillere: doc.data().skuespillere
      }));
      setMovies(dataFilmer);
      setLoading(false);
    }

    fetchMovies();
  }, []);

  const handleClick = () => {
    if (loading) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    navigate(`/movie-page`, { state: { movie: randomMovie } });
    };

  return (
      <div className="shuffle-button">
        <img src={shuffle} alt="Shuffle" onClick={handleClick}/>
      </div>
  );
}

export default ShuffleButton;