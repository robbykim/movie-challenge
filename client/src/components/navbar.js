import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css';

class Navbar extends Component {
  constructor() {
    super();
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    // this.props.search(this.searchInput.value);
    const keywords = this.searchInput.value;
    const parsedKeywords = keywords.replace(/ /g, '+');

    this.props.history.push(`/search/${parsedKeywords}`)
  }

  render() {
    return (
      <nav className="navbar navbar-expand-xl">
        <Link to="/" className="navbar-brand">InMotion Movies</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/add-movie">Add Movie</Link>
          </li>
        </ul>
        <form
          className="form-inline ml-lg-4"
          onSubmit={this.handleSearchSubmit}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={ref => this.searchInput = ref}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default Navbar;