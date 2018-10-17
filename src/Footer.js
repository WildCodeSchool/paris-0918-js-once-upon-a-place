import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
	render(){
		return(
			<footer>
				<p>App developped by xxxxx.</p>
				<p><a href = "mailto:xxxx@gmail.com">Email : xxxx@gmail.com</a></p>
				
					<div>
						{<NavLink to = "/team">Team</NavLink>}
					</div>
				
			</footer>
		);
	}
}

export default Footer;