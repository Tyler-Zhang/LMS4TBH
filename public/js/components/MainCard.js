import React from 'react';
import MessagesCard from './MessagesCard';

export default class MainCard extends React.Component {

	postStatus() {
		FB.api('/me/feed', 'post', {message: 'LMS4TBH (test post please ignore)'}, function(response) {
			this.state = {
				post_id: response.id
			}
		}.bind(this));
	}

	generateTBH() {
		FB.api('/' + this.state.post_id + '/likes', function(response) {
			console.log(response);
		}.bind(this));
	}

	render() {
		return (
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-3 col-md-offset-1">
						<button onClick={this.postStatus.bind(this)}> Post Status </button>
						<button onClick={this.generateTBH.bind(this)}> Generate TBHs </button>
					</div>

					<div class="col-md-7 col-md-offset-1">
						{(this.props.id)? <MessagesCard id={this.props.id}/>: <h1> No id recieved yet!</h1>}
					</div>
				</div>
			</div>
		)
	}
}