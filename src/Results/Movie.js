import React, { Component } from 'react';
import Expander from './Expander';
import MoviesDirectorList from './MoviesDirectorList';
import './Movie.css';
import axios from 'axios';

const beginningURL = 'https://image.tmdb.org/t/p/w500'; //l'API coupe son URL pour les affiches, il faut rajouter ça devant
const API_KEY = '101524b9ef56aa6595b105469939da4d';

class Movie extends Component {


  state = {
    movie: this.props.movieSf, //on met dans le state le tableau de valeurs envoyées par Results (lieux par film de SF)
    youtubeKey: undefined
  };

  getYoutubeKey = () => {
    const url = `https://api.themoviedb.org/3/movie/${this.state.movie.id}/videos?api_key=${API_KEY}&language=en-US`;
    axios.get(url)
      .then(res =>
        // console.log(res),
         this.setState({
           youtubeKey: res===undefined ? undefined : res.data===undefined ? undefined : res.data.results===undefined ? undefined : res.data.results[0]===undefined ? undefined : res.data.results[0].hasOwnProperty('key') ? res.data.results[0].key : undefined
         })
      )
      .catch(res => console.log(res))
  }

  joinAPIsResults = async () => {
    const movieJoined = this.state.movie;
    //appel à l'API MovieDB en fonction du titre de l'API de SF
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movieJoined.title}&include_adult=false`
    axios.get(url)
      .then(res => {
        const data = res.data.results[0];
        movieJoined.synopsis = data.overview;
        movieJoined.image = beginningURL + data.poster_path;
        movieJoined.id = data.id;
      })
      .then(() => {
        this.setState({
          movie: movieJoined //je remplis mon state avec le nouveau tableau rempli des données des 2 APIs
        })
      })
      .then(() =>
        this.getYoutubeKey()
      )
      .catch(res => console.log(res))
  }

  componentDidMount() {
    this.joinAPIsResults() //une fois que le composant est chargé, fait appel à la fonction pour joindre les résultats des 2 APIs
  }


  render() {
        return (
            <div className="Movie">
                {/* j'envoie les infos du state pour les afficher dans expander */}
                <Expander movie={this.state.movie}    youtubeKey={this.state.youtubeKey}/>
                {/* <MoviesDirectorList directorName={this.state.movie.director} title={this.state.movie.title} /> */}
            </div>
        )
  }
}

export default Movie;
