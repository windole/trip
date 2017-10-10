import Vue from 'vue';
import Router from 'vue-router';
import Search from 'components/search/search';
import Fight from 'components/fight/fight';
import Reserve from 'components/reserve/reserve';
import Order from 'components/order/order';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/search'
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/fight',
            component: Fight
        },
        {
            path: '/reserve',
            component: Reserve
        },
        {
            path: '/order',
            component: Order
        }
    ],
    mode: 'history',
    linkActiveClass: 'selected'
});
