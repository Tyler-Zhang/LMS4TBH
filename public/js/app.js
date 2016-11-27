import React from 'react';
import ReactDOM from 'react-dom';
import LoginCard from './components/LoginCard';
import MainCard from './components/MainCard';


const app = document.getElementById('app');

class App extends React.Component {

	constructor(){
		super();

		this.state = {
			id: null,
			picture_url: null
		}
	}

	setAuth(id){
		const state = this.state;

		state.id = id;
		this.setState(state);
		createjs.Sound.play("intro");
	}

	render(){
		return (
			<div>
				<LoginCard setAuth={(id) => this.setAuth(id)} setPicture={(pic) => this.setState({picture_url: pic})}/>
				<MainCard picture_url={this.state.picture_url} id={this.state.id}/>
			</div>
		)
	}

}

ReactDOM.render(<App/>, app);