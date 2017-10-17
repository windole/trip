export const departure = state => state.departure;

export const toCity = state => state.toCity;

export const toFrom = state => state.toFrom;

export const departureData = state => state.departureData;

export const airlines = state => state.airlines;

export const aliline = state => state.aliline;

export const airseat = state => state.airseat;

export const currentSong = (state) => {
    return state.playList[state.currentPlayingIndex] || {};
};
