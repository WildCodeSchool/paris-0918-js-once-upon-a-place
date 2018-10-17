import React, { Component } from 'react';
import {AppBar,Tabs,Tab} from '@material-ui/core';
import ResultList from './ResultList';
import Map from './Map';
import HeaderResults from './HeaderResults';
import './Results.css';

class Results extends Component {
  state = {
    res: [],
    isLoaded: false,
    value: 0
  };

  searchLoc = async (iValue) =>{
    const api_call = await fetch(`https://data.sfgov.org/resource/wwmu-gmzc.json?$where=title like '%25${iValue}%25'&$limit=50`);
    const data = await api_call.json();
    this.setState({
      res: api_call.ok ? data : [],
      isLoaded: true
    })
  };

  componentDidMount(){
    this.searchLoc(this.props.inputValue)
  };

  handleChange = (_, iValue) => {
    this.setState({ value: iValue });
  };

  render(){
    const { value } = this.state;
    if (this.state.isLoaded){
      if (this.state.res.length > 0){
        return(
          <div className= "Results">
            <div className='resHeader'>
              <HeaderResults inputValue={this.props.inputValue}  searchLoc={this.searchLoc}/>
            </div>

            <div className='resContent'>
              <div className="mobileOnly">
                <div>
                  <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} centered>
                      <Tab label="List" />
                      <Tab label="Map" />
                    </Tabs>
                  </AppBar>
                  {value === 0 && <ResultList 
                    locationsList = {this.state.res} 
                  />}
                  {value === 1 && <Map />}
                </div>
              </div>
              <div className="desktopOnly">      
                <ResultList 
                  locationsList = {this.state.res} 
                />
                <Map />
              </div>
            </div>
          </div>
        );
      }else{
        return <h2>Sorry! Nothing was found!</h2>
      }
    }else{return<h2 className='loading'>Loading...</h2>}
  }
}

export default Results;