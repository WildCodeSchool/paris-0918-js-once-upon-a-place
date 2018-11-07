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
          
          <Grid container  justify="center" direction ="row" alignItems="center" spacing={Number(spacing)}>
            <Grid item xs={8} md={5}>
                  <div className="searchBar">
                          <p className="searchBarIntro">Want to know where a movie has been shot ? <br/>
                          Type its title just here :</p>
                          <SearchBar inputValue='' lift={lift} blnHome={true} />
                  </div>
            </Grid>
            <Grid item xs={0} md={2}>
              <div className="empty">
              </div>
            </Grid>
            <Grid item xs={8} md={5}>
              <div className="everyLocationsButton">
                <p className ="buttonIntro">Want to see all movie locations in San Francisco ? <br/>
                Click below:</p>
                <EveryLocationsButton />
              </div>
            </Grid>
          </Grid>

          </div>
          <p className="intro">
            Discover where your favorites movies have been shot in San Francisco with Once Upon A Place. <br />
            You could be surprised to discover one next from your place...
          </p>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withStyles(styles)(Home);










