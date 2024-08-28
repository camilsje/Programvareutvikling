import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MovieRecommendations from './MovieRecommendations';

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      email: 'test@example.com' // Mocked user email
    }
  }))
}));

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      query: jest.fn(() => ({
        where: jest.fn(() => ({
          getDocs: jest.fn(() => ({
            docs: [
              {
                data: () => ({
                  favourite: ['movie1', 'movie2'], // Mocked user favorites
                  movies_watched: ['movie3', 'movie4'] // Mocked user seen movies
                })
              }
            ]
          }))
        }))
      }))
    })),
    doc: jest.fn(() => ({
      get: jest.fn(() => ({
        data: () => ({ tittel: 'Movie Title', utgivelsesår: 2022, bilde: 'movie.jpg' }) // Mocked movie data
      }))
    }))
  }))
}));

describe('MovieRecommendations Component', () => {
  test('fetches recommendations and renders them correctly', async () => {
    render(<MovieRecommendations />);

    // Wait for recommendations to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Movie Title (2022)')).toBeInTheDocument();
    });
  });
});
