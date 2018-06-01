import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieItem extends Component {
  renderActors(movie) {
    if (!movie.actors) {
      return null;
    }

    return movie.actors.map((actor) => {
      return (
        <li key={actor} className="movie-actor">{actor}</li>
      );
    });
  }

  renderGenres(movie) {
    if (!movie.genres) {
      return null;
    }

    return movie.genres.map((genre) => {
      return (
        <li key={genre} className="movie-genre">{genre}</li>
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
        <span className="movie-title">{movie.title}</span>
        <span className="movie-year">{movie.year}</span>
        <span className="movie-rating">{movie.rating}</span>
        <span className="movie-actor-title">Actors:</span>
        <ul className="movie-actors-list">
          {this.renderActors(movie)}
        </ul>
        <span className="movie-genre-title">Genres:</span>
        <ul className="movie-genres-list">
          {this.renderGenres(movie)}
        </ul>
        <Link to={`/edit-movie/${movie.id}`} className="btn">
          <button className="btn">
            Edit
          </button>
        </Link>
        <button onClick={() => deleteMovie(match.params.id)} className="btn">
          Delete
        </button>
      </div>
    );
  }
}

export default MovieItem;