import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// eslint-disable-next-line
import Customhub from '../dist/customhub/dist/index.full';
// eslint-disable-next-line
import '../dist/customhub/theme-chalk/index.css';

// eslint-disable-next-line
import App from './src/App.vue';

console.log(Customhub);

Vue.use(ElementUI);
Vue.use(Customhub);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
