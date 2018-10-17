import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import './Home.css';

class Home extends Component {
	state = {
		titles:[],
		inputValue: ''
	}

  autoComp = async (e) =>{
    const input = this.state.inputValue;
    const url = `https://data.sfgov.org/resource/wwmu-gmzc.json?$where=title like '%25${input}%25'&$limit=50`
    const call_api = await fetch(url);
	const data = await call_api.json();
	const titles = data.map(x=>x.title).filter((x,i,t)=>x!==t[i-1]);
		this.setState({
			titles:input.length?titles:[]
		})
	}
	
	autoCompFill = (e) =>{
		this.setState({
			inputValue: e.target.innerHTML
		})
	}

	inputChange = (e) =>{
		this.setState({
			inputValue: e.target.value
		})
		this.autoComp();
		this.props.lift(e.target.value)
	}

	render(){
		return(
      <div>
      <Header />
			<main>
				<form>
					<label htmlFor="searchInput"></label>
					<div className="inputs">
						<input onChange ={this.inputChange} value={this.state.inputValue} type="text" id="searchInput" autoComplete="off" placeholder="Search movie..."/>
						<NavLink to="/Results"> 
              				<input type="submit" value="Search"/>
            			</NavLink>
					</div>
					{this.state.titles.length > 0 &&
						<div className='autoCompRes'>
							{this.state.titles.map((title,i) => 
								<div
									className='autoCompLig'
									key={`autoComp-${i}`}
									onClick={this.autoCompFill}
								>{title}</div>
								) 
							}
						</div>
					}
				</form>
				<p className="intro">Discover where your favorites movies have been filmed around the world with Once Upon A Place. <br/>
 					You could be surprised to find one near from you</p>
			</main>
      </div>
		);
	}
}

export default Home;