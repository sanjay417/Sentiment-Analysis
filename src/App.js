import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list/index.js';

class App extends Component {
  render() {
    return (
      <div>
        <nav
          className="app-header layout-row align-items-center justify-content-left" style={{ backgroundColor: '#367dc9' }}
        >
          <div className="layout-row align-items-center">
            <div className="i-logo mr-4"></div>
          </div>
        </nav>
        <MovieList/>
      </div>
    );
  }
}

export default App;
