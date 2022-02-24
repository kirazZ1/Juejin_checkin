/*
 * @Author: KiraZz1
 * @Date: 2022-01-01 10:59:47
 * @LastEditTime: 2022-01-04 15:53:20
 * @LastEditors: Please set LastEditors
 * @Description: 掘金签到脚本-主文件
 * @FilePath:juejin\src\index.js
 */

import { config } from './config/config.js';

import schedule from 'node-schedule';

import dayjs from 'dayjs';

import { emailTo } from './utils/email.js'

import { ejsComplier } from './utils/ejs_complier.js'

import { getLotteryStatus, getFreeLottery, getTodayStatus, checkIn, drawLottery } from './api/index.js'

const { userName, mail: { smtp, mailFrom, mailTo, mailPwd } } = config;



/**从config.js中读取smtp配置 */
const smtpConfig = {
    host: smtp,
    port: 465,
    auth: {
        user: mailFrom,
        pass: mailPwd
    }
};

/**从config.js中读取发送方，接收方，标题昵称 */
const mailOptions = {
    from: mailFrom, // 发送者
    to: mailTo, // 接受者,可以同时发送多个,以逗号隔开
    subject: `${userName}的掘金自动签到小助手`, // 标题
};


/**
 * 每日免费抽奖逻辑
 * @param {*} config 
 * @returns lottery_name
 */
const freeLottery = async (config) => {
    try {
        const { data: lotteryStatus } = await getLotteryStatus();
        const { data: { free_count }, err_no } = lotteryStatus;
        if (err_no !== 0) return console.log('[ERROR]:免费抽奖失败！');
        if (free_count !== 1) {
            return console.log("[WARNING]:无免费抽奖次数！");
        } else {
            const freeLottery = await drawLottery();
            const { data: { err_no, data: { lottery_name, lottery_type } } } = freeLottery
            if (err_no !== 0) return console.log('[ERROR]:免费抽奖失败！');
            console.log(`[SUCCESS]:今天免费抽奖抽到了${lottery_name}${lottery_type === 2 ? ',真辣鸡' : ''}`);
            return lottery_name;
        }
    } catch (e) {
        console.log(`[ERROR]:${e}`)
    }
}


/**
 * 签到逻辑check_in
 * @param {*} config 
 * @returns 
 */
const check_in = async (config) => {
    try {
        const { data: today_status } = await getTodayStatus(); //获取当天签到状态，若已签到不做操作，若未签到则进行签到
        if (today_status.err_no !== 0)
            return emailTo(smtpConfig, mailOptions, 'text', `签到失败，要修bug了~~~`);
        if (today_status.data)
            return emailTo(smtpConfig, mailOptions, 'text', `今日已经签到！`);
        let check_in = await checkIn();
        let giftName = await freeLottery(config);
        const template = await ejsComplier('/src/template/success.ejs', {
            userName: userName,
            date: dayjs(new Date()).locale('zh-cn').format('YYYY年MM月DD日 HH:mm:ss'),
            giftName: giftName
        });
        return emailTo(smtpConfig, mailOptions, 'html', template);
    } catch (err) {
        console.log(`[ERROR]:${err}`);
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