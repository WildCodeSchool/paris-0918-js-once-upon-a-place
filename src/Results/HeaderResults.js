import React, {Component} from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, InputBase } from "@material-ui/core";
import {
  withStyles,
} from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import logo from '../images/logoCamera.svg';
import { NavLink } from 'react-router-dom';
import Autocompletion from '../Autocompletion'

const styles = theme => ({
  root: {
    width: "100%",
  },
  app: {
    backgroundColor: 'white'
  },
  grow: {
    flexGrow: 0
  },
  menuButton: {
    marginLeft: -10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4
  },
  logo: {
    width: theme.spacing.unit * 6,
    animation: 'App-logo-spin infinite 20s linear',
  },
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
    boxShadow: "0px 2px 3px #aaa",
    "&:hover": {
      boxShadow: "0px 0px 0px #aaa"
    },
    height: 45
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
    height:'100%'
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

class HeaderResults extends Component {

    state = {
      inputValue: this.props.inputValue,
      open: false,
      anchorEl: null,
      elWidth: 0
    }

    handleChangeAndFocus = event => {
      this.state.inputValue !== event.target.value && this.setState(
        {
          inputValue: event.target.value
        },
        () => {
          const { inputValue } = this.state;
          const blnOpen = inputValue !== "";
          this.setState({
            open: blnOpen,
            anchorEl: document.getElementById('AppBarSearchIcon'),
            elWidth: document.getElementById('AppBarInputBase').clientWidth,
            inputValue: inputValue
          });
        }
      );
    };
  
    handleBlur = () => {
      // this.setState({
      //   open: false
      // });
    };

    launchSearchLoc = (iValue) => {
      this.props.searchLoc(iValue);
    }

    handleKeyUp = (e) => {
        e.keyCode === 13 && this.launchSearchLoc(this.state.inputValue);
    }

    handleSelect = (iSearchStr) => {
      this.setState({
        inputValue: iSearchStr,
        open: false
      });
      this.launchSearchLoc(iSearchStr)
    }

    render(){
        const { classes } = this.props;
        const { inputValue, open, anchorEl, elWidth } = this.state;
        return (
            <div className={classes.root}>
            <AppBar position="static" className={classes.app}>
                <Toolbar >
                    <NavLink to="/"> 
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer">
                                <img src={logo} className={classes.logo} alt="logo" />
                        </IconButton>
                    </NavLink> 
                    <div className={classes.grow} />
                    <div className={classes.search} >
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
                            onKeyUp={this.handleKeyUp}
                            value={inputValue}
                            onChange={this.handleChangeAndFocus}
                            onFocus={this.handleFocusAndFocus}
                            onBlur={this.handleBlur}
                        />
                        {this.state.open && (
                          <Autocompletion open={open} anchorEl={anchorEl} elWidth={elWidth} inputValue={inputValue} select={this.handleSelect}/>
                        )}
                    </div>
                </Toolbar>
                </AppBar>
            </div>
        );
    }
}

HeaderResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderResults);