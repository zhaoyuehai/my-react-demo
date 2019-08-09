import axios from 'axios';
import Base64 from 'base-64';
import qs from 'qs';//使用qs将axios发送的数据格式转换为form-data格式（在安装axios时，默认就安装了）

const api = process.env.REACT_APP_RECPRDS_API_URL || 'http://10.10.33.105';

//请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = localStorage.getItem('Authorization');
    return config;
  },
  error => {// 对请求错误做些什么
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('UserName');
        localStorage.removeItem('RoleName');
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export const login = (username, password) =>
  axios.post(`${api}/api/v1/login`,
    qs.stringify({ username: username, password: Base64.encode(password) }), //password->Base64进行编码
    { headers: { 'Content-type': 'application/x-www-form-urlencoded', 'Authorization': null } }
  )

export const getAllUser = (pageNum, pageSize) =>
  axios.get(`${api}/api/v1/users?pageNum=${pageNum}&pageSize=${pageSize}`)


export const registerUser = (body) =>
  axios.post(`${api}/api/v1/user`, body, { headers: { 'Authorization': null } })

export const updateUser = (body) =>
  axios.put(`${api}/api/v1/user`, body)

export const deleteUser = (id) =>
  axios.delete(`${api}/api/v1/user/${id}`)

// var url = 'http://localhost/api/v1/users?pageNum=1&pageSize=20';
// import $ from 'jquery';
// jQuery请求
        // $.getJSON(RecordsApI.api + '/api/v1/users',
        //     {
        //         pageNum: 1,
        //         pageSize: 20
        //     })
        //     .then(
        //         response => this.setState({
        //             data: response.data,
        //             isLoaded: true
        //         }),
        //         error => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             })
        //         }
        //     )

        // $.getJSON(url)
        //     .then(
        //         response => this.setState({
        //             data: response.data,
        //             isLoaded: true
        //         }),
        //         error => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             })
        //         }
        //     )

        // fetch请求
        // fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8'
        //     },
        //     mode: 'cors',
        //     cache: 'default'
        // })
        //     .then(res => res.json())
        //     .then((data) => {
        //         console.log(data)
        //     })


// let token = '';
// axios.defaults.headers.common['token'] = token;
// axios.defaults.headers.post['Content-Type'] = 'application/json;chartset=UTF-8';
// axios.interceptors.request.use(function (config) {
//   let user = JSON.parse(window.sessionStorage.getItem('AuthorizationData'));
//   if (user) {
//     token = user.token;
//   }
//   config.headers.common['token']
// });
