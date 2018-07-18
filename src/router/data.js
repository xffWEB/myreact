import Manger from '../components/count/Manger';
import { LoadAsyncCom, Loading } from '../tool/LoadAsyncCom';
export let data = [{
    path: '/box',
    title: 'app',
    component: LoadAsyncCom(() =>
        import ('../components/count/Box'), Loading),
    children: [{
        path: '/home',
        component: LoadAsyncCom(() =>
            import ('../components/count/Home'), Loading),
        title: '首页'
    }, {
        path: '/detail',
        component: LoadAsyncCom(() =>
            import ('../components/count/Detail'), Loading),
        title: '详情'
    }, {
        path: '/submit',
        component: LoadAsyncCom(() =>
            import ('../components/count/Submit'), Loading),
        title: '提交'
    }, {
        path: '/computed',
        component: LoadAsyncCom(() =>
            import ('../components/count/Computed'), Loading),
        title: '结算'
    }]
}, {
    path: '/manger',
    component: LoadAsyncCom(() =>
        import ('../components/count/Computed'), Manger),
    title: '详情'
}]