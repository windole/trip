import axios from 'axios';

export function getCityList() {
    const url = 'static/aircity.json';

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data);
    });
};