import React, { Component } from 'react';
import './looks/posts.css'
import swal from 'sweetalert';
class Reply extends Component {

  constructor(props) {
    super(props)
    this.state = {sender:''}
  }

  postmessage = ()=>{swal(`Type your message to ${this.props.name} and click OK button`, {
                     content: "input",})
                     .then((value) => {this.props.sendermessage({value,sendername:this.props.sendername,sendersurname:this.props.sendersurname,receiverId:this.props.id,senderId:this.props.senderId})
                       //swal(`You typed: ${value}`);
                        });}

  render() {
    return (
      <div>
      <input  className='post' type='button' value='Reply' onClick={this.postmessage}/>
      {this.props.surname}
      </div>
    )
  }
}

export default Reply

