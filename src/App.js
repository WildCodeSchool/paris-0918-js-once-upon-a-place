import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom';
import Header from './Header';
import Home from './Home.js';
import Results from './Results/Results';
import Footer from './Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/Results" component={Results} />
                </Switch>
            </BrowserRouter>
        <Footer/>
      </div>
    );
  }
}

export default App;
