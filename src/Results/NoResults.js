import React, { Component } from 'react';

import HeaderResults from './HeaderResults';
import './NoResults.css';

class NoResults extends Component {
    
      componentDidMount() {
        this.props.setFooterColor('white');
      };

    render(){
        const { lift, inputValue, setFooterColor, searchLoc } = this.props;
        return(
            <div>

                <HeaderResults 
                    inputValue={inputValue}
                    searchLoc={searchLoc}
                    lift={lift}
                    setFooterColor={setFooterColor}
                    blnHome = {false}/>

                <div className="content">
                    <h2>No results found for this query, please type an other title.</h2>
                    {/* <iframe src="https://giphy.com/embed/10tIjpzIu8fe0" width="480" height="288" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/inside-out-gif-10tIjpzIu8fe0">via GIPHY</a></p> */}

                    <img src="https://media1.tenor.com/images/da573c6c77ed52b63321e3788025d867/tenor.gif?itemid=12353147" width="683" height="510.1927710843373" alt="No results found gif" style={{maxWidth: '683px'}}></img>

                </div>

            </div>

        )
    }
}

export default NoResults;