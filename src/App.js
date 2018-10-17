import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, } from 'react-router-dom';
import './App.css';

import Home from './Home.js';
import Results from './Results/Results';
import Footer from './Footer';
import Team from './Team'
import './App.css';

class App extends Component {

  state = {
    inputValue:''
  }

  lift = (a) =>{
    this.setState({inputValue:a})
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
                <Switch>
                  <Route 
                    exact path="/" 
                    render={()=> 
                      <Home 
                        autoComp={this.autoComp}
                        lift={this.lift}
                      />} 
                  />
                  <Route 
                    path="/Results" 
                    render={()=> 
                      <Results 
                        inputValue={this.state.inputValue} 
                      />} 
                  />
                  
							    <Route path = "/team" render={()=> 
                      <Team />}
						      />
                </Switch>
                <Footer/>
            </div>
          </BrowserRouter>

        
      </div>
    );
  }
}

export default App;
