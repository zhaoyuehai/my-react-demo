import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Records from './components/Records';
import './App.scss';
import * as ConstantUtil from './utils/ConstantUtil'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: localStorage.getItem('Authorization') != null ? 0 : 1 //0:主页 1：登录 2：注册 3：找回密码 
    }
  }

  login(user) {
    localStorage.setItem('Authorization', 'Bearer ' + user.accessToken);
    localStorage.setItem('UserName', user.userName);
    localStorage.setItem('RoleName', ConstantUtil.getRole(user.roleName));
    this.mainType();
  }

  signOut() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('UserName');
    localStorage.removeItem('RoleName');
    this.loginType();
  }

  mainType() {
    this.setState({
      pageType: 0
    });
  }

  loginType() {
    this.setState({
      pageType: 1
    });
  }

  registerType() {
    this.setState({
      pageType: 2
    });
  }

  findPwdType() {
    this.setState({
      pageType: 3
    });
  }

  render() {
    switch (this.state.pageType) {//0:  2： 3：找回密码 
      case 1://登录
        return <div>
          <LoginForm handleLogin={this.login.bind(this)} handleRegister={this.registerType.bind(this)} />
        </div>;
      case 2://注册
        return <div>
          <RegisterForm handleRegister={this.registerType.bind(this)} handleLogin={this.loginType.bind(this)} />
        </div>;
      default://主页
        return <div>
          <Records handleSignOut={this.signOut.bind(this)} />
        </div>;
    }
  }
}

export default App;
