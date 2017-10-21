import * as types from './mutation-type';

const mutations = {
    [types.SET_DEPARTURE](state, departure) {
        state.departure = departure;
    },
    [types.SET_TO_CITY](state, toCity) {
        state.toCity = toCity;
    },
    [types.SET_FROM_CITY](state, fromCity) {
        state.fromCity = fromCity;
    },
    [types.SET_DEPARTURE_DATA](state, departureData) {
        state.departureData = departureData;
    },
    [types.SET_AIRLINE](state, airline) {
        state.airline = airline;
    },
    [types.SET_AIRSEAT](state, airseat) {
        state.airseat = airseat;
    },
    [types.SET_UPDATE_USER_INFO](state, info) {
        state.updateUserInfo = info;
    }
};

export default mutations;
