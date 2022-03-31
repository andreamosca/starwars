import classes from "./MoviesList.module.css"
import Movie from "./Movie"

function MoviesList(props) {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map(movie => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        ></Movie>
      ))}
    </ul>
  )
}

export default MoviesList
