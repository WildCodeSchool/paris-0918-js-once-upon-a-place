import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Results from "./Results/Results";
import EveryLocations from "./Results/EveryLocations";
import Footer from "./Footer";
import Team from "./Team";
import "./App.css";

class App extends Component {
  
  /**
   * Initial state
   * @{string} inputValue - the value that is searched by the user
   */
  state = {
    inputValue: "",
    footerColor: "transparent",
    displayFooter: "flex",
    appPosition: "fixed"
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

  setFooterColor = (iStrColor) => {
    this.setState({
      footerColor: iStrColor,
      appPosition: iStrColor === "transparent" ? "fixed" : "relative"
    });
  }
  
  setDisplayFooter = (iBlnDisplay) => {
    this.setState({
      displayFooter: iBlnDisplay
    });
  }

  render() {
    const { inputValue, footerColor, displayFooter, appPosition } = this.state;
    return (
      <div className="App" style={{position: appPosition}}>
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
                render={() => <Results setDisplayFooter={this.setDisplayFooter} setFooterColor={this.setFooterColor} inputValue={inputValue} lift={this.lift} />}
              />
              <Route
                path="/EveryLocations"
                render={() => <EveryLocations setDisplayFooter={this.setDisplayFooter} setFooterColor={this.setFooterColor} inputValue={inputValue} lift={this.lift} /> }
              />
              <Route 
                path="/Team" 
                render={() => <Team setFooterColor={this.setFooterColor}/>} 
              />
            </Switch>
            <Footer footerColor={footerColor} displayFooter={displayFooter}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
