import React, { Component } from 'react';
import { MultiSelect, SimpleSelect } from 'react-selectize';
import 'react-selectize/themes/index.css';
import './css/movie-form.css';

class MovieForm extends Component {
  createActorFromSearch(options, values, search) {
    const labels = values.map(function(value){
        return value.label;
    });

    if (search.trim().length == 0 || labels.indexOf(search.trim()) != -1)
        return null;
    return {label: search.trim(), value: search.trim()};
  }

  getOptions(options) {
    if (!options) {
      return [];
    }

    return options.map((option) => {
      return {
        label: option,
        value: option,
      };
    });
  }

  getYearValue() {
    const { year } = this.props;
    if (year) {
      return {
        'label': year,
        'value': year,
      };
    }
  }

  getRatingValue(currentMovie) {
    const { rating } = this.props;
    if (rating) {
      return {
        'label': rating,
        'value': rating,
      };
    }
  }

  getActorsValues() {
    const { actors } = this.props;
    if (actors) {
      return actors.map((actor) => {
        return {
          'label': actor,
          'value': actor,
        };
      });
    }

    return [];
  }

  getGenresValues() {
    const { genres } = this.props;
    if (genres) {
      return genres.map((genre) => {
        return {
          'label': genre,
          'value': genre,
        };
      });
    }

    return [];
  }

  renderYearChoices() {
    const yearChoices = [];

    for (let i = 1920; i < 2019; i++) {
      const option = {
        label: i.toString(),
        value: i.toString(),
      };

      yearChoices.unshift(option);
    }

    return yearChoices;
  }

  renderRatingChoices() {
    const ratingChoices = [];

    for (let i = 1; i <= 10; i++) {
      const option = {
        label: i.toString(),
        value: i.toString(),
      };

      ratingChoices.unshift(option);
    }

    return ratingChoices;
  }

  renderHeader() {
    const { method } = this.props;
    if (method === 'edit') {
      return 'Edit Movie';
    }

    return 'Add New Movie';
  }

  render() {
    const {
      movies,
      validateForm,
      updateActorState,
      updateTitleState,
      updateGenreState,
      updateYearState,
      updateRatingState,
      title,
      actorsList,
      genresList,
    } = this.props;

    return (
      <form className="jumbotron" onSubmit={validateForm}>
        <div className="form-group">
          <h1 className="movie-form__header">{this.renderHeader()}</h1>
        </div>
        <div className="form-group">
          <label
            htmlFor="movieTitle"
            className="movie-form__label"
          >
            Title
          </label>
          <input
            id="movieTitle"
            type="text"
            value={title || ''}
            onChange={(e) => updateTitleState(e.target.value)}
            className="form-control movie-form__title-input"
            placeholder="Enter movie title"
            aria-describedby="movieTitle"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="movieYear"
            className="movie-form__label"
          >
            Year
          </label>
          <SimpleSelect
            id="movieYear"
            value={this.getYearValue()}
            options={this.renderYearChoices()}
            className="movie-multiselect"
            placeholder="Add Year"
            onValueChange={(vals) => updateYearState(vals)}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="movieRating"
            className="movie-form__label"
          >
            Rating
          </label>
          <SimpleSelect
            id="movieRating"
            value={this.getRatingValue()}
            options={this.renderRatingChoices()}
            className="movie-multiselect"
            placeholder="Add Year"
            onValueChange={(vals) => updateRatingState(vals)}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="movieActors"
            className="movie-form__label"
          >
            Actors
          </label>
          <MultiSelect
            id="movieActors"
            values={this.getActorsValues()}
            options={this.getOptions(actorsList)}
            className="movie-multiselect"
            placeholder="Add Actors"
            onValuesChange={(vals) => updateActorState(vals)}
            createFromSearch={(options, values, search) => this.createActorFromSearch(options, values, search)}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="movieGenre"
            className="movie-form__label"
          >
            Genres
          </label>
          <MultiSelect
            id="movieGenre"
            values={this.getGenresValues()}
            className="movie-multiselect"
            options={this.getOptions(genresList)}
            onValuesChange={(vals) => updateGenreState(vals)}
            placeholder="Add Genres"
            createFromSearch={(options, values, search) => this.createActorFromSearch(options, values, search)}
          />
        </div>
        <button type="submit" className="btn movie-form__button">Submit</button>
      </form>
    );
  }
}

export default MovieForm;