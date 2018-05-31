import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-xl">
        <Link to="/" className="navbar-brand">InMotion Movies</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/add-movie">Add Movie</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;