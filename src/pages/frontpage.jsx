import React, { useState, useEffect, useRef } from 'react';
import MovieGrid from '../Components/MovieGrid.jsx';
import FilterButton from './Filterbutton';
import { getFirestore, collection, getDocs} from 'firebase/firestore'; 
import "../Style/frontpage.css";
import LogoComponent from '../Components/logoComponent.jsx';
import NavBar from '../Components/NavBar.jsx';
import ShuffleButton from '../Components/ShuffleButton.jsx';

function Frontpage() {
  const db = getFirestore();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const filterButtonRef = useRef(null); 


  // Function to handle filter change
  const handleFilterChange = async (filteredMovies) => {
    setFilteredMovies(filteredMovies); // Set new filtered movies
  };

  // Function to trigger filter button click event
  const triggerFilterButtonClick = () => {
    if (filterButtonRef.current) {
      filterButtonRef.current.handleClick(); // Call the handleClick method of the filter button component
    }
  };

  // Trigger the filter button click event when the page loads
  useEffect(() => {
    triggerFilterButtonClick();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div>
      <NavBar/>
      <div className='ifdb-logo'> 
      <LogoComponent/>
      </div>
      <div>
      </div>
      <div>
        <h1 className="movies-logo"> Filmer</h1>
        <FilterButton ref={filterButtonRef} db={db} setFilteredMovies={handleFilterChange} />
        <MovieGrid movies={filteredMovies} />
      </div>
  </div>
  );
}

export default Frontpage;
