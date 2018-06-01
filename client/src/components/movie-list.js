import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from './navbar';
import ApiManager from '../ApiManager';

class MovieList extends Component {
  renderMovieList(movies) {
    return movies.map((movie) => {
      return (
        <Link
          to={`/movies/${movie.id}`}
          className="movie-list-item"
          key={`${movie.title}-${movie.year}`}
        >
          {movie.title}
        </Link>
      );
    });
  }

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

  render() {
    const movies = this.filterMovies();

    return (
      <div className="container">
        {this.renderMovieList(movies)}
      </div>
    );
  }
}

export default MovieList;