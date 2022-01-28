import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// eslint-disable-next-line
import LineHub from '../dist/linehub/dist/index.full';
// eslint-disable-next-line
import '../dist/linehub/theme-chalk/index.css';

// eslint-disable-next-line
import App from './src/App.vue';

console.log(LineHub);

Vue.use(ElementUI);
Vue.use(LineHub);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
