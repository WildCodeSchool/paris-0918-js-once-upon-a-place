import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
        textTransform: 'none',
        textDecoration: 'none',
        backgroundColor: "white"
    }
  });

class EveryLocationsButton extends Component {
    render(){
        const { classes } = this.props;
        return(
        <div>
         
        {<Link to = "/EveryLocations" style={{ textDecoration: 'none' }}> <Button variant="contained" className={classes.button}>
          See all
      </Button></Link>}
        </div>
        )
    }
}

export default withStyles(styles)(EveryLocationsButton);

