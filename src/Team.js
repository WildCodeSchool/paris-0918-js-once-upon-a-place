import React from 'react';
import DisplayTeam from './DisplayTeam';
import  { TeamList } from './TeamList';


const Team = () => {
    const card = TeamList.map(member => {
        return (
            <DisplayTeam
                key={member.id}
                name={member.name}
                img={member.img}

            />
        )
    })

    return (
        <div className="list">
          {card}
        </div>
    )
}

export default Team;