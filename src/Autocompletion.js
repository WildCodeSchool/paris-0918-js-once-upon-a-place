import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Popper, Paper, MenuItem } from "@material-ui/core";

const styles = theme => ({
  popper: {
    zIndex: 2,
  },
  paper: {
    border: "solid",
    borderColor: "lightgrey",
    borderRadius: "1px 1px 4px 4px",
    borderWidth: theme.spacing.unit * 0.1,
    boxShadow: "0px 0px 0px #aaa",
    height: '1OO%',
    maxHeight: 250,
    flexGrow: 1,
    overflow: 'auto',
  }
});

class Autocompletion extends Component {
  //---Handle the click on a MenuItem component
  handleClickOnMenuItem = iEvent => {
    //Allow to launch the handleSelect function which is passed in props from SearchBar 
    this.props.select(iEvent.target.textContent);
  }

  render() {

    //Get this.props.classes, this.props.anchorEl, this.props.elWidth, this.props.titlesList
    const { classes, anchorEl, elWidth, titlesList } = this.props;

    return (
      <div className="Autocompletion">
        <Popper
          open={true}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          className={classes.popper}
        >
          <Paper style={{ width: elWidth }} className={classes.paper} classes={{root: classes.paperRoot}}>
            {titlesList.length > 0 && titlesList.map((iTitle,iIndex) => 
              <div key={String(iIndex)} onClick={this.handleClickOnMenuItem}>
                <MenuItem component="div" className="AutocompletionItem">
                  <div>                    
                    <strong style={{ fontWeight: 300 }}>
                      {iTitle}
                    </strong>
                  </div>
                </MenuItem>
              </div>
            )}
          </Paper>
        </Popper>
      </div>
    );
  }
}

Autocompletion.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object.isRequired, 
  elWidth: PropTypes.number.isRequired, 
  titlesList: PropTypes.array.isRequired
};

export default withStyles(styles)(Autocompletion);