import React, { Component } from 'react';
import Record from './Record';
import AddRecordForm from './AddRecordForm';
import * as APIHelper from '../utils/APIHelper'
import './Records.scss';
/**
 * 用户列表
 */
class Records extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            code: null,
            message: null,
            data: []
        }
    }
    // 组件生命周期： 组件渲染后调用
    componentDidMount() {
        APIHelper
            .getAllUser(1, 20)
            .then(
                response => {
                    this.setState({
                        code: response.data.code,
                        message: response.data.message,
                        data: response.data.data,
                        isLoaded: true
                    })
                }
            )
            .catch(
                error => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    })
                }
            );
    }

    addRecord(record) {
        if (this.state.code === "10000") {
            this.setState({
                error: null,
                isLoaded: true,
                code: "10000",
                message: "success",
                data: [
                    ...this.state.data,
                    record
                ]
            });
        }
    }

    updateRecord(record, newRecord) {
        const recordIndex = this.state.data.indexOf(record);
        const newData = this.state.data.map((item, index) => {
            if (index !== recordIndex) {
                return item;
            }
            return {
                ...item,
                ...newRecord
            };
        });
        this.setState({
            data: newData
        });
    }

    deleteRecord(id) {
        const newData = this.state.data.filter((item) => item.id !== id);
        this.setState({
            data: newData
        });
    }

    render() {
        const { error, isLoaded, code, message, data } = this.state;
        let recordsComponent;
        if (error) {
            recordsComponent = <div>Error:{error.message}</div>;
        } else if (!isLoaded) {
            recordsComponent = <div>Loading...</div>;
        } else if (code === '10000') {
            recordsComponent = <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>手机号</th>
                        <th>邮箱</th>
                        <th>昵称</th>
                        <th>角色</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((record) =>
                        <Record key={record.id} record={record}
                            handleEditRecord={this.updateRecord.bind(this)}
                            handleDeleteRecord={this.deleteRecord.bind(this)} />
                    )
                    }
                </tbody>
            </table>;
        } else {
            recordsComponent = <div>加载失败：{message}</div>;
        }
        return (
            <div>
                <h4>新增用户</h4>
                <AddRecordForm handleNewRecord={this.addRecord.bind(this)} />
                <h4>用户列表</h4>
                {recordsComponent}
            </div>
        );
    }
}

export default Records;