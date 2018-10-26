import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  MuiThemeProvider,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Divider,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import YouTube from "react-youtube";

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
    marginLeft: "1%",
    marginRight: "1%",
    "&:hover": {
      boxShadow: "0px 0px 4px #cccccc"
    },
    border: "solid #e6e6e6 1px"
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
  moviePropsMain: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "16px"
  },
  movieProps: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  moviePropsPoster: {
    flexDirection: "column",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      width: "30%"
    }
  },
  movieTitle: {
    fontSize: "25px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px"
    },
    marginTop: 0,
    marginBottom: theme.spacing.unit
  },
  list: {
    paddingLeft: "16px"
  },
  moviePropsItems: {
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },
  moviePropYoutubeKey: {
    marginTop: "10px",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },
  synopsis: {
    marginTop: "0px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "8px"
    }
  },
  youtube: {
    width: "400px",
    height: "300px",
    [theme.breakpoints.down("sm")]: {
      width: "270px",
      height: "170px"
    }
  }
});
class DetailedExpansionPanel extends Component {

  render() {
    const { classes, movie, youtubeKey } = this.props;
    const trailer = {
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 0
      }
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <ExpansionPanel elevation={0} className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: classes.summaryRoot }}
            >
              <Grid item container sm className={classes.moviePropsPoster}>
                <div>
                  <img
                    className={classes.affiche}
                    src={movie.image}
                    alt={movie.title}
                  />
                </div>
              </Grid>
              <div className={classes.space} />
              <Grid container className={classes.moviePropsMain}>
                <Typography variant="h2" className={classes.movieTitle}>
                  {movie.title}
                </Typography>
                <Divider light={true} />
                <Typography>
                  <b>Director:</b> {movie.director}
                </Typography>
                <Divider light={true} />
                <Typography>
                  <b>Number of scenes locations:</b> {movie.locations.length}
                </Typography>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container className={classes.movieProps}>
                <Divider light={true} />
                <Grid item container className={classes.moviePropsItems}>
                  <Grid item xs={2}>
                    <Typography>
                      <b>Scenes locations:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <ul className={classes.list}>
                      {movie.locations.map((iLocation, iIndex) => (
                        <li key={iIndex}>
                          <Typography>
                            {iLocation !== undefined
                              ? iLocation
                              : "San Francisco"}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
                <Divider light={true} />
                <Grid item container className={classes.moviePropsItems}>
                  <Grid item xs={2}>
                    <Typography>
                      <b>Synopsis:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography className={classes.synopsis}>
                      {movie.synopsis}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider light={true} />
                <Grid item container className={classes.moviePropsItems}>
                  <Grid item xs={2}>
                    <Typography>
                      <b>Actors:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                      <ul className={classes.list}>
                          {movie.actors.map((actor, index) => (
                            actor && (
                            <li key={index}>
                            <Typography>
                              {actor}
                              </Typography>
                          </li>))
                          )
                          }
                      </ul>
                  </Grid>
                </Grid>
                {youtubeKey && (
                  <div>
                    <Divider light={true} />
                    <Grid
                      item
                      container
                      className={classes.moviePropYoutubeKey}
                    >
                      <Grid item xs={2}>
                        <Typography>
                          <b>Video:</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <div className={classes.trailer}>
                          <YouTube
                            videoId={youtubeKey}
                            opts={trailer}
                            className={classes.youtube}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </MuiThemeProvider>
    );
  }
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailedExpansionPanel);
