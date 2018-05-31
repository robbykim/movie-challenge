import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MovieList from './movie-list';
import MovieItem from './movie-item';
import MovieForm from './movie-form';
import ApiManager from '../ApiManager';

class MovieContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      actors: [],
      genres: [],
    };

    this.submitForm = this.submitForm.bind(this);
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

    const movieCb = (res) => {
      movies = res || [];
      isMovieDone = true;
      changeState();
    };

    const genreCb = (res) => {
      genres = res || [];
      isGenreDone = true;
      changeState();
    };

    const actorCb = (res) => {
      actors = res || [];
      isActorDone = true;
      changeState();
    };

    ApiManager.getMovies(movieCb);
    ApiManager.getActors(actorCb);
    ApiManager.getGenres(genreCb);
  }

  submitForm(movie, method) {
    const cb = (res) => {
      console.log(res);
    }

    if (method === 'add') {
      ApiManager.postMovie(movie, cb);
    } else {
      ApiManager.putMovie(movie, cb);
    }
  }

  render() {
    return (
      <div className="container">
        <Route
          exact
          path="/"
          render={props => (
            <MovieList
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
            />
          )}
        />
        <Route
          path="/add-movie"
          render={props => (
            <MovieForm
              {...props}
              {...this.state}
              method="add"
              submitForm={this.submitForm}
            />
          )}
        />
        <Route
          path="/edit-movie/:id"
          render={props => (
            <MovieForm
              {...props}
              {...this.state}
              method="edit"
              submitForm={this.submitForm}
            />
          )}
        />
      </div>
    );
  }
}

export default MovieContainer;
