import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

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
      <div className="navbar-container">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link to="/" className="navbar-brand navbar__header">InMotion Movies</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/add-movie" className="navbar__add-movie-link">Add Movie</Link>
                </li>
              </ul>
              <form
                className="form-inline ml-lg-4"
                onSubmit={this.handleSearchSubmit}
              >
                <input
                  className="form-control mr-sm-2 navbar__search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  ref={ref => this.searchInput = ref}
                />
                <button
                  className="btn my-2 my-sm-0 navbar__search-button"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;