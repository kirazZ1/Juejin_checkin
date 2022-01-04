/*
 * @Author: KiraZz1
 * @Date: 2022-01-02 13:23:13
 * @LastEditTime: 2022-01-03 09:44:45
 * @LastEditors: Please set LastEditors
 * @Description: 掘金签到脚本-html邮件ejs模板引擎解析
 * @FilePath: \juejin\src\utils\ejs_complier.js
 */
import ejs from 'ejs'

import fs from 'fs'

import path from 'path'

/**
 * ejs模板解析
 * @param {*} htmlPath 
 * @param {*} props 
 * @returns 
 */
export const ejsComplier = (htmlPath,props) =>{
    return new Promise((resolve,reject) => {
        try {
            let template = null;
            fs.readFile(path.resolve()+htmlPath,'utf8',(error,data)=>{
                template = ejs.render(data, props);
                resolve(template);
            })
        }catch(e) {
            reject(e);
        }
    })
}