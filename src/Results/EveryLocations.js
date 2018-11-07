import React, { Component } from 'react';

import axios from 'axios';

import HeaderResults from './HeaderResults';
import GlobalMap from './GlobalMap/GlobalMap';

class EveryLocations extends Component {
    searchLoc = iValue => {
        this.setState({
          isLoaded: false
        });
    
        iValue = iValue.toLowerCase().trim()
    
        const url = `https://data.sfgov.org/resource/wwmu-gmzc.json?$q=${iValue}`;
        axios.get(url).then(res => {
          let moviesList = res.data;
          moviesList = this.transformDatasLocationInMovie(moviesList // on appelle la fonction pour regrouper les lieux par film
            .filter(movie => movie.title.toLowerCase().includes(iValue))
            .sort((data1, data2) => (data1.title < data2.title ? -1 : 1)) //on trie les titres de film par ordre alphabétique;
          )
          this.setState({
            moviesList,
            isLoaded: true,
          });
        })
        .catch(() =>{
          this.setState({
            moviesList: [],
            isLoaded: true,
          })
        });
      }
    
      transformDatasLocationInMovie = datasSfExistingLocations => {
        let res = [];
        let data = {};
        let film = []; //ici on initialise ce dont on va avoir besoin dans la fonction (de res à synopsis)
        let add = {};
        const synopsis = "No data available";
        const getFilm = (res, data) => {
          return res.filter(f => f.title === data.title && f.release_year === data.release_year);//(on compare le nouveau titre de film )
        } //qui est inséré dans data avec ceux qui sont déjà dans res (les films) pour voir s'ils ont les mm titres et la mm année pour
        //les regrouper par lieux de tournage
    
        for (let i = 0; i < datasSfExistingLocations.length; i++) {
          data = datasSfExistingLocations[i];
          film = getFilm(res, data);
          if (!film.length) { //équivaut à film.length===0
            add = {
              title: data.title,
              release_year: data.release_year,
              locations: new Array(data.locations),
              synopsis: synopsis,
              actors: new Array(data.actor_1, data.actor_2, data.actor_3),
              director: data.director,
              image: "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"
            };
            res.push(add);
          } else {
            getFilm(res, data)[0].locations.push(data.locations); // si y'a un titre pareil, on push pour regrouper par film les lieux
          }
        }
        return res;
      };

    render(){
        const { lift, inputValue, setFooterColor } = this.props;
        return(

            <div>
                <HeaderResults 
                  inputValue={inputValue}
                  searchLoc={this.searchLoc}
                  lift={lift}
                  setFooterColor={setFooterColor}
                  blnHome = {true}/>
                <GlobalMap />
                
            </div>

        )
    }
}

export default EveryLocations;