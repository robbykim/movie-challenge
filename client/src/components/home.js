import React, { Component } from 'react';
import './home.css';
import Navbar from './navbar';
import MovieList from './movie-list';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <MovieList />
      </div>
    );
  }
}

export default Home;