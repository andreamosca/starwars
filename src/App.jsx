import React, { useState } from "react"
import classes from "./App.module.css"
import MoviesList from "./components/MoviesList"

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

  function fetchMoviesHandler() {
    fetch("https://swapi.dev/api/films/")
      .then(response => response.json())
      .then(data => {
        const mappedResults = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        })
        setMovies(mappedResults)
      })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <MoviesList movies={movies}></MoviesList>
    </React.Fragment>
  )
}

export default App
