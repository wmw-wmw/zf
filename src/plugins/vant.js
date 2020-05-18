import Vue from 'vue';
import { Toast, Checkbox } from 'vant';

Vue.use(Toast);
Vue.use(Checkbox);

// 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法
// Vue.prototype.$toast = Toast;
