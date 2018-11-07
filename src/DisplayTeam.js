import React from 'react';
import './DisplayTeam.css';

const DisplayTeam = (props) => {
    return (
        <div className = "team-member">
            <img src = {require(`${props.img}`)} alt = {props.name} />
            <h2>{props.name}</h2>
        </div>
    )
}

export default DisplayTeam;