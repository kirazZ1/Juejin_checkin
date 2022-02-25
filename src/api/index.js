import { request } from "../utils/http.js";

import { config } from '../config/config.js';

const { apiUrl } = config;

export const getLotteryStatus = () => request(apiUrl.getLotteryConfig, 'GET')

export const getTodayStatus = () => request(apiUrl.getTodayStatus, 'GET')

export const drawLottery = () => request(apiUrl.drawLottery, 'POST')

export const checkIn = () => request(apiUrl.checkIn, 'POST')