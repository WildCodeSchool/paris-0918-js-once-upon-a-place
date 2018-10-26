import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import logo from "../images/logoCamera.svg";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";

const styles = theme => ({
  root: {
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 1,
    borderBottom: "solid #e6e6e6 1px"
  },
  app: {
    backgroundColor: "white",
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
    animation: "App-logo-spin infinite 20s linear"
  }
});

class HeaderResults extends Component {
  render() {
    //Get this.props.classes, this.props.inputValue, this.props.searchLoc, this.props.lift
    const { classes, inputValue, searchLoc, lift } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.app} elevation={0}>
          <Toolbar>
            <NavLink to="/">
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
              >
                <img src={logo} className={classes.logo} alt="logo" />
              </IconButton>
            </NavLink>
            <div className={classes.grow} />
            <SearchBar inputValue={inputValue} searchLoc={searchLoc} lift={lift} blnHome={false}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

HeaderResults.propTypes = {
  classes: PropTypes.object.isRequired,
  inputValue: PropTypes.string.isRequired,
  searchLoc: PropTypes.func.isRequired
};

export default withStyles(styles)(HeaderResults);
