# Juejin_checkin

掘金自动签到脚本（每日自动签到以及免费抽奖）

该脚本基于axios请求掘金签到/抽奖API，使用node-schedule进行定时任务设置

cookies可能会过期，在收到签到失败邮件后，可以先尝试更换新的cookies

## 环境配置

使用时需要云服务器配置好git和node环境

git环境配置：<https://blog.csdn.net/xwj1992930/article/details/96428998>

node环境配置：<https://www.cnblogs.com/kingsonfu/p/14963663.html>

配置完node环境后全局安装pm2:

```bash
npm install pm2 global
```

## 拉取项目

```bash
git clone https://github.com/kirazZ1/Juejin_checkin.git
```

## 修改src中的config/config.js

```json
{
    "userName":"昵称（自定义）",
    "baseUrl": "https://api.juejin.cn",       //不要修改
    "apiUrl": {                               //不要修改
        "getTodayStatus": "/growth_api/v1/get_today_status",
        "checkIn": "/growth_api/v1/check_in",
        "getLotteryConfig": "/growth_api/v1/lottery_config/get",
        "drawLottery": "/growth_api/v1/lottery/draw"
    },
    "cookie":"xxx",                                 //登录掘金时打开控制台，可以看请求中的cookie字段，复制粘贴过来
    "mail":{
        "smtp":"smtp.qq.com",           //SMTP服务器（这里是QQ邮箱的，可以换成别的）
        "mailFrom":"xxx@qq.com", //发送者邮箱
        "mailTo":"xxx@qq.com",   //发送到xx邮箱
        "mailPwd":"xxxx"    //SMTP授权码
    }
}
```

## 启动项目

进入项目目录，执行：

```bash
npm i

npm run dev
```
