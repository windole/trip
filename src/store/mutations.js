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
    [types.SET_AIRLINE](state, airline) {
        state.airline = airline;
    },
    [types.SET_AIRSEAT](state, airseat) {
        state.airseat = airseat;
    }
};

export default mutations;
