import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

Vue.prototype.$http = axios;

/*
 * 根据环境变量区分接口的默认地址
 */
switch (process.env.NODE_ENV) {
    case 'production':
        axios.defaults.baseURL = 'http://gongyu.igugua.com/gongyu-api/';
        break;
    case 'test':
        axios.defaults.baseURL = 'http://gongyu.igugua.com/gongyu-api/';
        break;
    default:
        axios.defaults.baseURL = 'http://gongyu.igugua.com/gongyu-api/';
}

/*
 *设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

/*
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data);

/*
 * 设置请求拦截器
 * 客户端发送请求 - > [请求拦截器] - > 服务器
 * TOKEN校验（JWT）：接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
 */
axios.interceptors.request.use(config => {
    // 携带上token
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    return Promise.reject(error);
});

/*
 * 响应拦截器
 * 服务器返回信息  -> [拦截的统一处理] -> 客户端JS获取到信息
 */
axios.interceptors.response.use(response => {
    // 只返回响应主体中的信息（可以进一步完善，例如指定服务器返回的CODE值来指定成功或失败）
    return response.data;
}, error => {
    let {
        response
    } = error;
    if (response) {
        //= >请求已发出，只不过状态码不是200系列,设置不同状态码的不同处理
        switch (response.status) {
            case 401: //= >当前请求需要用户验证（一般是未登录）
                // 跳转到登录页
                break;
            case 403: //= >服务器已经理解请求,但拒绝执行（一般是token过期）;
                localStorage.removeItem('token');
                // 跳转到登录页
                break;
            case 404: //= >请求失败,找不到页面
                break;
        }
    } else {
        //= >服务器连结果都没有返回
        if (!window.navigator.onLine) {
            // 断网处理：可以跳转到断网页面
            return;
        }
        return Promise.reject(error);
    }
});
export default axios;
