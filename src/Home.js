import React, { Component } from "react";
import Header from "./Header";
import "./Home.css";
import SearchBar from "./SearchBar";
import EveryLocationsButton from './EveryLocationsButton';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// import Footer from "./Footer";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Home extends Component {
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { spacing } = this.state;
    const { lift } = this.props;
    return (
      <div className="Home">
        <Header />
        <main className="mainPart">
          <div className="ok">
          <Grid item xs={12}>
          <Grid container  justify="center" spacing={Number(spacing)}>
            {[0].map(value => (
              <Grid key={value} item>
                <div className="searchBar">
                        <p className="searchBarIntro">Want to know where a movie has been shot ? <br/>
                        Type its title just here :</p>
                        <SearchBar inputValue='' lift={lift} blnHome={true} />
                </div>
              </Grid>

            ))}
              {[0].map(value => (
              <Grid key={value} item>
                <div className="everyLocationsButton">
                        <p className ="buttonIntro">Want to see all movie locations in San Francisco ? <br/>
                        Click below:</p>
                        <EveryLocationsButton />
                </div>
              </Grid>
            ))}

          </Grid>
          </Grid>

          </div>
          <p className="intro">
            Discover where your favorites movies have been shot around the
            world with Once Upon A Place. <br />
            You could be surprised to discover one next from your place...
          </p>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withStyles(styles)(Home);










