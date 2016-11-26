import React from 'react';
import ReactDOM from 'react-dom';
import LoginCard from './components/LoginCard';
import MainCard from './components/MainCard';


const app = document.getElementById('app');

ReactDOM.render(
	<div>
		<LoginCard />
		<MainCard />
	</div>,
app
)