import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {name:'Herb'}
      
    }
    
    change = (e)=>{this.setState({name:e.target.value})}

    search = (e)=>{e.preventDefault();
                this.props.search(this.state);
                this.setState({
                               
                              })   
                                                          
                   }

    render() {
        return (
            <div>
              <form onSubmit={this.search}>
              <h4>Enter the name below</h4>
              <input type='text' name='name' value={this.state.name} placeholder='Type name' onChange={this.change} /><br/>
              <button>Search</button>
              </form>
            </div>
        );
    }
}

export default Search;