import React from 'react'

export default class LoginCard extends React.Component{

	loginHandler() {
		alert('login');
	}

	render() {
		return (
			<div> 
				<h1>LMS 4 TBH</h1>
				<button onClick={this.loginHandler}> Login </button>
				<p>post some brutally honest tbhs to ur friends' walls</p>
			</div>
		);
	}
} 