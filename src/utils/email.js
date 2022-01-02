/*
 * @Author: your name
 * @Date: 2022-01-01 11:28:57
 * @LastEditTime: 2022-01-02 12:58:35
 * @LastEditors: Please set LastEditors
 * @Description: 掘金签到脚本-邮件发送
 * @FilePath: \juejin\src\email.js
 */
import nodemailer from 'nodemailer'

export const emailTo = (smtpConfig, mailOptions, type = 'text', contain) => {
    //设置邮箱配置
    let transporter = nodemailer.createTransport(smtpConfig);

    //设置收件人信息
    let newMailOptions = {
        ...mailOptions
    };
    if (type === 'text') {
        newMailOptions.text = contain
    } else if (type === 'html') {
        newMailOptions.html = contain
    } else {
        return
    }

    //发送邮件
    transporter.sendMail(newMailOptions, (error, info) => {     //本地测试用的输出，实际没啥卵用
        if (error)
            return console.log(error);
        console.log(`Message: ${info.messageId}`);
        console.log(`sent: ${info.response}`);
    });
}
