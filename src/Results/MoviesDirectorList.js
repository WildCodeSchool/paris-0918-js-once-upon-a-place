import React from 'react';
import axios from 'axios';
import DirectorMovies from './DirectorMovies';

class MoviesDirectorList extends React.Component {

    state = {
        directorName: this.props.directorName,
        title: this.props.title,
        moviesDirectorList: []
        //je récupére les infos du nom du director et du titre du film sur lequel je suis depuis le composant Movie
    }

    componentDidMount() {
        axios.get(`https://data.sfgov.org/resource/wwmu-gmzc.json?$where=director%20like%20%27%25${this.state.directorName}%25%27&$limit=100`)
            .then(json =>  {
                this.setState({ moviesDirectorList : json.data.map(e =>  e.title)})
                })
        //je fais un nouvel appel à l'API en fonction du nom du director récupéré depuis le composant Movie pour récupérer toutes les infos liées à 
        //son nom dans l'API SF
    }

    render() {
        console.log('toto')
        //uniqu est un tableau avec la liste de films non répétés, car l'API ressort les infos par lieu de films, j'ai donc plusieurs fois le mm film
        //pour chaque réalisateur, ici j'ai donc une liste avec les titres de film unique

        // const resultUniq = uniq.filter((element)=>{
        //     return(element !== this.state.title)
        // })
        //resultUniq me permet d'avoir la liste des films uniques sans le titre du film affiché par l'expander
            return (
                <ul>
                {this.state.moviesDirectorList.sort()
                .filter((movie,i,t) => movie !== t[i-1] && movie !== this.state.title)
                .map((title, i) => {
                    return (
                            <li><DirectorMovies key={i} title={title} /></li>
                    //<ModalList key={i} result={information} />
                )})
                    }</ul>
            );
    }
}

export default MoviesDirectorList;