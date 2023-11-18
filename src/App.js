import React, {useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  async function fetchMoviesHandler() {
    try{
      setIsLoading(true);
      setError(null);
      const res = await fetch('https://swapi.dev/api/films/');

      if(!res.ok){
        throw new Error('Retrying...');
      }
      const data = await res.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id:  movieData.episode_id,
          title: movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(transformedMovies);
    }catch(err){
      setError(err.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies</p>;

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }

  if(error){
    content = <p>{error}</p>
  }

  if(isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
