import React from 'react';
import MessagesCard from './MessagesCard';

export default class MainCard extends React.Component {

	componentWillMount() {

		this.setState({
			post_status: "",
			post_id: null
		});
	}

	postStatus() {
		FB.api('/me/feed', 'post', {message: this.state.post_status || "LMS 4 TBH!!! (test post please ignore)"}, function(response) {
			this.setState({
				post_id: response.id,
				post_status: ""
			});
			console.log(response);
		}.bind(this));
	}

	generateTBH() {
		FB.api('/' + this.state.post_id + '/likes', function(response) {
			console.log(response);
			db.ref(window.userName + '/likes').set(response.data.map( (user) => {
				return {...user, posted: false}
			}));
		}.bind(this));
	}

	statusChange(e) {
		this.setState({
			post_status: e.target.value
		});
	}

	render() {
		return (
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-3 col-md-offset-1">
						<p>Enter your TBH post: </p>
						<textarea value={this.state.post_status} onChange={this.statusChange.bind(this)}></textarea>
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