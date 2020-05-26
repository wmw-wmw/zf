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
  },
  // 绑定微信
  {
    name: 'bindWechat',
    path: '/bindWechat',
    component: () => import('components/my/bindWechat')
  },
  // 设置
  {
    name: 'setUp',
    path: '/setUp',
    component: () => import('components/my/setUp')
  },
  // 申请成为租赁顾问
  {
    name: 'applyAdviser',
    path: '/applyAdviser',
    component: () => import('components/my/apply/applyAdviser')
  },
  // 申请租赁顾问手机验证
  {
    name: 'phoneText',
    path: '/phoneText',
    component: () => import('components/my/apply/phoneText')
  },
  // 申请租赁顾问完成
  {
    name: 'applyAdviserFinish',
    path: '/applyAdviserFinish',
    component: () => import('components/my/apply/applyAdviserFinish')
  }
];

const router = new VueRouter({
  routes
});

export default router;
