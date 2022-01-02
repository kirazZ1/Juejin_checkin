/*
 * @Author: KiraZz1
 * @Date: 2022-01-02 13:23:13
 * @LastEditTime: 2022-01-02 14:09:54
 * @LastEditors: KiraZz1
 * @Description: 掘金签到脚本-html邮件ejs模板引擎解析
 * @FilePath: \juejin\src\utils\ejs_complier.js
 */
import ejs from 'ejs'

import fs from 'fs'

import path from 'path'

export const ejsComplier = (htmlPath,props) =>{
    return new Promise((resolve,reject) => {
        try {
            let template = null;
            fs.readFile(path.resolve()+htmlPath,'utf8',(error,data)=>{
                template = ejs.render(data, props)
                resolve(template) 
            })
        }catch(e) {
            reject(e);
        }
    })
}