import React, { Component } from 'react';

import './NoResults.css';

class NoResults extends Component {
    
      componentDidMount() {
        this.props.setFooterColor('white');
      };

    render(){
        return(
           

                <div className="content">
                    <h2 className="noResults">No results found !</h2>
                    {/* <iframe src="https://giphy.com/embed/10tIjpzIu8fe0" width="480" height="288" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/inside-out-gif-10tIjpzIu8fe0">via GIPHY</a></p> */}

                    <img className="imgNoResults" src="https://media1.tenor.com/images/da573c6c77ed52b63321e3788025d867/tenor.gif?itemid=12353147" width="683" height="510.1927710843373" alt="No results found gif" style={{maxWidth: '683px'}}></img>
                    <h2> Please type an other title. </h2>
                </div>

        )
    }
}

export default NoResults;