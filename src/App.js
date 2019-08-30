import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Records from './components/Records';
import './App.scss';
import * as ConstantUtil from './utils/ConstantUtil';
import * as APIHelper from './utils/APIHelper';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: this.isLogin() ? 0 : 1, //0:主页 1：登录 2：注册 3：找回密码 
      isSetIP: false,
      baseUrl: APIHelper.baseUrl
    }
  }

  isLogin() {
    return localStorage.getItem('Authorization') != null;
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

  handleChange(event) {
    let name;//定义局部变量
    name = event.target.name;//name的值就算input name的值
    let obj;//定义局部变量
    //this.setState((obj = {}, obj["" + name] = event.target.value, obj));//以上内容等同于下面：
    obj = {};
    obj["" + name] = event.target.value;
    this.setState(obj);
  }

  handleToggleSetting() {
    this.setState({
      isSetIP: !this.state.isSetIP
    });
  }

  handleSetBaseURL() {
    APIHelper.setBaseURL(this.state.baseUrl);
    if (this.state.pageType === 0) {
      this.signOut();
    }
    this.handleToggleSetting();
  }

  validBaseUrl() {
    return this.state.baseUrl.length > 9 && (this.state.baseUrl.startsWith("http://") || this.state.baseUrl.startsWith("https://"));
  }

  render() {
    let appComponent;
    switch (this.state.pageType) {//0:  2： 3：找回密码 
      case 1://登录
        appComponent = <div>
          <LoginForm handleLogin={this.login.bind(this)} handleRegister={this.registerType.bind(this)} />
        </div>;
        break;
      case 2://注册
        appComponent = <div>
          <RegisterForm handleRegister={this.registerType.bind(this)} handleLogin={this.loginType.bind(this)} />
        </div>;
        break;
      default://主页
        appComponent = <div>
          <Records />
        </div>;
        break;
    }
    let topUserComponent;
    if (this.isLogin()) {
      topUserComponent = <h6>
        <span id="roleName"> {localStorage.getItem('RoleName')} </span>
        hello,{localStorage.getItem('UserName')}!
      <button className="btn btn-danger ml-2" onClick={this.signOut.bind(this)}> 退出登录</button>
      </h6>;
    } else {
      topUserComponent = "";
    }

    let topSetComponet;
    if (this.state.isSetIP) {
      topSetComponet = <span>
        输入服务器地址：<input type="text" className="mr-2" onChange={this.handleChange.bind(this)} name="baseUrl" value={this.state.baseUrl} />
        <button className="btn btn-info mr-2" onClick={this.handleSetBaseURL.bind(this)} disabled={!this.validBaseUrl()}>确定</button>
        <button className="btn btn-danger" onClick={this.handleToggleSetting.bind(this)}>取消</button>
      </span>
    } else {
      topSetComponet = <h6>
        当前服务器地址：{this.state.baseUrl}
        <button className="btn btn-info ml-2 mr-2" onClick={this.handleToggleSetting.bind(this)}> 设置</button>
      </h6>
    }

    return (<div>
      <div style={{ height: "40px", padding: "10px" }}>
        <div className="floatL">
          {topSetComponet}
        </div>
        <div className="floatR">
          {topUserComponent}
        </div>
      </div>
      <hr />
      {appComponent}
    </div >)
  }
}

export default App;
