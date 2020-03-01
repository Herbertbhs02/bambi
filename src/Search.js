import React, { Component } from 'react';
import './looks/Search.css'

class Search extends Component {
    constructor(props) {
      super(props)
      this.state = {name:''}
      
    }
    
    change = (e)=>{this.setState({name:e.target.value})}

    search = (e)=>{e.preventDefault();
                this.props.search(this.state);
                this.setState({
                               
                              })   
                                                          
                   }

    render() {
        return (
            <div >
              <form onSubmit={this.search}>
              <h4>Enter the name below</h4>
              <input type='text' name='name' value={this.state.name} placeholder='Type name' onChange={this.change} /><br/>
              <button>Search</button>
              </form>
              <hr/>
                <h4 >Search results below</h4>
              <table border='1' className='search'>
              <thead>
                  <tr>
                  <th>FirstName</th>
                  <th>SirName</th>
                  <th>Email</th>
                  </tr>
              </thead>
               <tbody>
                <tr>
                  <td>{this.props.table.name}</td>
                  <td>{this.props.table.sirname}</td>
                  <td>{this.props.table.email}</td>
                </tr>
               </tbody>  
             </table>
            </div>
        );
    }
}

export default Search;