import React, { Component } from 'react';
import { MultiSelect } from 'react-selectize';
import 'react-selectize/themes/index.css';
import './movie-form.css';

class MovieForm extends Component {
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
  }

  createActorFromSearch(options, values, search) {
    const labels = values.map(function(value){
        return value.label;
    });

    if (search.trim().length == 0 || labels.indexOf(search.trim()) != -1)
        return null;
    return {label: search.trim(), value: search.trim()};
  }

  getOptions(options) {
    return options.map((option) => {
      return {
        label: option,
        value: option,
      };
    });
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
      submitForm,
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

    submitForm(movie, method);
  }

  updateActorState(values) {
    const actors = values.map((val) => {
      return val.value;
    });

    this.setState({
      actors,
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

  renderYearChoices() {
    const yearChoices = [];

    for (let i = 1920; i < 2019; i++) {
      const option = (
        <option key={i}>{i}</option>
      );

      yearChoices.unshift(option);
    }

    return yearChoices;
  }

  renderRatingChoices() {
    const ratingChoices = [];

    for (let i = 0; i < 10; i++) {
      const option = (
        <option key={i}>{i + 1}</option>
      );

      ratingChoices.unshift(option);
    }

    return ratingChoices;
  }

  render() {
    return (
      <form onSubmit={this.validateForm}>
        <div className="form-group">
          <label htmlFor="movieTitle">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => this.setState({ title: e.target.value })}
            id="movieTitle"
            aria-describedby="movieTitle"
            placeholder="Enter movie title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="movieYear">Year</label>
          <select
            id="movieYear"
            className="form-control"
            onChange={(e) => this.setState({ year: e.target.value })}
          >
            <option selected>Choose...</option>
            {this.renderYearChoices()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="movieRating">Rating</label>
          <select
            id="movieRating"
            className="form-control"
            onChange={(e) => this.setState({ rating: e.target.value })}
          >
            <option selected>Choose...</option>
            {this.renderRatingChoices()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="movieActors">Actors</label>
          <MultiSelect
            id="movieActors"
            className="movie-multiselect"
            options={this.getOptions(this.props.actors)}
            onValuesChange={(vals) => this.updateActorState(vals)}
            placeholder="Add Actors"
            createFromSearch={(options, values, search) => this.createActorFromSearch(options, values, search)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="movieGenre">Genres</label>
          <MultiSelect
            id="movieGenre"
            className="movie-multiselect"
            options={this.getOptions(this.props.genres)}
            onValuesChange={(vals) => this.updateGenreState(vals)}
            placeholder="Add Genres"
            createFromSearch={(options, values, search) => this.createActorFromSearch(options, values, search)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default MovieForm;