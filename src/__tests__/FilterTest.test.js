import { sortAndFilterMovies } from './Filter';
import { collection, query, where, getDocs } from 'firebase/firestore';
// Import any other necessary modules for mocking

// Mock Firestore functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn()
}));

describe('sortAndFilterMovies function', () => {
  beforeEach(() => {
    // Clear mock implementations and reset mock calls before each test
    jest.clearAllMocks();
  });

  it('should filter movies based on provided filters', async () => {
    // Mock Firestore data
    const fakeMovieData = [
      { id: '1', title: 'Movie 1', sjanger: ['Action'], utgivelsesår: 2020, regissør: 'Director 1' },
      { id: '2', title: 'Movie 2', sjanger: ['Drama'], utgivelsesår: 2019, regissør: 'Director 2' },
      { id: '3', title: 'Movie 3', sjanger: ['Fantasy'], utgivelsesår: 2021, regissør: 'Director 3' }
    ];

    // Mock Firestore query snapshot
    const mockQuerySnapshot = {
      forEach: jest.fn(callback => fakeMovieData.forEach(callback))
    };

    // Mock Firestore functions to return expected values
    collection.mockReturnValueOnce({});
    query.mockReturnValueOnce({});
    where.mockReturnValueOnce({});
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    // Mock database instance
    const fakeDb = {};

    // Define filters
    const filters = [
      { field: 'utgivelsesår', operator: '>=', value: 2019 },
      { field: 'sjanger', operator: 'array-contains-any', value: ['Action', 'Drama'] }
    ];

    // Call the function to be tested
    const filteredMovies = await sortAndFilterMovies(fakeDb, filters);

    // Assertions
    expect(collection).toHaveBeenCalledWith(fakeDb, 'Movie');
    expect(query).toHaveBeenCalled();
    expect(where).toHaveBeenCalledWith('utgivelsesår', '>=', 2019);
    expect(where).toHaveBeenCalledWith('sjanger', 'array-contains-any', ['Action', 'Drama']);
    expect(getDocs).toHaveBeenCalled();
    expect(filteredMovies).toEqual([
      { id: '1', title: 'Movie 1', sjanger: ['Action'], utgivelsesår: 2020, regissør: 'Director 1' },
      { id: '2', title: 'Movie 2', sjanger: ['Drama'], utgivelsesår: 2019, regissør: 'Director 2' }
    ]);
  });

  // Add more test cases as needed
});
