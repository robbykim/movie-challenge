import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-xl">
        <Link to="/" className="navbar-brand">InMotion Movies</Link>
      </nav>
    );
  }
}

export default Navbar;