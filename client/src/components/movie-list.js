import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/movie-list.css';

class MovieList extends Component {
  filterMovies() {
    const searchKeywords = this.props.match.params.keywords
    if (!searchKeywords) {
      return this.props.movies;
    }

    const keywords = searchKeywords.split('+');

    const movies = this.props.movies.filter((movie) => {
      let titleMatch = false;
      let ratingMatch = false;
      let yearMatch = false;
      let actorMatch = false;
      let genreMatch = false;

      for (let i = 0; i < keywords.length; i++) {
        const word = keywords[i].toLowerCase();

        if (movie.title.toLowerCase().indexOf(word) !== -1) {
          titleMatch = true;
          break;
        }

        if (movie.year.toString().indexOf(word) !== -1) {
          yearMatch = true;
          break;
        }

        if (movie.rating.toString().indexOf(word) !== -1) {
          ratingMatch = true;
          break;
        }

        for (let j = 0; j < movie.actors.length; j++) {
          const actor = movie.actors[j];

          if (actor.toLowerCase().indexOf(word) !== -1) {
            actorMatch = true;
            break;
          }
        }

        for (let j = 0; j < movie.genres.length; j++) {
          const genre = movie.genres[j];

          if (genre.toLowerCase().indexOf(word) !== -1) {
            genreMatch = true;
            break;
          }
        }
      }

      return titleMatch || yearMatch || ratingMatch || actorMatch || genreMatch;
    });

    return movies;
  }

  renderMovieList(movies) {
    return movies.map((movie) => {
      return (
        <div className="col-lg-4" key={`${movie.title}-${movie.year}`}>
          <div className="card col-md-12 movie-list__card">
            <div className="card-body">
              <h4 className="card-title movie-list__card-title">{movie.title}</h4>
              <span className="movie-list__card-year">
                {movie.year}
              </span>
              <Link
                to={`/movies/${movie.id}`}
                className="movie-list__button btn"
                key={`${movie.title}-${movie.year}`}
              >
                View
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  renderHeader() {
    const searchKeywords = this.props.match.params.keywords
    if (!searchKeywords) {
      return 'All Movies:'
    }

    const keywords = searchKeywords.split('+');

    return `Search - ${keywords.join(' ')}:`;
  }

  render() {
    const movies = this.filterMovies();

    return (
      <div className="container">
        <span className="movie-list__header">{this.renderHeader()}</span>
        <div className="row">
          {this.renderMovieList(movies)}
        </div>
      </div>
    );
  }
}

export default MovieList;