import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/movie-item.css';

class MovieItem extends Component {
  renderActors(movie) {
    if (!movie.actors) {
      return null;
    }

    return movie.actors.map((actor) => {
      const combinedActor = actor.replace(/ /g, '+');

      return (
        <li
          key={actor}
          className="movie-item__actor-item list-group-item"
        >
          <Link
            to={`/search/${combinedActor}`}
            className="movie-item__link"
          >
            {actor}
          </Link>
        </li>
      );
    });
  }

  renderGenres(movie) {
    if (!movie.genres) {
      return null;
    }

    return movie.genres.map((genre) => {
      const combinedGenre  = genre.replace(/ /g, '+');

      return (
        <li
          key={genre}
          className="movie-item__genre-item list-group-item"
        >
          <Link
            to={`/search/${combinedGenre}`}
            className="movie-item__link"
          >
            {genre}
          </Link>
        </li>
      );
    });
  }

  render() {
    const {
      movies,
      match,
      deleteMovie,
    } = this.props;

    const filteredMovies = movies.filter((movie) => {
      return movie.id === parseInt(match.params.id);
    });

    const movie = filteredMovies[0] || {};

    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="movie-item__title">{movie.title}</h1>
          <div className="movie-item__year-container">
            <span className="movie-item__year-label">Released:</span>
            <span className="movie-item__year-value">{movie.year}</span>
          </div>
          <div className="movie-item__rating-container">
            <span className="movie-item__rating-label">Rated:</span>
            <span className="movie-item__rating-value">{movie.rating}/10</span>
          </div>
          <div className="row movie-item__lists-container">
            <div className="movie-item__actors-container col-md-3">
              <span className="movie-item__actor-title">Actors:</span>
              <ul className="movie-item__actors-list list-group list-group-flush">
                {this.renderActors(movie)}
              </ul>
            </div>
            <div className="movie-item__genres-container col-md-3">
              <span className="movie-item__genre-title">Genres:</span>
              <ul className="movie-genres-list list-group list-group-flush">
                {this.renderGenres(movie)}
              </ul>
            </div>
          </div>
          <Link to={`/edit-movie/${movie.id}`} className="btn">
            <button className="btn movie-item__button">
              Edit
            </button>
          </Link>
          <button
            onClick={() => deleteMovie(match.params.id)}
            className="btn movie-item__button"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default MovieItem;