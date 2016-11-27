import React from 'react'

class Message extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            imgUrl: "img/tempprofile.png"
        }

        FB.api('/' + props.id + '/picture', {width: 80, height: 80}, function(response) {
            const state = this.state;
            state.imgUrl = response.data.url;
            this.setState(state);

	    }.bind(this));        
    }


    render(){
        return(
            <li style={{margin:"10px"}}>
                <div class="row messageRow" style={{borderStyle:"solid", padding:"10px"}}> 
                    <div class="col-md-2">
                        <img class="center-block" src={this.state.imgUrl}/>
                    </div>
                    <div class="col-md-6 col-md-offset-1">
                        <h4 class="text-center">{this.props.name}</h4>
                        <p class="text-center" style={{fontSize:"15px"}}> {this.props.message} </p>
                    </div>
                    <div class="col-md-2 col-md-offset-1">
                        <button class="btn btn-success btn-block" onClick={() => this.props.post()}> <i class="fa fa-check"/> </button> 
                        <button class="btn btn-danger btn-block" onClick={() => this.props.cancel()}> <i class="fa fa-times"/> </button>
                    </div>
                </div>
            </li>
        )
    }
}


export default class MessagesCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            messages: null,
            userRef: db.ref("/" + props.id)
        };

        this.state.userRef.on('child_changed', (d) => this.processData(d));
    }

    processData(d){
        if(typeof d === 'number')
            return
        
        const messageData = d.val().filter(v => v.tbh && !v.posted);
        const state = this.state;
        state.messages = messageData;

        this.setState(state);
    }

    post(idx){
        console.log("post " + idx);

        let user = this.state.messages[idx];

        FB.api(
            `/me/feed`,
            "POST",
            {
                message: user.tbh,
                place: [1783660745233929],
                tags: [user.id]
            }, ((response) => {
                if (response && !response.error) {
                    this.markAsPosted(idx);
                } else {
                    console.log("response error");
                }
            }).bind(this)
        );
    }

    cancel(idx){
        this.markAsPosted(idx);
    }

    markAsPosted(idx) {
        var removeUserName = this.state.messages[idx].name;
        
        this.state.userRef.once('value').then(v => {
            let data = v.val().likes;
            let firebaseIdx = data.findIndex(d => d.name === removeUserName);
            this.state.userRef.child(`/likes/${firebaseIdx}/posted`).set(true);           
        })
    }


    render(){
        if(!this.state.messages)
            return (<h1>No messages to post yet!</h1>);

        return(
            <div class="container-fluid">
                <h3 class="text-center row" style={{marginBottom:"50px"}}> Messages For Approval</h3>
                <div class="row" style={{overflowY:"auto", overflowX:"visible", height:"500px"}}>
                    <ul style={{"listStyle": "none"}}>
                        {
                            this.state.messages.map((v, i) =>  
                            <Message name={v.name} message={v.tbh} id={v.id} key={v.id} post={() => this.post(i)} cancel={() => this.cancel(i)}/>)
                        }
                    </ul>
                </div>
                <div class="row">
                    <button class="btn btn-success center-block" onClick={() => this.post(Math.floor(Math.random() * this.state.messages.length))}> IM FEELING LUCKY BITCHES </button>
                </div>
            </div>
        )
    }
}