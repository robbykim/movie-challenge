import React, { Component } from 'react';
import './home.css';
import Navbar from './navbar';
import ApiManager from '../ApiManager';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const cb = (res) => {
      console.log(res);
    }

    ApiManager.getMovies(cb);
  }

  render() {
    return (
      <div className="container">

      </div>
    );
  }
}

export default MovieList;