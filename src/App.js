import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Records from './components/Records';
import './App.scss';
import * as ConstantUtil from './utils/ConstantUtil'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem('Authorization') != null
    }
  } 

  login(user) {
    localStorage.setItem('Authorization', 'Bearer ' + user.accessToken);
    localStorage.setItem('UserName', user.userName);
    localStorage.setItem('RoleName', ConstantUtil.getRole(user.roleName));
    this.setState({
      isLogin: true
    })
  }

  signOut() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('UserName');
    localStorage.removeItem('RoleName');
    this.setState({
      isLogin: false
    })
  }

  render() {
    if (this.state.isLogin) {
      return (
        <div>
          <Records handleSignOut={this.signOut.bind(this)} />
        </div>
      );
    } else {
      return (
        <div>
          <LoginForm handleLogin={this.login.bind(this)} />
        </div>
      );
    }
  }
}

export default App;
