import React, { Component } from 'react';
import { MultiSelect, SimpleSelect } from 'react-selectize';
import MovieForm from './movie-form';
import ApiManager from '../ApiManager';
import 'react-selectize/themes/index.css';
import './movie-form.css';

class MovieFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      rating: null,
      year: null,
      actors: null,
      genres: null,
    };

    this.validateForm = this.validateForm.bind(this);
    this.updateYearState = this.updateYearState.bind(this);
    this.updateActorState = this.updateActorState.bind(this);
    this.updateGenreState = this.updateGenreState.bind(this);
    this.updateRatingState = this.updateRatingState.bind(this);
    this.updateTitleState = this.updateTitleState.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { id } = nextProps.match.params;
    if (!id) {
      return null;
    }

    const filteredMovies = nextProps.movies.filter((movie) => {
      return movie.id === parseInt(id);
    });

    const currentMovie = filteredMovies[0];
    if (!currentMovie) {
      return null;
    }

    if (!prevState.title || !prevState.rating || !prevState.year || !prevState.actors || !prevState.genres) {
      return {
        title: currentMovie.title,
        rating: currentMovie.rating.toString(),
        year: currentMovie.year.toString(),
        actors: currentMovie.actors,
        genres: currentMovie.genres,
      }
    }

    return null;
  }

  validateForm(e) {
    e.preventDefault();

    // TODO: Add user feedback
    const {
      title,
      rating,
      year,
      actors,
      genres,
    } = this.state;

    const {
      method,
    } = this.props;

    if (!title || !rating || !year || !actors || !genres) {
      console.log('Missing Fields');
      return;
    }

    if (!actors.length || !genres.length) {
      console.log('Add at least one actor and genre');
      return;
    }

    if (!title.trim().length) {
      console.log('Please add a title');
      return;
    }

    const movie = {
      title,
      rating,
      year,
      actors,
      genres,
    };

    this.submitForm(movie, method);
  }

  submitForm(movie, method) {
    const cb = (res) => {
      if (method === 'add') {
        this.props.addMovie(res);
      } else {
        this.props.editMovie(res);
      }

      this.props.history.push('/');
    }

    if (method === 'add') {
      ApiManager.postMovie(movie, cb);
    } else {
      const { id } = this.props.match.params;
      ApiManager.putMovie(movie, id, cb);
    }
  }

  updateTitleState(value) {
    this.setState({
      title: value,
    });
  }

  updateActorState(values) {
    const actors = values.map((val) => {
      return val.value;
    });

    this.setState({
      actors,
    });
  }

  updateYearState(values) {
    this.setState({
      year: values.value,
    });
  }

  updateRatingState(values) {
    this.setState({
      rating: values.value,
    });
  }

  updateGenreState(values) {
    const genres = values.map((val) => {
      return val.value;
    });

    this.setState({
      genres,
    });
  }

  render() {
    return (
      <MovieForm
        {...this.state}
        actorsList={this.props.actors}
        genresList={this.props.genres}
        movies={this.props.movies}
        validateForm={this.validateForm}
        updateActorState={this.updateActorState}
        updateGenreState={this.updateGenreState}
        updateYearState={this.updateYearState}
        updateRatingState={this.updateRatingState}
        updateTitleState={this.updateTitleState}
      />
    );
  }
}

export default MovieFormContainer;