/*
 * @Author: KiraZz1
 * @Date: 2022-01-01 11:13:12
 * @LastEditTime: 2022-01-02 12:56:03
 * @LastEditors: Please set LastEditors
 * @Description: 掘金签到脚本-配置文件
 * @FilePath: juejin\src\config.js
 */
export const config = {
    "userName":"Kira",  //用户名（根据自己的昵称填写）
    "baseUrl": "https://api.juejin.cn",
    "apiUrl": {
        "getTodayStatus": "/growth_api/v1/get_today_status",
        "checkIn": "/growth_api/v1/check_in",
        "getLotteryConfig": "/growth_api/v1/lottery_config/get",
        "drawLottery": "/growth_api/v1/lottery/draw"
    },
    //掘金的cookie（可以在控制台的网络查看请求报文头部，里面有cookie）
    "cookie": "xxx",
    "mail":{
        "smtp":"smtp.qq.com",           //SMTP服务器
        "mailFrom":"xxx@qq.com", //发送者邮箱
        "mailTo":"xxx@qq.com",   //发送到xx邮箱
        "mailPwd":"xxx"    //SMTP授权码
    }
}

