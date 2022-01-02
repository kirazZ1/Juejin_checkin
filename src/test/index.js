/*
 * @Author: KiraZz1
 * @Date: 2022-01-02 13:08:51
 * @LastEditTime: 2022-01-02 14:11:09
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

import { ejsComplier} from '../utils/ejs_complier.js'

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


testEmailSendHtml()