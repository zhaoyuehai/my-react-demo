import React, { Component } from 'react';
import * as APIHelper from '../utils/APIHelper';
import './LoginForm.scss';
/**
 * 登录
 */
export default class RecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userName: "",
            password: "",
        }
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

    valid() {
        return !this.state.isLoading && this.state.userName && this.state.password;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isLoading: true });
        APIHelper
            .login(this.state.userName, this.state.password)
            .then(
                response => {
                    if (response.data.code === '10000') {
                        this.setState({
                            isLoading: false
                        });
                        this.props.handleLogin(response.data.data);
                    } else {
                        alert(response.data.message);
                        this.setState({
                            isLoading: false
                        });
                    }
                }
            ).catch(
                (error) => {
                    alert(error.message);
                    this.setState({
                        isLoading: false
                    });
                }
            );
    }

    render() {
        return (
            <form id="LoginForm" onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <input type="text" className="form-control mb-2" onChange={this.handleChange.bind(this)} placeholder="用户名/手机号" name="userName" value={this.state.userName} />
                </div>
                <div>
                    <input type="password" className="form-control mb-2" onChange={this.handleChange.bind(this)} placeholder="密码" name="password" value={this.state.password} />
                </div>
                <button id="LoginButton" type="submit" className="btn btn-primary" disabled={!this.valid()}>登录</button>
            </form>
        );
    }
}