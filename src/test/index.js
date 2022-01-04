/*
 * @Author: KiraZz1
 * @Date: 2022-01-02 13:08:51
 * @LastEditTime: 2022-01-04 15:09:21
 * @LastEditors: Please set LastEditors
 * @Description: 掘金签到脚本-测试用例
 * @FilePath: \juejin\src\test\index.js
 */

import {
    emailTo
} from '../utils/email.js';

import {
    config
} from '../config/config.js';

import dayjs from 'dayjs';

import { ejsComplier} from '../utils/ejs_complier.js'

import axios from 'axios';


const {
    userName,
    cookie,
    mail: {
        smtp,
        mailFrom,
        mailTo,
        mailPwd
    }

} = config;


/**从config.js中读取smtp配置 */
const smtpConfig = {
    host: smtp,
    port: 465,
    auth: {
        user: mailFrom,
        pass: mailPwd //授权码,通过QQ获取

    }
};

/**从config.js中读取发送方，接收方，标题昵称 */
const mailOptions = {
    from: mailFrom, // 发送者
    to: mailTo, // 接受者,可以同时发送多个,以逗号隔开
    subject: `${userName}的掘金自动签到小助手`, // 标题
};

/**
 * 测试邮件发送功能
 */
const testEmailSendText = () => {
    emailTo(smtpConfig, mailOptions, 'text', `HelloWorld！！！`);
}

/**
 * 测试邮件发送html
 */
 const testEmailSendHtml = async () => {
    const template = await ejsComplier('/src/template/success.ejs',{
        userName:"Kira",
        date: new Date().toLocaleString(),
    });
    emailTo(smtpConfig, mailOptions, 'html', template);
}

/**
 *  测试当前时间格式化 
 */
const testCurrentTimeFormat = () => {
    console.log(dayjs(new Date()).locale('zh-cn').format('YYYY年MM月DD日 HH:mm:ss'))
}


/**
 *  测试查询免费抽奖次数
 */
 const testCheckFreeDraw = () => {
     // 查询今日是否有免费抽奖机会
     const today = axios.request('https://api.juejin.cn/growth_api/v1/lottery_config/get', {
        headers: {
          cookie: cookie
        },
        method: 'GET',
        credentials: 'include'
    }).then((res) => {
          let { data } = res
          let { data : { free_count }} = data
          console.log(free_count)
    });
  

}

testDraw()
