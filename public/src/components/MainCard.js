import React from 'react';
import MessagesCard from './MessagesCard';

var testMessageObj = 
[
	{name: "tyler", message: "FUCK YOU BIG BOY"},
	{name: "Charlie", message: "FUCK YOU BIG BOY"},
	{name: "Kevin", message: "FUCK YOU BIG BOY"},
	{name: "Ayy", message: "FUCK YOU BIG BOY"},
	{name: "tyler", message: "FUCK YOU BIG BOY"},
	{name: "Charlie", message: "FUCK YOU BIG BOY"},
	{name: "Kevin", message: "FUCK YOU BIG BOY"},
	{name: "Ayy", message: "FUCK YOU BIG BOY"}
]

export default class MainCard extends React.Component {
	render() {
		return (
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-3 col-md-offset-1">
						<h1> Post status button here </h1>
					</div>

					<div class="col-md-7 col-md-offset-1">
						<MessagesCard data={testMessageObj}/>
					</div>
				</div>
			</div>
		)
	}

}