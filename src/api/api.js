import axios from 'axios';
const url = 'http://localhost:12006/Handler/AirTicketsProjectHandler.ashx';

export function getCityList() {
    var params = new URLSearchParams();
    params.append('action', 'GetFligthStation');
    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

export function getAirLines(from, to, date) {
    var params = new URLSearchParams();
    params.append('action', 'GetAirFligth');
    params.append('from', from);
    params.append('to', to);
    params.append('date', date);
    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

// 支付接口
export function airTicketsFligthPay(seatCode, passagers, contactName, contactTel, departureDate, departure, destination, companyCode, flightNo, amount, serviceFee, tradePassword) {
    var params = new URLSearchParams();
    params.append('action', 'AirTicketsFligthPay');
    params.append('seatCode', seatCode);
    params.append('passagers', passagers);
    params.append('contactName', contactName);
    params.append('contactTel', contactTel);
    params.append('departureDate', departureDate);
    params.append('departure', departure);
    params.append('destination', destination);
    params.append('companyCode', companyCode);
    params.append('flightNo', flightNo);
    params.append('amount', amount);
    params.append('serviceFee', serviceFee);
    params.append('tradePassword', tradePassword);

    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

// 服务费接口
export function getAirTicketFee() {
    var params = new URLSearchParams();
    params.append('action', 'GetAirTicketFee');

    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

// 查询用户信息列表
export function getUserInfoLines() {
    var params = new URLSearchParams();
    params.append('action', 'GetUserInformation');

    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

// 用户信息修改接口
export function updateUserInfo(passagerType, isSelf, name, idType, idNo, phone, nationality, type) {
    var params = new URLSearchParams();
    params.append('action', 'AirTicketAddOrUpdateUserInformation');
    params.append('passagerType', passagerType);
    params.append('isSelf', isSelf);
    params.append('name', name);
    params.append('idType', idType);
    params.append('idNo', idNo);
    params.append('phone', phone);
    params.append('nationality', nationality);
    params.append('type', type);
    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

// 订单列表查询
export function getOrderList(endTime) {
    var params = new URLSearchParams();
    params.append('action', 'GetAirTicketOrderList');
    params.append('startTime', '2017-10-01 00:00:00');
    params.append('endTime', endTime);
    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

// 飞机票订单详情查询接口
export function getAirTicketDetail(orderNoFlx) {
    var params = new URLSearchParams();
    params.append('action', 'GetAirTicketDetail');
    params.append('orderNoFlx', orderNoFlx);
    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

// 退票接口
export function airRefundTicket(orderNo, tradeNo, returnType, orderNos) {
    var params = new URLSearchParams();
    params.append('action', 'AirRefundTicket');
    params.append('orderNo', orderNo);
    params.append('tradeNo', tradeNo);
    params.append('returnType', returnType);
    params.append('orderNos', orderNos);
    return axios.post(url, params).then((res) => {
        return Promise.resolve(res.data);
    });
};

