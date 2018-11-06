import React, { Component } from 'react';
//const beginningURL = 'https://image.tmdb.org/t/p/w500';

class DirectorMovies extends Component {
    render(){
        return(
            <div>{this.props.title}</div>
        );
    }

}

export default DirectorMovies;