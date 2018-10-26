import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Autocompletion from "./Autocompletion";
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: "4px 4px 1px 1px",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
    border: "solid",
    borderColor: "lightgrey",
    borderWidth: theme.spacing.unit * 0.1,
    boxShadow: "0px 2px 4px #cccccc",
    "&:hover": {
      boxShadow: "0px 0px 0px #aaa"
    },
    height: 45,
    backgroundColor: "white"
  },
  searchIcon: {
    color: "black",
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "black",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 300
      }
    }
  }
});

class SearchBar extends Component {

  /**
   * Initial state
   * {string} inputValue - the value that is entered in the uput field, it is initialiazed to this.props.inputValue which is the value of the input field in the Home
   * {boolean} openAutocompletion - allow to know if the Autocompletion component must be shown
   * {array} titlesList - list of the titles to display in the autcompletion component
   */
  state = {
    inputValue: this.props.inputValue,
    openAutocompletion: false,
    titlesList: []
  };

  /** 
   * This is done to render Results without using any NavLink
   */
  static contextTypes = {
    router: PropTypes.object
  };

  redirectToResults = () => {
    this.context.router.history.push(`/Results`);
  };

  /**
   * This function is used to make the autocompletion when a value is entered in the input field
   * @param {string} iStrValue - the value entered in the input field
   */
  autoComp = (iStrValue) => {
    //The strUrl used to get a list of movies from the API
    const strUrl = `https://data.sfgov.org/resource/wwmu-gmzc.json?$where=title like '%25${iStrValue}%25'`; //&$limit=50
    //The call to the API to get a json file contaning an array of movies
    axios.get(strUrl).then(json => {
      //A map is done on the list of movies to get only the titles
      //Then a sort is then done so the title will be in the alphabetical order
      //Then a filter is done to suppress the titles that appears several times
      const arrTitles = json.data
        .map(iObjMovie => iObjMovie.title)
        .sort()
        .filter((iStrTitle, iIntIndex, iArrTitles) => iStrTitle !== iArrTitles[iIntIndex - 1]);
      //Change the state of titlesList
      this.setState({
        titlesList: iStrValue.length ? arrTitles : []
      });
    });
  };

  /**
   * Handle the change of the value in the input field
   * @param {event} iEvent - the event that launched the function
   */
  handleChange = (iEvent) => {
    //Change the state of the inputValue
    this.setState(
      {
        inputValue: iEvent.target.value
      },
      () => {
        //Get this.state.inputValue
        const { inputValue } = this.state;
        //Call the autoComp function
        this.autoComp(inputValue);
        //Change the state of open
        this.setState({
          //openAutocompletion is true if the inputValue is not an empty string, so the Autocompletion component will be displayed only if a value is entered in the input field
          openAutocompletion: inputValue !== ""
        });
      }
    );
  };

  /**
   * Actions made when submitting a value in the input field or selecting an item in the Autocompletion component
   * @param {string} iStrSearch : search value
   */
  submitOrSelectSearchValue = (iStrSearch) =>  {
    //If we are in Results page, launch the searchLoc function which is a function passed in props from Results
    if (!this.props.blnHome) {
      this.props.searchLoc(iStrSearch);
    }
    //Allow to launch the lift function which is a function passed in props from App
    this.props.lift(iStrSearch);
    //Change the state of openCompletion -> false to hide the Autocompletion component and change the inputValue to match the value selected or submitted
    this.setState({
      inputValue: iStrSearch,
      openAutocompletion: false
    });
    //Render Results
    if (this.props.blnHome) {
      this.redirectToResults();;
    }
  }

  /**
   * Handle the submit event on the input field
   * @param {event} iEvent - the event that launched the function
   */
  handleSubmit = (iEvent) => {
    //preventDefault on the event so the page isn't re loaded
    iEvent.preventDefault();
    //launch the submitOrSelectValue function
    this.submitOrSelectSearchValue(this.state.inputValue);
  };

  /**
   * Handle the selection of an item in the Autocompletion component
   * @param {event} - value of the item selected
   */
  handleSelect = (iStrSel) => {
    //launch the submitOrSelectValue function
    this.submitOrSelectSearchValue(iStrSel);
  };

  /**
   * Handle a click outside the input field
   * @param {event} iEvent - the event that launched the function
   */
  handleBlur = (iEvent) => {
    //If the related target isn't null and contains the class "AutocompletionItem"
    if (
      iEvent.relatedTarget != null &&
      iEvent.relatedTarget.classList.contains("AutocompletionItem")
    ) {
      //Launch the handleSelect function
      this.handleSelect(iEvent.relatedTarget.innerText);
    }
    //In all cases, close the Autocompletion component
    this.setState({
      openAutocompletion: false
    });
  };

  render() {
    //Get this.props.classes
    const { classes } = this.props;
    //Get this.state.inputValue, this.state.openAutocompletion, this.state.titlesList
    const { inputValue, openAutocompletion, titlesList } = this.state;

    return (
      <form
        className="SearchBar"
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <div className={classes.search}>
          <div className={classes.searchIcon} id="AppBarSearchIcon">
            <Search />
          </div>
          <InputBase
            id="AppBarInputBase"
            placeholder="Movie/Address..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            value={inputValue}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {openAutocompletion && (
            <Autocompletion
              anchorEl={document.getElementById("AppBarSearchIcon")}
              elWidth={document.getElementById("AppBarInputBase").clientWidth}
              titlesList={titlesList}
              inputValue={inputValue}
              select={this.handleSelect}
            />
          )}
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  inputValue: PropTypes.string.isRequired,
  searchLoc: PropTypes.func
};

export default withStyles(styles)(SearchBar);
