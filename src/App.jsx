import React, { useCallback, useEffect, useState } from "react"
import classes from "./App.module.css"
import MoviesList from "./components/MoviesList"
import AddMovie from './components/AddMovie';

const DUMMY_MOVIES = [
  {
    id: 1,
    title: "Some Dummy Movie",
    openingText: "This is the opening text of the movie",
    releaseDate: "2021-05-18",
  },
  {
    id: 2,
    title: "Some Dummy Movie 2",
    openingText: "This is the second opening text of the movie",
    releaseDate: "2021-05-19",
  },
]
function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://swapi.dev/api/films/")
      if (!response.ok) {
        throw new Error("Something went wrong")
      }
      const data = await response.json()
      const mappedResults = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      })
      setMovies(mappedResults)
    } catch (httpError) {
      setError(httpError)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies}></MoviesList>
  }
  if(error){
    content = <p>{error.toString()}</p>
  }

  if (loading) {
    content = <p>is Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
