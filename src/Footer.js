import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {

	render(){
		const { footerColor, displayFooter } = this.props;
		const borderStyle = footerColor === "transparent" ? "none" : "solid";
		
		return(
			<footer className="Footer" style={{backgroundColor: footerColor, display: displayFooter, borderTopColor: "#e6e6e6", borderTopWidth: "1px", borderTopStyle: borderStyle}}>
				<p>App developped by xxxxx.</p>
				<p><a href = "mailto:xxxx@gmail.com">Email : xxxx@gmail.com</a></p>
						{<NavLink className="footerNav" to = "/team">Team</NavLink>}
			</footer>
		);
	}
}

export default Footer;