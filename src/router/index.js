import Vue from 'vue';
import Router from 'vue-router';
import Search from 'components/search/search';
import Fight from 'components/fight/fight';
import Reserve from 'components/reserve/reserve';
import Order from 'components/order/order';
import FightSearch from 'components/fightSearch/fightSearch';
import TrainSearch from 'components/trainSearch/trainSearch';
import AddPg from 'components/addPg/addPg';
import ToAdd from 'components/toAdd/toAdd';
import ToEd from 'components/toEd/toEd';
import OrderList from 'components/order-list/order-list';
import OrderDetail from 'components/order-detail/order-detail';

Vue.use(Router);

const router = new Router({
    base: '/appshop',
    routes: [
        {
            path: '/',
            redirect: '/search/fightSearch'
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: 'fightSearch',
                    component: FightSearch,
                    meta: {title: '福优航班查询'}
                },
                {
                    path: 'trainSearch',
                    component: TrainSearch,
                    meta: {title: '福优火车票查询'}
                }
            ]
        },
        {
            path: '/fight',
            component: Fight,
            meta: {title: '航班查询'}
        },
        {
            path: '/reserve',
            component: Reserve,
            meta: {title: '预定'}
        },
        {
            path: '/order',
            component: Order,
            meta: {title: '订单填写'}
        },
        {
            path: '/addPg',
            component: AddPg,
            children: [
                {
                    path: 'toAdd',
                    component: ToAdd,
                    meta: {title: '新增联系人'}
                },
                {
                    path: 'toEd',
                    component: ToEd,
                    meta: {title: '修改联系人'}
                }
            ]
        },
        {
            path: '/order-list',
            component: OrderList,
            meta: {title: '订单列表'},
            children: [
                {
                    path: ':orderNo',
                    component: OrderDetail,
                    meta: {title: '订单详情'}
                }
            ]
        }

    ],
    mode: 'history'
});

router.afterEach(route => {
    // 从路由的元信息中获取 title 属性
    if (route.meta.title) {
        document.title = route.meta.title;
        // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
        if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            const hackIframe = document.createElement('iframe');
            hackIframe.style.display = 'none';
            hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
            document.body.appendChild(hackIframe);
            setTimeout(_ => {
                document.body.removeChild(hackIframe);
            }, 300);
        }
    }
});

export default router;
