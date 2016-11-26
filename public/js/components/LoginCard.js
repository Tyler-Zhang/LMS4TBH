import React from 'react'

export default class LoginCard extends React.Component{

	componentWillMount() {
		this.setState({
			loggedIn: false
		});
	}

	componentDidMount() {
	  window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '223294414545251',
	      cookie     : true,  // enable cookies to allow the server to access
	                        // the session
	      xfbml      : true,  // parse social plugins on this page
	      version    : 'v2.1' // use version 2.1
	    });

	    // Now that we've initialized the JavaScript SDK, we call
	    // FB.getLoginStatus().  This function gets the state of the
	    // person visiting this page and can return one of three states to
	    // the callback you provide.  They can be:
	    //
	    // 1. Logged into your app ('connected')
	    // 2. Logged into Facebook, but not your app ('not_authorized')
	    // 3. Not logged into Facebook and can't tell if they are logged into
	    //    your app or not.
	    //
	    // These three cases are handled in the callback function.
	    FB.getLoginStatus(function(response) {
	      this.statusChangeCallback(response);
	    }.bind(this));
	  }.bind(this);

	  // Load the SDK asynchronously
	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
	}


	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	testAPI() {
	  console.log('Welcome!  Fetching your information.... ');
	  FB.api('/me', function(response) {
	   	window.userName = response.name;
	   	this.createDBPost(response.name);
	    this.props.setAuth(response.name);
	  	console.log('Successful login for: ' + response.name);
	  }.bind(this));
	}

	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	  // The response object is returned with a status field that lets the
	  // app know the current login status of the person.
	  // Full docs on the response object can be found in the documentation
	  // for FB.getLoginStatus().
	  if (response.status === 'connected') {
	    // Logged into your app and Facebook.
	    this.testAPI();
	    this.setState({
	    	loggedIn: true
	    });
	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your app.
	    console.log('not not_authorized');
	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this app or not.
	    console.log('not logged into facebook');
	  }
	}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	checkLoginState() {
	  FB.getLoginStatus(function(response) {
	    this.statusChangeCallback(response);
	  }.bind(this));
	}

	createDBPost(name) {
		db.ref(name).set({
			index: 0,
			likes: []
		});
	}

	handleClick() {
	  FB.login(this.checkLoginState(), {scope: 'publish_actions'});
	}
	render() {
		return (
			<div>
			{this.state.loggedIn ? null : <div id="login-card"> 
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<h1>LMS 4 TBH</h1>
							<button onClick={this.handleClick.bind(this)}> Login to Facebook </button>
							<span id="status"></span>
							<p>post some brutally honest tbhs to ur friends' walls</p>
						</div>
					</div>
				</div>
			</div>}
			</div>
		);
	}
} 