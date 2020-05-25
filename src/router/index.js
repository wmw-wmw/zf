import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/select'
  },
  // 密码登录
  {
    name: 'login',
    path: '/login',
    component: () => import('components/login/')
  },
  // 验证码登录
  {
    name: 'phone',
    path: '/login/phone',
    component: () => import('components/login/loginPhone')
  },
  // 忘记密码
  {
    name: 'forget',
    path: '/login/forget',
    component: () => import('components/login/forget')
  },
  {
    name: 'select',
    path: '/select',
    component: () => import('components/home/select')
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('components/home/home')
  },
  // 用户
  {
    name: 'user',
    path: '/user',
    component: () => import('components/my')
  },
  // 咨询记录
  {
    name: 'record',
    path: '/record',
    component: () => import('components/my/record')
  },
  // 举报
  {
    name: 'report',
    path: '/report',
    component: () => import('components/my/report')
  }
];

const router = new VueRouter({
  routes
});

export default router;
