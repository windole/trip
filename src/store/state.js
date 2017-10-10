import {playMode} from 'common/js/config';
const state = {
    singer: {},
    // 音乐是否正在播放
    playing: false,
    // 音乐播放器全屏
    fullScreen: false,
    // 播放列表
    playList: [],
    // 顺序列表
    sequenceList: [],
    // 播放模式
    mode: playMode.sequence,
    // 当前播放音乐的索引，根据playList[currentPlayingIndex]得到当前音乐
    currentPlayingIndex: -1
};

export default state;
