/*
 * @Author: KiraZz1
 * @Date: 2022-01-01 11:28:57
 * @LastEditTime: 2022-01-03 09:41:55
 * @LastEditors: KiraZz1
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

    //根据邮件类型走不同分支
    if (type === 'text') {
        newMailOptions.text = contain;
    } else if (type === 'html') {
        newMailOptions.html = contain;
    } else {
        return console.error("[ERROR]:传入数据格式错误")
    }
    //发送邮件
    transporter.sendMail(newMailOptions, (error, info) => {     
        if (error) return console.log(`[ERROR]:${error}`);
        console.log(`[SUCCESS]:Message: ${info.messageId},sent: ${info.response}`);
    });
}
