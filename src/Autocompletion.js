import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Popper, Paper, MenuItem, Grow } from "@material-ui/core";


const styles = theme => ({
  paper: {
    border: "solid",
    borderColor: "lightgrey",
    borderRadius: "1px 1px 4px 4px",
    borderWidth: theme.spacing.unit * 0.1,
    boxShadow: "0px 0px 0px #aaa",
    height: '1OO%',
    maxHeight: 250,
    flexGrow:1,
    overflow: 'auto'
  }
});

class Autocompletion extends Component {
  
  state = {
    titles: [], 
    searchValue: '',
    // fetchController: null 
  };

  componentDidMount() {
    const AbortController = window.AbortController;
    const { inputValue } = this.props;
    // this.setState({
    //   fetchController: new AbortController()
    // }, this.autoComp(inputValue));
    this.autoComp(inputValue);
  }

  componentDidUpdate() {    
    const { inputValue } = this.props;
    const { searchValue } = this.state;
    if (searchValue !== inputValue && inputValue !== '') {
      this.autoComp(inputValue);
    }
  }

  componentWillUnmount() {
    // this.state.fetchController.abort();
  }

  autoComp = async (iValue) => {
    const url = `https://data.sfgov.org/resource/wwmu-gmzc.json?$where=title like '%25${iValue}%25'` //&$limit=50
    const call_api = await fetch(url);
    // this.state.fetchController.signal);
    const json = await call_api.json();
    const titles = json.map(iFilm=>iFilm.title).sort().filter((iTitle,iIndex,iTitles)=>iTitle!==iTitles[iIndex-1]);
    this.setState({
      searchValue: iValue,
      titles:iValue.length?titles:[]
    })
	}
  
  handleClickOnMenuItem = (e) => {
    this.props.select(e.target.textContent);
  }

  render() {
    const { classes, anchorEl, open, elWidth} = this.props;
    const { titles } = this.state;

    return (
      <div className="Autocompletion">
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={500}>
              <Paper style={{ width: elWidth }} className={classes.paper}>
                {titles.length > 0 && titles.map((iTitle,iIndex) => 
                  <div key={String(iIndex)} onClick={this.handleClickOnMenuItem}>
                    <MenuItem component="div">
                      <div>                    
                        <strong style={{ fontWeight: 300 }}>
                          {iTitle}
                        </strong>
                      </div>
                    </MenuItem>
                  </div>
                )}
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

Autocompletion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Autocompletion);