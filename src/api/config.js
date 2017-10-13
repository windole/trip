// 所有请求都要提供的参数
export const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
};

// jsonp这个库必须要配置一个param为jsonp名的属性，根据qq音乐的来就是jsonpCallback
export const options = {
    param: 'jsonpCallback'
};

export const ERR_OK = '0000';
