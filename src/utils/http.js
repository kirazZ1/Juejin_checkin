import axios from 'axios'

import { config } from '../config/config.js';

const {
    baseUrl,
    cookie
} = config;

axios.defaults.baseURL = baseUrl;  //默认设置为本地中间接口地址

axios.defaults.headers.common['cookie'] = cookie;   //注入cookie

axios.defaults.headers.common['credentials'] = 'include'; 

/**
 * request方法(因为脚本不需要传额外的数据过去，所以就不设计数据处理部分)
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function request(url, method){ 
    return new Promise((resolve, reject) =>{ 
        axios.request(url, {  
            method: method,
        }).then(res => {
            resolve(res)
        }).catch(err =>{
            reject(err) 
        }) 
    });
}



