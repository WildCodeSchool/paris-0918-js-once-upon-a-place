import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider,
  withStyles,
  createMuiTheme
} from '@material-ui/core/styles';
import { Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Divider, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import YouTube from 'react-youtube';
import ModalList from './ModalList';
import './Expander.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    width: "98%",
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginLeft: '1%',
    marginRight: '1%',
    '&:hover': {
      boxShadow: "0px 0px 4px #cccccc",
    },
    border: 'solid #e6e6e6 1px'
  },
  summaryRoot: {
    minHeight: "25vh"
  },
  affiche: {
    height: "22vh"
  },
  space: {
    width: theme.spacing.unit * 2
  },
  moviesProps: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  movieTitle: {
    fontSize:"30px",
    [theme.breakpoints.down('sm')]: {
      fontSize:"20px",
    },
    marginTop: 0,
    marginBottom: theme.spacing.unit
  },
  list: {
    paddingLeft: "16px"
  }
});

const DetailedExpansionPanel = props => {
  const { classes, movie } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <ExpansionPanel elevation={0} className={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{ root: classes.summaryRoot }}
          >
            <Grid
              container
              sm
              className={classes.moviesProps}
            >
              <div>
                <img
                  className={classes.affiche}
                  src={movie.image}
                  alt={movie.title}
                />
              </div>
            </Grid>
            <div className={classes.space} />
            <Grid
              container
              className={classes.moviesProps}
            >
              <Typography>
                <h2 className={classes.movieTitle}>{movie.title}</h2>
              </Typography>
              <Divider light="true" />
              <Typography className="director">
                <b>Director:</b> {movie.director} 
                <ModalList directorName={movie.director} title={movie.title}/>
              </Typography>
              <Divider light="true" />
              <Typography>
                <b>Number of scenes locations:</b> {movie.locations.length}
              </Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid
              container
              className={classes.moviesProps}
            >
              <Divider light="true" />
              <Grid item container direction="row">
                <Grid item xs={2}>
                  <Typography>
                    <b>Scenes locations:</b>
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    <ul className={classes.list}>
                      {movie.locations.map((iLocation, iIndex) =>
                        <li key={iIndex}>{iLocation!==undefined ? iLocation : 'San Francisco'}</li>
                      )}
                    </ul>
                  </Typography>
                </Grid>
              </Grid>
              <Divider light="true" />
              <Grid item container direction="row">
                <Grid item xs={2}>
                  <Typography>
                    <b>Synopsis:</b>
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    {movie.synopsis}
                  </Typography>
                </Grid>
              </Grid>
              <Divider light="true" />
              <Grid item container direction="row">
                <Grid item xs={2}>
                  <Typography>
                    <b>Actors:</b>
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    <ul className={classes.list}>
                      <li />
                      <li />
                      <li />
                    </ul>
                  </Typography>
                </Grid>
              </Grid>
              <Divider light="true" />
              <Grid item container direction="row">
                <Grid item xs={2}>
                  <Typography>
                    <b>Video:</b>
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <div className={classes.trailer}>
                    {props.youtubeKey &&
                <YouTube
                  videoId={props.youtubeKey}
                  // opts={opts}
                  // onReady={this._onReady}
                />
              }
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </MuiThemeProvider>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);
