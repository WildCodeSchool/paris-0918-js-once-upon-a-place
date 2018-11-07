import React from 'react';
import axios from 'axios';

class MoviesDirectorList extends React.Component {

    state = {
        directorName: this.props.directorName,
        title: this.props.title,
        moviesDirectorList: []
        //je récupére les infos du nom du director et du titre du film sur lequel je suis depuis le composant Movie
    }

    componentDidMount() {
        axios.get(`https://data.sfgov.org/resource/wwmu-gmzc.json?$where=director%20like%20%27%25${this.state.directorName}%25%27&$limit=100`)
            .then(json => this.setState({ moviesDirectorList : json.data}))
        //je fais un nouvel appel à l'API en fonction du nom du director récupéré depuis le composant Movie pour récupérer toutes les infos liées à 
        //son nom dans l'API SF
    }

    render() {

        const uniq = [...new Set(this.state.moviesDirectorList.map(e =>  e.title))]
        //uniqu est un tableau avec la liste de films non répétés, car l'API ressort les infos par lieu de films, j'ai donc plusieurs fois le mm film
        //pour chaque réalisateur, ici j'ai donc une liste avec les titres de film unique

        const resultUniq = uniq.filter((element)=>{
            return(element !== this.state.title)
        })
        //resultUniq me permet d'avoir la liste des films uniques sans le titre du film affiché par l'expander
            return (
                resultUniq.map((information, i) => {
                return (
                    // <Test key={i} result={information} />
                    <div />
                )})
            )
    }
}

export default MoviesDirectorList;