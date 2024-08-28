import React from 'react';
import { sortAndFilterMovies } from './Filter';
import MovieGrid from '../Components/MovieGrid'; // Import MovieGrid component
import '../Style/Filterbutton.css';

const genreOptions = [
  "Action",
  "Drama",
  "Crime",
  "Romance",
  "Thriller",
  "Fantasy",
  "Mystery",
  "Sci-Fi"
];

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedGenres: [],
      startYear: '',
      endYear: '',
      directorName: '',
      filteredMovies: [] // Add state variable to hold filtered movies
    };
  }

  toggleFilterBox = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleGenreClick = (genre) => {
    const { selectedGenres } = this.state;
    const updatedSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(item => item !== genre) 
      : [...selectedGenres, genre]; 
  
    // Update selected genres
    this.setState({ selectedGenres: updatedSelectedGenres });
  }
  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleClick = async () => {
    try {
      const { db } = this.props;
      const { startYear, endYear, directorName, selectedGenres } = this.state;
  
      let filters = [];

      if (startYear !== '' && endYear !== '') {
        filters.push({ field: 'utgivelsesår', operator: '>=', value: parseInt(startYear) });
        filters.push({ field: 'utgivelsesår', operator: '<=', value: parseInt(endYear) });
      }
  
      if (directorName.trim() !== '') {
        filters.push({ field: 'regissør', operator: '==', value: directorName.trim() });
      }
  
      if (selectedGenres.length > 0) {
        const genreFilter = { field: 'sjanger', operator: 'array-contains-any', value: selectedGenres };
        filters.push(genreFilter);
      }
  
      const filteredMovies = await sortAndFilterMovies(db, filters);
  
      
      this.setState({ filteredMovies, isOpen: false });
    } catch (error) {
      console.error("Error filtering movies:", error);
    }
  }
  

  clearFilters = () => {
    this.setState({
      selectedGenres: [],
      startYear: '',
      endYear: '',
      directorName: ''
    }, () => {
      this.handleClick();
    });
  }

  render() {
    const { isOpen, selectedGenres, startYear, endYear, directorName, filteredMovies } = this.state;
  
    return (
      <div className="filter-button-container">
        <button className="filter-button" onClick={this.toggleFilterBox}>Filter</button>
        {isOpen && (
          <div className="filter-box">
            <button className="close-button" onClick={this.toggleFilterBox}>X</button>
            <div>
              <h3>Genres:</h3>
              {genreOptions.map(genre => (
                <button key={genre} className={selectedGenres.includes(genre) ? 'selected' : ''} onClick={() => this.handleGenreClick(genre)}>{genre}</button>
              ))}
            </div>
            <div>
              <h3>Release Year:</h3>
              <input type="text" name="startYear" placeholder="From" value={startYear} onChange={this.handleInputChange} />
              <input type="text" name="endYear" placeholder="To" value={endYear} onChange={this.handleInputChange} />
            </div>
            <div>
              <h3>Director:</h3>
              <input type="text" name="directorName" value={directorName} onChange={this.handleInputChange} />
            </div>
            <button className="clear-filters" onClick={this.clearFilters}>Clear Filters</button>
            <button className="apply-filters" onClick={this.handleClick}>Apply Filters</button>
          </div>
        )}
        <MovieGrid movies={filteredMovies} />
      </div>
    );
  }
  
}

export default FilterButton;
