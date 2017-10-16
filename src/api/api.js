import axios from 'axios';

export function getCityList() {
    const url = 'static/aircity.json';

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data);
    });
};

export function getAirLines() {
    const url = 'static/airlines.json';

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data);
    });
};

export function getUserInfoLines() {
    const url = 'static/pg.json';

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data);
    });
};

