import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: [],
    queryParam: ''
  }

  setUsersList(usersList) {
    this.setState({
      users: usersList,
    })
  }

  setQueryParam({ value }) {
    this.setState({
      queryParam: value
    })
  }

  fetchUsersList(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setUsersList(data));
  }

  getFilteredUsersByName() {
    return this.state.users.filter(user => user.name.toLowerCase().includes(this.state.queryParam.toLowerCase()) && this.state.queryParam !== '')
  }

  componentDidMount() {
    this.fetchUsersList('https://jsonplaceholder.typicode.com/users');
  }

  render() {
    return (
      <div className="App">
        <h1>Users list</h1>
        <input type="text" onChange={(e) => this.setQueryParam(e.target)} placeholder="Search by user name" />
        {this.getFilteredUsersByName().map((user, index) => (<div key={user.id}><span className="user-id">{index + 1}.</span> {user.name} <span className="username">@{user.username}</span></div>))}
      </div>
    );
  }
}

export default App;
