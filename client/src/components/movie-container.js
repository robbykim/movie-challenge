import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import _ from 'underscore';
import MovieList from './movie-list';
import MovieItem from './movie-item';
import MovieFormContainer from './movie-form-container';
import ApiManager from '../ApiManager';

class MovieContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      actors: [],
      genres: [],
    };

    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    let movies;
    let actors;
    let genres;
    let isMovieDone = false;
    let isActorDone = false;
    let isGenreDone = false;

    const changeState = () => {
      if (isMovieDone && isActorDone && isGenreDone) {
        this.setState({
          movies,
          actors,
          genres,
        });
      }
    }

    const movieCb = (res, status) => {
      movies = status === 'success' ? res : [];
      isMovieDone = true;
      changeState();
    };

    const genreCb = (res, status) => {
      genres = status === 'success' ? res : [];
      isGenreDone = true;
      changeState();
    };

    const actorCb = (res, status) => {
      actors = status === 'success' ? res : [];
      isActorDone = true;
      changeState();
    };

    ApiManager.getMovies(movieCb);
    ApiManager.getActors(actorCb);
    ApiManager.getGenres(genreCb);
  }

  addMovie(movie) {
    const movies = this.state.movies.slice();
    movies.unshift(movie);

    this.setState({
      movies,
    });
  }

  editMovie(movie) {
    const movies = this.state.movies.slice();
    const index = _.findIndex(movies, { id: movie.id });

    movies[index] = movie;
    this.setState({
      movies,
    });
  }

  deleteMovie(id) {
    const deleteCb = (res) => {
      const movies = _.filter(this.state.movies, (mov) => {
        return mov.id !== parseInt(res.id);
      });

      this.setState({
        movies,
      });

      this.props.history.push('/');
    }

    ApiManager.deleteMovie(id, deleteCb);
  }

  render() {
    return (
      <div className="container">
        <Route
          exact
          path="/"
          render={props => (
            <MovieList
              {...props}
              movies={this.state.movies}
            />
          )}
        />
        <Route
          path="/search/:keywords"
          render={props => (
            <MovieList
              {...props}
              movies={this.state.movies}
            />
          )}
        />
        <Route
          path="/movies/:id"
          render={props => (
            <MovieItem
              {...props}
              movies={this.state.movies}
              deleteMovie={this.deleteMovie}
            />
          )}
        />
        <Route
          path="/add-movie"
          render={props => (
            <MovieFormContainer
              {...props}
              {...this.state}
              method="add"
              submitForm={this.submitForm}
              addMovie={this.addMovie}
              editMovie={this.editMovie}
            />
          )}
        />
        <Route
          path="/edit-movie/:id"
          render={props => (
            <MovieFormContainer
              {...props}
              {...this.state}
              method="edit"
              submitForm={this.submitForm}
              addMovie={this.addMovie}
              editMovie={this.editMovie}
            />
          )}
        />
      </div>
    );
  }
}

export default MovieContainer;
