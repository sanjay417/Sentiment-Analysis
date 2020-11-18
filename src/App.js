import React, { Component } from 'react';
import './App.css';
// import logo from './logo.svg';
import MovieList from './components/movie-list/index.js';

const title = "Movie List";

class App extends Component {
  render() {
    return (
      <div>
        <nav
          className="app-header layout-row align-items-center justify-content-left" style={{ backgroundColor: '#367dc9' }}
        >
          <div className="layout-row align-items-center">
            {/* <img alt="X" src={logo} className="logo"/> */}
            <div className="i-logo mr-4"></div>
            {/* <h4 id="app-title" data-testid="app-title" className="app-title">
              { title }
            </h4> */}
          </div>
        </nav>
        <MovieList/>
      </div>
    );
  }
}

export default App;
