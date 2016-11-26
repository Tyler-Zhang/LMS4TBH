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

    render(){
        if(!this.props.data)
            return (
                <h1 class="text-center"> No messages to display yet </h1>
            )
        
        return(
            <div>
                <h3 class="text-center" style={{marginBottom:"50px"}}> Messages For Approval</h3>
                <div style={{overflow:"scroll", height:"500px"}}>
                    <ul style={{"listStyle": "none"}}>
                        {
                            this.props.data.map((v, i) =>  <Message name={v.name} message={v.message} key={i}/>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}