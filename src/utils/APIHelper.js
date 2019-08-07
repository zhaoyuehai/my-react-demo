import axios from 'axios';

const api = process.env.REACT_APP_RECPRDS_API_URL || 'http://localhost';

// axios方式

export const getAllUser = (pageNum, pageSize) =>
  axios.get(`${api}/api/v1/users?pageNum=${pageNum}&pageSize=${pageSize}`)

export const registerUser = (body) =>
  axios.post(`${api}/api/v1/user`, body)

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
