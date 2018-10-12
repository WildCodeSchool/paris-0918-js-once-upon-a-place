import React, {Component} from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, InputBase } from "@material-ui/core";
import {
  withStyles,
} from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import logo from '../images/logoCamera.svg';
import { NavLink } from 'react-router-dom';

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
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
    border: "solid",
    borderColor: "lightgrey",
    borderWidth: theme.spacing.unit * 0.1,
    boxShadow: "1px 3px 6px #aaa",
    "&:hover": {
      boxShadow: "3px 3px 6px #aaa"
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
      inputValue: this.props.inputValue
    }

    onChange = (event) => {
        this.setState({
          inputValue: event.target.value
        })
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            console.log(this.state.inputValue);
            this.props.searchLoc(this.state.inputValue);
        }
    }

    render(){
        const { classes } = this.props;
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
                    <div className={classes.search} 
                        id="inputSearch"
                        onSubmit={this.handleSubmit}
                        >
                        <div type="submit" className={classes.searchIcon}>
                            <Search />
                        </div>
                        <InputBase
                            placeholder="Movie/Address..."
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                            }}
                            onKeyUp={this.handleKeyUp}
                            value={this.state.inputValue}
                            onChange={this.onChange}
                        />
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