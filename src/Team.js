import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DisplayTeam from "./DisplayTeam";
import { TeamList } from "./TeamList";
import Header from "./Header";

import "./Team.css";

class Team extends Component {
  componentDidMount() {
    this.props.setFooterColor("white");
  }

  render() {
    return (
      <div className="Team">
        <Link to='/'><Header /></Link>
        <div className="team-members">
          {TeamList.map(member => (
            <DisplayTeam key={member.id} name={member.name} img={member.img} />
          ))}
        </div>
      </div>
    );
  }
}

export default Team;
