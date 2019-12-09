import React, { Component } from 'react';
import * as APIHelper from '../utils/APIHelper';
import * as ConstantUtil from '../utils/ConstantUtil'
/**
 * 单条用户表格数据，支持编辑操作
 */
class Record extends Component {
    constructor() {
        super();
        this.state = {
            edit: false
        };
    }

    handleToggle() {
        this.setState({
            edit: !this.state.edit
        })
    }
    handleEdit(event) {
        event.preventDefault();//取消事件的默认动作
        const record = {
            id: this.props.record.id,
            userName: this.props.record.userName,
            phone: this.refs.phone.value,
            email: this.refs.email.value,
            nickName: this.refs.nickName.value
        }
        APIHelper
            .updateUser(record)
            .then(
                response => {
                    if (response.data.code === "10000") {
                        this.setState({ edit: false })
                        this.props.handleEditRecord(this.props.record, record)
                    } else {
                        alert(response.data.message)
                        //刷新列表
                        this.props.handleRefresh()
                    }
                }
            );
    }

    handleDelete(event) {
        APIHelper
            .deleteUser(this.props.record.id)
            .then(
                response => {
                    if (response.data.code === "10000") {
                        this.props.handleDeleteRecord(this.props.record.id)
                    } else {
                        alert(response.data.message)
                        //刷新列表
                        this.props.handleRefresh()
                    }
                }
            );
    }

    recordRow() {
        return (
            <tr key={this.props.record.id}>
                <td>{this.props.record.userName}</td>
                <td>{this.props.record.phone}</td>
                <td>{this.props.record.email}</td>
                <td>{this.props.record.nickName}</td>
                <td>{ConstantUtil.getRole(this.props.record.roleName)}</td>
                <td>
                    <button className="btn btn-info mr-2" onClick={this.handleToggle.bind(this)}>编辑</button>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>删除</button>
                </td>
            </tr>
        );
    }

    recordForm() {
        return (
            <tr>
                <td>{this.props.record.userName}</td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.phone} ref="phone"></input></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.email} ref="email"></input></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.nickName} ref="nickName"></input></td>
                <td>{ConstantUtil.getRole(this.props.record.roleName)}</td>
                <td>
                    <button className="btn btn-info mr-2" onClick={this.handleEdit.bind(this)}>更新</button>
                    <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>取消</button>
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.edit) {
            return this.recordForm();
        } else {
            return this.recordRow();
        }
    }
}

export default Record;