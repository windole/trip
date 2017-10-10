import originalJsonp from 'jsonp';

export default function jsonp(url, data, options) {
    url += parseData(data);
    return new Promise((resolve, reject) => {
        originalJsonp(url, options, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};

function parseData(obj) {
    const keys = Object.keys(obj);
    const len = keys.length;
    let returnStr = '?';
    for (let i = 0; i < len; i++) {
        const key = keys[i];
        const value = obj[key];
        returnStr += `&${key}=${value}`;
    }
    returnStr = returnStr.replace('?&', '?');
    return returnStr;
}
