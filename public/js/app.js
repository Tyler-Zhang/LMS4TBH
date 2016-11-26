import React from 'react';
import ReactDOM from 'react-dom';
import LoginCard from './components/LoginCard';
import MainCard from './components/MainCard';


const app = document.getElementById('app');

class App extends React.Component {

	constructor(){
		super();

		this.state = {
			id: null
		}
	}

	setAuth(id){
		const state = this.state;

		state.id = id;
		this.setState(state);
	}

	render(){
		return (
			<div>
				<LoginCard setAuth={(id) => this.setAuth(id)}/>
				<MainCard id={this.state.id}/>
			</div>
		)
	}

}

ReactDOM.render(<App/>, app);