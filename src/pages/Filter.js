// Denne filene er laget helt med chat.gpt bare noen få endringer av Jonathan
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function sortAndFilterMovies(db, filters) {
  try {
    // Initialize a reference to the movies collection
    const moviesRef = collection(db, 'Movie');

    // Construct the query based on the provided filters
    let q = query(moviesRef);

    // Apply filters
    filters.forEach(({ field, operator, value }) => {
      q = query(q, where(field, operator, value));
    });

    // Execute the query and retrieve the filtered movies
    const querySnapshot = await getDocs(q);
    const movies = [];
    querySnapshot.forEach((doc) => {
      const movieData = doc.data();
      const movie = {
        id: doc.id,
        title: movieData.tittel,
        year: movieData.utgivelsesår,
        bilde: movieData.bilde,
        sjanger: movieData.sjanger, // Add sjanger property
        trailer: movieData.trailer,
        beskrivelse: movieData.beskrivelse,
        regissor: movieData.regissør,
        skuespillere: movieData.skuespillere
      };
      movies.push(movie);
    });

    // Perform client-side filtering based on genres
    const filteredMovies = applyClientSideFiltering(movies, filters);

    return filteredMovies;
  } catch (error) {
    throw new Error("Error filtering movies: " + error);
  }
  // Function to perform client-side filtering based on genres
function applyClientSideFiltering(movies, filters) {
  const genreFilter = filters.find(filter => filter.field === 'sjanger');
  if (genreFilter) {
    const selectedGenres = genreFilter.value;
    return movies.filter(movie => selectedGenres.every(genre => movie.sjanger.includes(genre)));
  }
  return movies;
}

}
