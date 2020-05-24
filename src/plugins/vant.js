import Vue from 'vue';
import { Toast, Checkbox, Picker, Popup, Tag, Button, Overlay, Empty } from 'vant';

Vue.use(Toast);
Vue.use(Checkbox);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Tag);
Vue.use(Button);
Vue.use(Overlay);
Vue.use(Empty);

// 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法
// Vue.prototype.$toast = Toast;
