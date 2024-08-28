import "./App.css";
import Profile from "./pages/profile";
import Frontpage from "./pages/frontpage";
import BadMovies from "./pages/Badmovies";
import React from "react";
import FilterButton from "./pages/Filterbutton";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { firestore } from "./firebase"; 
import Movie from "./pages/Movie";

function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route index element={<Frontpage />} />
          <Route path="/frontpage" element={<Frontpage />} />
          <Route path="/Filter" element={<FilterButton db={firestore} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/BadMovies" element={<BadMovies db={firestore} />} /> 
          <Route path="/movie-page" element={<Movie db={firestore} />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
