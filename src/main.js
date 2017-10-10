import 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';

import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import './common/stylus/index.styl';

Vue.config.productionTip = false;
// fastclick推荐用法
fastclick.attach(document.body);

// 记载Vue-Lazyload
Vue.use(VueLazyLoad, {
    loading: require('common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
