import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './home.css';
import Navbar from './navbar';
import MovieContainer from './movie-container';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <MovieContainer />
      </div>
    );
  }
}

export default Home;