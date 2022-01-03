/*
 * @Author: KiraZz1
 * @Date: 2022-01-01 10:59:47
 * @LastEditTime: 2022-01-03 09:21:35
 * @LastEditors: Please set LastEditors
 * @Description: 掘金签到脚本-主文件
 * @FilePath:juejin\src\index.js
 */
import axios from 'axios';

import {
    config
} from './config/config.js';

import schedule from 'node-schedule';

import dayjs from 'dayjs';

import {
    emailTo
} from './utils/email.js'


import {
    ejsComplier
} from './utils/ejs_complier.js'

const {
    userName,
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
 * 签到逻辑check_in
 * @param {*} config 
 * @returns 
 */
const check_in = async (config) => {
    const {
        baseUrl,
        apiUrl,
        cookie
    } = config;
    const {
        data: today_status
    } = await axios({
        method: 'get',
        url: 'https://api.juejin.cn/growth_api/v1/get_today_status',
        headers: {
            cookie: cookie
        },
        credentials: 'include'
    }); //获取当天签到状态，若已签到不做操作，若未签到则进行签到
    if (today_status.err_no !== 0)
        return emailTo(smtpConfig, mailOptions, 'text', `签到失败，要修bug了~~~`);
    if (today_status.data)
        return emailTo(smtpConfig, mailOptions, 'text', `今日已经签到！`);
    let {
        data
    } = await axios({
        url: baseUrl + apiUrl.checkIn,
        method: 'post',
        headers: {
            Cookie: cookie
        }
    });
    if (data?.err_msg === '您今日已完成签到，请勿重复签到') {
        return console.log('您今日已完成签到，请勿重复签到');
    } else {
        const template = await ejsComplier('/src/template/success.ejs', {
            userName: userName,
            date: dayjs(new Date()).locale('zh-cn').format('YYYY年MM月DD日 HH:mm:ss'),
        });
        return emailTo(smtpConfig, mailOptions, 'html', template);
    }
};

/**
 * 签到定时任务方法
 * @param {*} config 
 */
function scheduleCronstyle(config) {
    schedule.scheduleJob('0 30 1 * * *', () => { //每天1：30自动签到
        check_in(config);
    });
};


scheduleCronstyle(config);