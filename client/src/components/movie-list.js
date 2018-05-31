import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from './navbar';
import ApiManager from '../ApiManager';

class MovieList extends Component {
  renderMovieList() {
    return this.props.movies.map((movie) => {
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

  render() {
    return (
      <div className="container">
        {this.renderMovieList()}
      </div>
    );
  }
}

export default MovieList;