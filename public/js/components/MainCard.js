import React from 'react';
import MessagesCard from './MessagesCard';

export default class MainCard extends React.Component {
	
	render() {
		return (
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-3 col-md-offset-1">
						<h1> Post status button here </h1>
					</div>

					<div class="col-md-7 col-md-offset-1">
						{(this.props.id)? <MessagesCard id={this.props.id}/>: <h1> No id recieved yet!</h1>}
					</div>
				</div>
			</div>
		)
	}
}