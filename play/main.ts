import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// eslint-disable-next-line
import CustomHub from 'customhub';
// eslint-disable-next-line
import 'customhub/theme-chalk/index.css';

// eslint-disable-next-line
import App from './src/App.vue';

console.log(CustomHub);

Vue.use(ElementUI);
Vue.use(CustomHub);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
