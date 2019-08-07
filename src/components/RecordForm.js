import React, { Component } from 'react';
import * as APIHelper from '../utils/APIHelper'

export default class RecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            phone: "",
            email: ""
        }
    }

    handleChange(event) {
        let name, obj;
        name = event.target.name;//name的值就算input name的值
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ));

    }

    valid() {
        return this.state.userName && this.state.password && this.state.phone && this.state.email
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            userName: this.state.userName,
            password: this.state.password,
            phone: this.state.phone,
            email: this.state.email
        }
        APIHelper.registerUser(data).then(
            response => {
                if (response.data.code === '10000') {
                    this.props.handleNewRecord(data)
                    this.setState({
                        userName: "",
                        password: "",
                        phone: "",
                        email: ""
                    })
                } else {
                    alert(response.data.message)
                }
            }
        ).catch(
            error => alert(error.message)
        )
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
                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="邮箱" name="email" value={this.state.email} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>注册</button>
            </form>
        );
    }
}