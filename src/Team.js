import React from 'react';
import DisplayTeam from './DisplayTeam';
import  { TeamList } from './TeamList';
import './Team.css';


const Team = () => {
    const card = TeamList.map(member => {
        return (
            <div className="teamlist">
                <DisplayTeam
                    key={member.id}
                    name={member.name}
                    img={member.img}
                />
            </div>
        )
    })

    return (
        <div className="list">
          {card}
        </div>
    )
}

export default Team;