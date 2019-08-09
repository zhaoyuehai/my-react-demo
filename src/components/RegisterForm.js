import React, { Component } from 'react';
import Base64 from 'base-64';
import * as APIHelper from '../utils/APIHelper';
import * as ConstantUtils from '../utils/ConstantUtil';
import './RegisterForm.scss'
/**
 * 注册用户表单
 */
export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userName: "",
            password: "",
            phone: ""
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
        return !this.state.isLoading && this.state.userName && this.state.password && this.state.phone;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isLoading: true });
        const data = {
            id: null,
            userName: this.state.userName,
            password: Base64.encode(this.state.password),//password->Base64进行编码
            phone: this.state.phone,
            roleName: ConstantUtils.defaultRole
        };
        APIHelper.registerUser(data).then(
            response => {
                if (response.data.code === '10000') {
                    data.id = response.data.data;
                    this.props.handleNewRecord(data);
                    this.setState({
                        isLoading: false,
                        userName: "",
                        password: "",
                        phone: ""
                    });
                } else {
                    alert(response.data.message);
                    this.setState({ isLoading: false });
                }
            }
        ).catch(
            error => {
                alert(error.message);
                this.setState({ isLoading: false });
            }
        );
    }

    render() {
        return (
            <form className="form-inline mt-3 mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="用户名" name="userName" value={this.state.userName} />
                </div>
                <div className="form-group mr-2">
                    <input type="password" className="form-control" onChange={this.handleChange.bind(this)} placeholder="密码" name="password" value={this.state.password} />
                </div>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="手机号" name="phone" value={this.state.phone} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>注册</button>
            </form>
        );
    }
}