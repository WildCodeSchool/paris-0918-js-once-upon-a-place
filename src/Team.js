import React, {Component} from 'react';
import DisplayTeam from './DisplayTeam';
import  { TeamList } from './TeamList';
import './Team.css';


class Team extends Component{
    componentDidMount() {
        this.props.setFooterColor('white');
    };
    
    render(){
        return(
            TeamList.map(member => {
                return (
                    <div className="list">
                        <DisplayTeam
                            key={member.id}
                            name={member.name}
                            img={member.img}
            
                        />
                    </div>
                )
            }

        ))
    }
}

export default Team;

