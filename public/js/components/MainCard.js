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
			db.ref(window.userName + '/post_id').set(response.id);
			createjs.Sound.play("button");
			console.log(response);
		}.bind(this));
	}

	generateTBH() {
		db.ref(window.userName+'/post_id').once('value').then(function(response){

			this.setState({
				post_id: response.val()
			});

			FB.api('/' + this.state.post_id + '/likes', function(response) {
				console.log(response);

				db.ref(window.userName + '/likes').set(response.data.map( (user) => {
					return {...user, posted: false}
				}));

				alert("Use teh chrome extension!!!!!!!!!!!!!!!");
			}.bind(this));

		}.bind(this));
	}

	statusChange(e) {
		this.setState({
			post_status: e.target.value
		});
	}

	render() {
		return (
			<div id="main-card">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-4 col-md-offset-1">
							<h1>Welcome, {window.userName}</h1>
							<img src={this.props.picture_url} width='300' height='300' />
							<h2>Enter your TBH post: </h2>
							<textarea value={this.state.post_status} onChange={this.statusChange.bind(this)} rows="4" cols="50"></textarea>
							<div>
								<button onClick={this.postStatus.bind(this)}> Post Status </button>
								<button onClick={this.generateTBH.bind(this)}> Generate TBHs </button>
							</div>
						</div>

						<div class="col-md-6 col-md-offset-1">
							{(this.props.id)? <MessagesCard id={this.props.id}/>: <h1> No id recieved yet!</h1>}
						</div>
					</div>
				</div>
			</div>
		)
	}
}