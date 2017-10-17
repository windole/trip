import * as types from './mutation-type';

const mutations = {
    [types.SET_DEPARTURE](state, departure) {
        state.departure = departure;
    },
    [types.SET_TO_CITY](state, toCity) {
        state.toCity = toCity;
    },
    [types.SET_FROM_CITY](state, toFrom) {
        state.toFrom = toFrom;
    },
    [types.SET_DEPARTURE_DATA](state, departureData) {
        state.departureData = departureData;
    },
    [types.SET_AIRLINES](state, airlines) {
        state.airlines = airlines;
    },
    [types.SET_AIRLINE](state, aliline) {
        state.aliline = aliline;
    },
    [types.SET_AIRSEAT](state, airseat) {
        state.airseat = airseat;
    }
};

export default mutations;
