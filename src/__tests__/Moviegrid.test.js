import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieGrid from './MovieGrid';

describe('MovieGrid Component', () => {
  test('renders movie grid correctly', () => {
    const movies = [
      { id: 1, title: 'Movie 1', year: 2020, bilde: 'movie1.jpg' },
      { id: 2, title: 'Movie 2', year: 2021, bilde: 'movie2.jpg' },
    ];

    render(<MovieGrid movies={movies} />);

    // Check if movies are rendered
    expect(screen.getByText('Movie 1 (2020)')).toBeInTheDocument();
    expect(screen.getByText('Movie 2 (2021)')).toBeInTheDocument();
  });

  test('adds movie to liked movies when heart icon is clicked', () => {
    const movies = [{ id: 1, title: 'Movie 1', year: 2020, bilde: 'movie1.jpg' }];
    render(<MovieGrid movies={movies} />);

    const heartIcon = screen.getByAltText('heart');
    fireEvent.click(heartIcon);

    // Check if movie is added to liked movies
    expect(heartIcon.classList.contains('red')).toBe(true);
  });

  test('adds movie to seen movies when check mark icon is clicked', () => {
    const movies = [{ id: 1, title: 'Movie 1', year: 2020, bilde: 'movie1.jpg' }];
    render(<MovieGrid movies={movies} />);

    const checkMarkIcon = screen.getByAltText('check mark');
    fireEvent.click(checkMarkIcon);

    // Check if movie is added to seen movies
    expect(checkMarkIcon.classList.contains('green')).toBe(true);
  });

  test('opens review dialog when star icon is clicked', () => {
    const movies = [{ id: 1, title: 'Movie 1', year: 2020, bilde: 'movie1.jpg' }];
    render(<MovieGrid movies={movies} />);

    const reviewIcon = screen.getByAltText('star');
    fireEvent.click(reviewIcon);

    // Check if review dialog is opened
    expect(screen.getByText('Write a Review')).toBeInTheDocument();
  });
});
