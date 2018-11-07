import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { FadeLoader } from 'react-spinners';
import axios from "axios";

import SimpleMap from './Map';
import HeaderResults from './HeaderResults';
import ResultsList from './ResultList';
import NoResults from './NoResults';
import NewMap from './NewMap';

import './Results.css';

// import Footer from '../Footer';

const styles = theme => ({
  rootTabs: {
    backgroundColor: "white",
    color: "black"
  },
  rootTab: {
    flexGrow: 1
  },
  selectedTab: {
    backgroundColor: "#98e6e6",
    flexGrow: 1,
    left: 0,
    width: "50%"
  }
});

class Results extends Component {
  state = {
    isLoaded: false,
    moviesList: [],
    value: 0,
    locationsList: []
  };

  searchLoc = iValue => {
    this.setState({
      isLoaded: false
    });

    iValue = iValue.toLowerCase().trim()

    const url = `https://data.sfgov.org/resource/wwmu-gmzc.json?$q=${iValue}`;
    axios.get(url).then(res => {
      let moviesList = res.data;

      const datasSfExistingLocations = moviesList.filter(movie => movie.locations == undefined ? false : true) //on garde uniquement les films qui ont des lieux de tournage
      //const resMoviesList = this.transformDatasLocationInMovie(datasSfExistingLocations);

      moviesList = this.transformDatasLocationInMovie(datasSfExistingLocations // on appelle la fonction pour regrouper les lieux par film
        .filter(movie => movie.title.toLowerCase().includes(iValue))
        .sort((data1, data2) => (data1.title < data2.title ? -1 : 1)) //on trie les titres de film par ordre alphabétique;
      )
      this.setState({
        moviesList,
        isLoaded: true,
      });
    })
    .catch(() =>{
      this.setState({
        moviesList: [],
        isLoaded: true,
      })
    });
  }

  transformDatasLocationInMovie = datasSfExistingLocations => {
    let res = [];
    let data = {};
    let film = []; //ici on initialise ce dont on va avoir besoin dans la fonction (de res à synopsis)
    let add = {};
    const synopsis = "No data available";
    const getFilm = (res, data) => {
      return res.filter(
        f => f.title === data.title && f.release_year === data.release_year
      ); //(on compare le nouveau titre de film )
    }; //qui est inséré dans data avec ceux qui sont déjà dans res (les films) pour voir s'ils ont les mm titres et la mm année pour
    //les regrouper par lieux de tournage

    for (let i = 0; i < datasSfExistingLocations.length; i++) {
      data = datasSfExistingLocations[i];
      film = getFilm(res, data);
      if (!film.length) {
        //équivaut à film.length===0
        add = {
          title: data.title,
          release_year: data.release_year,
          locations: new Array(data.locations),
          synopsis: synopsis,
          actors: new Array(data.actor_1, data.actor_2, data.actor_3),
          director: data.director,
          image:
            "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"
        };
        res.push(add);
      } else {
        getFilm(res, data)[0].locations.push(data.locations); // si y'a un titre pareil, on push pour regrouper par film les lieux
      }
    }
    return res;
  };

  handleChange = (_, iValue) => {
    this.setState({ value: iValue });
    const blnDisplayFooter = iValue === 1 ? "none" : "flex";
    this.props.setDisplayFooter(blnDisplayFooter);
  };

  getLocationsOnPage = moviesOnPage => {

    console.log('1', moviesOnPage)
    let locationsOnPage = [];
    for (let i = 0; i < moviesOnPage.length; i++) {
      const movie = moviesOnPage[i];
      console.log('2', movie)
      for (let j = 0; j < movie.locations.length; j++) {

        let location = movie.locations[j].toLowerCase();
        let strSplit = [];
        strSplit = location.split(String.fromCharCode(40));
        if (strSplit.length > 0 && strSplit[1]!=null) {
          location = strSplit[1];
          location = location.substring(0, location.length - 1);

          if (!location.includes("streets") || !location.includes("street")) {
            location += " street";
          }
        }

        if (location.includes(" from ") && location.includes(" to ")) {
          strSplit = location.split("from");
          location = strSplit[0];

          if (!location.includes("streets") || !location.includes("street")) {
            location += " street";
          }
        }

        location = location.replace(/ & /g, "%20");
        location = location.replace(/ /g, "%20");
        location = location + "%2C%20san%20francisco%2C%20CA";

        locationsOnPage.push([location, movie.title]);
      }
    }

    if (locationsOnPage.join("") !== this.state.locationsList.join("")) {
      this.setState({ locationsList: locationsOnPage });
    }
  };

  componentDidMount() {
    this.searchLoc(this.props.inputValue);
    this.props.setFooterColor("white");
  }

  render() {
    const { value, moviesList, locationsList } = this.state;
    const { classes, lift, inputValue, setFooterColor } = this.props;

    if (this.state.isLoaded) {
      if (this.state.moviesList.length > 0) {
        return (
          <div className="Results">
            <HeaderResults
              inputValue={inputValue}
              searchLoc={this.searchLoc}
              lift={lift}
              setFooterColor={setFooterColor}
              blnHome = {false}
            />
            <div className="mobileOnly">
              <div>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={this.handleChange}
                    centered
                    classes={{
                      root: classes.rootTabs,
                      indicator: classes.selectedTab
                    }}
                  >
                    <Tab classes={{ root: classes.rootTab }} label="List" />
                    <Tab classes={{ root: classes.rootTab }} label="Map" />
                  </Tabs>
                </AppBar>
                {value === 0 && (
                  <ResultsList
                    moviesList={moviesList}
                    getLocationsOnPage={this.getLocationsOnPage}
                  />
                )}
                {value === 1 && <SimpleMap locationsList={locationsList} />}
              </div>
            </div>
            <div className="desktopOnly">
              <ResultsList
                moviesList={moviesList}
                getLocationsOnPage={this.getLocationsOnPage}
              />
              <SimpleMap locationsList={locationsList} />
            </div>
            {/* <Footer/> */}
          </div>
        );
      } else {
        return (
          <div className="Results">
            <HeaderResults
              inputValue={inputValue}
              searchLoc={this.searchLoc}
              lift={lift}
              setFooterColor={setFooterColor}
              blnHome = {false}
            />
          <div className="desktopOnly">
            <NoResults   inputValue={inputValue}
            searchLoc={this.searchLoc}
            lift={lift}
            setFooterColor={setFooterColor}
            blnHome = {false} />
            <NewMap moviesList={moviesList}/>
          </div>
          <div className="mobileOnly">
          <div>
          <NoResults   inputValue={inputValue}
            searchLoc={this.searchLoc}
            lift={lift}
            setFooterColor={setFooterColor}
            blnHome = {false} />
          </div>
        </div>
        </div>
        );
      }
    } else {
      return (
        <div className="Results">
          <div className="loadingSpinner">
            <FadeLoader
              sizeUnit={"px"}
              size={150}
              color={"black"}
              loading={!this.state.isloaded}
            />
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Results);
