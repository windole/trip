import 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';
import 'vue-ydui/dist/ydui.base.css';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import { Confirm, Alert, Toast, Loading } from 'vue-ydui/dist/lib.px/dialog';

import './common/stylus/index.styl';

Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    loading: Loading
};

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
