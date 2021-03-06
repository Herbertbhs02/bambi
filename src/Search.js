import React, { Component } from 'react';
import './looks/Search.css'

class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {name:'',surname:'', message:''}
                       }
    
    
    
     message = (e)=>{this.setState({message:e.target.value})}

    //search regitered people
     search = (e)=>{ 
                    this.props.search({surname:e.target.value});
                    this.setState({surname:e.target.value})
                    }  

     

            //View messages sent to you by the registered user                        
          view = ()=>{ this.props.view({receiverId:this.props.receiverId})
                     }

      //Updating your personal message/Status             
    changeMessage = (e)=>{e.preventDefault();
                    this.props.messageUpdate(this.state);                                      
                          }               

            
    render() {
      
            const fname = this.props.table.loginName === '' ? 'Loading': this.props.table.loginName
        return (
            <div>
               {this.props.table.post}

              <h4>Welcome<span className='loginName'> {fname}</span>. Please enter a surname to search.</h4>
              <input type='text' className='searchInput' name='surname' value={this.state.surname} placeholder='Type surname' onChange={this.search}/><br/>

              <form onSubmit={this.changeMessage}>
                  <h4>Update your message</h4>
                  <textarea className='update' rows="3" cols="50" name='message' value={this.state.message} placeholder="Leave/update your personal message/status" onChange={this.message}></textarea>
                  <button>Update</button>
              </form>

              <hr/>
              <button style={{width:'230px',margin:'auto'}} onClick={this.view}>View Your Messages</button>
              {this.props.table.name}
            </div>
        );
    }
}

export default Search;