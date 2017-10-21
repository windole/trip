import Vue from 'vue';
import Router from 'vue-router';
import Search from 'components/search/search';
import Fight from 'components/fight/fight';
import Reserve from 'components/reserve/reserve';
import Order from 'components/order/order';
import FightSearch from 'components/fightSearch/fightSearch';
import AddPg from 'components/addPg/addPg';
import ToAdd from 'components/toAdd/toAdd';
import ToEd from 'components/toEd/toEd';
import OrderList from 'components/order-list/order-list';
import OrderDetail from 'components/order-detail/order-detail';

Vue.use(Router);

export default new Router({
    base: '/appshop',
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
        },
        {
            path: '/addPg',
            component: AddPg,
            children: [
                {
                    path: 'toAdd',
                    component: ToAdd
                },
                {
                    path: 'toEd',
                    component: ToEd
                }
            ]
        },
        {
            path: '/order-list',
            component: OrderList,
            children: [
                {
                    path: ':orderNo',
                    component: OrderDetail
                }
            ]
        }

    ],
    mode: 'history'
});
