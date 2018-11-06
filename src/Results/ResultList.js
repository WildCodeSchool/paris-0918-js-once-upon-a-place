import React, { Component } from "react";
import "./ResultList.css";
import Movie from "./Movie";
import { Button, Typography } from "@material-ui/core";
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const NUMBER_OF_MOVIES_PER_PAGE = 5;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class ResultList extends Component {
  /**
   * Initial state
   * {num} currentNumberPage - the page that is displayed
   * {array} moviesPerPage - the list of movies that is displayed
   * {num} numberResultStart - first index of the this.props.moviesList that must be displayed
   * {num} numberResultEnd - last index of the this.props.moviesList that must be displayed
   * {boolean} haveResults - true if this.props.moviesList.length > 0
   * {boolean} isDisplayNext - true if the next page button must be displayed
   * {boolean} isDisplayPrevious - true if the previous page button must be displayed
   */
  state = {
    currentNumberPage: 1,
    moviesPerPage: [],
    numberResultStart: 0,
    numberResultEnd: 0,
    haveResults: false,
    isDisplayNext: false,
    isDisplayPrevious: false,
    moviesList: this.props.moviesList
  };

  /**
   * Update the list of films according to the page that must be displayed
   */
  getMoviesPerPage = () => {
    //Get this.state.currentNumberPage
    const { currentNumberPage } = this.state;
    //Get this.props.moviesList
    const { moviesList } = this.state;
    //Get the first index of the moviesList that must be displayed
    const numberResultStart =
      (currentNumberPage - 1) * NUMBER_OF_MOVIES_PER_PAGE;
    //Get the last index of the moviesList that must be displayed
    let numberResultEnd = currentNumberPage * NUMBER_OF_MOVIES_PER_PAGE;
    //If this last index is bigger than the length of the moviesList -> take the length of the moviesList as reference
    if (numberResultEnd > moviesList.length) {
      numberResultEnd = moviesList.length;
    }
    //Set an array that contains only the movies that must de displayed
    const pageArray = moviesList.slice(numberResultStart, numberResultEnd);
    this.setState({
      moviesPerPage: pageArray,
      numberResultStart: numberResultStart,
      numberResultEnd: numberResultEnd,
      haveResults: moviesList.length ? true : false,
      isDisplayPrevious: currentNumberPage === 1 ? false : true,
      isDisplayNext: numberResultEnd === moviesList.length ? false : true
    });
  };

  /**
   * Go to the previous page
   */
  handlerButtonPrevious = () => {
    //Get this.state.currentNumberPage
    const { currentNumberPage } = this.state;
    //If currentNumberPage is bigger than 1 -> currentNumberPage = currentNumberPage - 1 and empty moviesPerPage
    //Then, launch the getMoviesPerPage function
    if (currentNumberPage > 1) {
      this.setState(
        {
          currentNumberPage: currentNumberPage - 1,
          moviesPerPage: []
        },
        this.getMoviesPerPage
      );
    }
  };

  /**
   * Go to the next page
   */
  handlerButtonNext = () => {
    //Get this.state.currentNumberPage
    const { currentNumberPage } = this.state;
    //Get this.props.moviesList
    const { moviesList } = this.props;
    //If currentNumberPage is smaller than the length of the list of movies / number of movies per page -> currentNumberPage = currentNumberPage + 1 and empty moviesPerPage
    //Then, launch the getMoviesPerPage function
    if (moviesList.length / NUMBER_OF_MOVIES_PER_PAGE > currentNumberPage) {
      this.setState(
        {
          currentNumberPage: currentNumberPage + 1,
          moviesPerPage: []
        },
        this.getMoviesPerPage
      );
    }
  };

  componentDidMount() {
    this.getMoviesPerPage();
  }

  componentWillReceiveProps() {
    this.getMoviesPerPage();
  }

  render() {
    const {
      moviesPerPage,
      numberResultStart,
      numberResultEnd,
      haveResults,
      isDisplayNext,
      isDisplayPrevious,
      moviesList
    } = this.state;
    // const { moviesList } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="moviesContainer">
          {haveResults &&
            moviesPerPage.map((e, i) => (
              <Movie key={"movie-" + i} movieSf={e} />
            ))}
          <div className="center">
            <Typography>
              {haveResults
                ? `${numberResultStart + 1} - ${numberResultEnd} on ${
                    moviesList.length
                  } movies`
                : "No result found"}
            </Typography>
            <Button
              onClick={this.handlerButtonPrevious}
              variant="outlined"
              style={
                isDisplayPrevious
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              {"\u003C"}
            </Button>
            <Button
              onClick={this.handlerButtonNext}
              variant="outlined"
              style={
                isDisplayNext
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              {"\u003E"}
            </Button>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ResultList;
