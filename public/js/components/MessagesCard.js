import React from 'react'

class Message extends React.Component{
    
    render(){
        return(
            <li class="row" style={{margin:"10px"}}>
                <div class="col-md-10 col-md-offset-1" style={{borderStyle:"solid", padding:"10px"}}> 
                    <div class="col-md-1">
                        <img src="img/tempprofile.png"/>
                        <p class="text-center">{this.props.name}</p>
                    </div>
                    <div class="col-md-8 col-md-offset-1">
                        <p class="text-center" style={{margin:"10px"}}> {this.props.message} </p>
                    </div>
                    <div class="col-md-1 col-md-offset-1">
                        <ul style={{listStyle:"none", width:"100%", paddingLeft:"0", verticalAlign:"middle"}}>
                            <li> <button class="btn btn-success btn-block"> <i class="fa fa-check"/> </button> </li>
                            <li> <button class="btn btn-danger btn-block"> <i class="fa fa-times"/> </button></li>
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
        this.state={
            messages: null,
            userRef: db.ref(props.id + "/")
        };
        this.state.userRef.on('child_changed', (d) => this.processData(d));
    }

    processData(d){
        console.log(d);
        const messageData = d.likes.filter(v => v.tbh && !v.posted);

        const state = this.state;
        state.messages = messageData;
        
        this.setState(state);
    }

    post(idx){
        console.log("post " + idx);

        let user = this.state.messages[idx];

        FB.api(
            `/${user.Id}/feed`,
            "POST",
            {
                "message": user.tbh
            },
            function (response) {
                if (response && !response.error) {
                    markAsPosted(idx);
                }
            }
        );
    }

    remove(idx){
        console.log("remove " + idx);
        markAsPosted(idx);
    }

    markAsPosted(idx) {
        var removeUserName = this.state.messages[idx].name;
        
        this.state.userRef.once('value').then(v => {
            console.log("firebase data");
            console.log(v);
        })

        console.log("marked as posted " + idx);
    }

    render(){
        if(!this.state.messages)
            return (<h1>No messages to post yet!</h1>);

        return(
            <div>
                <h3 class="text-center" style={{marginBottom:"50px"}}> Messages For Approval</h3>
                <div style={{overflow:"scroll", height:"500px"}}>
                    <ul style={{"listStyle": "none"}}>
                        {
                            this.state.messages.map((v, i) =>  <Message name={v.name} message={v.tbh} key={i} post={(idx) => this.post(idx)} remove={(idx) => this.remove(idx)}/>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}