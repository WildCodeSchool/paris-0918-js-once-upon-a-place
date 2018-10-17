import React from 'react';
import './DisplayTeam.css';

const DisplayTeam = (props) => {
    return (
        <div className = "display-team">
            <img src = {props.img} alt = "member-pic" />
            <h2>{props.name}</h2>
        </div>
    )
}

export default DisplayTeam;