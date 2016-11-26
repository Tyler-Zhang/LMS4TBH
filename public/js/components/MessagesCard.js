import React from 'react'

class Message extends React.Component{
    
    render(){
        return(
            <li class="row" style={{margin:"10px"}}>
                <div class="col-md-10 col-md-offset-1" style={{borderStyle:"solid", padding:"10px"}}> 
                    <div class="col-md-2">
                        <img class="center-block" src="img/tempprofile.png"/>
                        <p class="text-center">{this.props.name}</p>
                    </div>
                    <div class="col-md-7 col-md-offset-1">
                        <p class="text-center" style={{margin:"10px", fontSize:"15px"}}> {this.props.message} </p>
                    </div>
                    <div class="col-md-1 col-md-offset-1">
                        <ul class="verticle-center" style={{listStyle:"none", paddingLeft:"0"}}>
                            <li> <button class="btn btn-success btn-block" onClick={() => this.props.post()}> <i class="fa fa-check"/> </button> </li>
                            <li> <button class="btn btn-danger btn-block" onClick={() => this.props.cancel()}> <i class="fa fa-times"/> </button></li>
                        </ul>
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
            <div class="container">
                <h3 class="text-center row" style={{marginBottom:"50px"}}> Messages For Approval</h3>
                <div class="row" style={{overflow:"scroll", height:"500px"}}>
                    <ul style={{"listStyle": "none"}}>
                        {
                            this.state.messages.map((v, i) =>  <Message name={v.name} message={v.tbh} key={i} post={() => this.post(i)} cancel={() => this.cancel(i)}/>)
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