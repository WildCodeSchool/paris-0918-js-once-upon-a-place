import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class EveryLocationsButton extends Component {
    render(){

        return(
        <div>
        {<NavLink to = "/EveryLocations"><button>EveryLocationsButton</button></NavLink>}
        </div>
        )
    }
}

export default EveryLocationsButton;