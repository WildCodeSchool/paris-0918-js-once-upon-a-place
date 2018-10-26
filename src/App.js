import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Results from "./Results/Results";
import Footer from "./Footer";
import Team from "./Team";
import "./App.css";

class App extends Component {
  
  /**
   * Initial state
   * @{string} inputValue - the value that is searched by the user
   */
  state = {
    inputValue: ""
  };
  
  /**
   * Used to lift the inputValue back to the App
   * @param {string} iValue - the value to apply to this.state.inputValue
   */
  lift = (iValue) => {
    this.setState({ 
      inputValue: iValue 
    });
  };
  

  render() {
    const { inputValue } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Home lift={this.lift} />}
              />
              <Route
                path="/Results"
                render={() => <Results inputValue={inputValue} lift={this.lift} />}
              />
              <Route 
                path="/team" 
                render={() => <Team />} 
              />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
