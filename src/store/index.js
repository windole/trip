import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
// 在控制台下打印日志
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// 开启调试模式，在开发环境下使用
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    // 不能直接修改state，否则报错
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
