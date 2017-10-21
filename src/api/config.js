// 所有请求都要提供的参数
export const commonParams = {
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    format: 'jsonp'
};

// jsonp这个库必须要配置一个param为jsonp名的属性，暂定为是jsonpCallback
export const options = {
    param: 'jsonpCallback'
};

export const ERR_OK = '0000';

export const idTypeArr = ['身份证'];

export const isSelfArr = ['否', '是'];
