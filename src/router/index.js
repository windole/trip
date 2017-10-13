import Vue from 'vue';
import Router from 'vue-router';
import Search from 'components/search/search';
import Fight from 'components/fight/fight';
import Reserve from 'components/reserve/reserve';
import Order from 'components/order/order';
import FightSearch from 'components/fightSearch/fightSearch';

Vue.use(Router);

export default new Router({
    base: __dirname,
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
            path: '/fight-search',
            component: FightSearch
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
    mode: 'history'
});
