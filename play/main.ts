import Vue from 'vue';

// eslint-disable-next-line
import LineSwitch from '../dist/linehub/dist/index.full';
// eslint-disable-next-line
import '../dist/linehub/theme-chalk/index.css';

// eslint-disable-next-line
import App from './src/App.vue';

console.log(LineSwitch);

Vue.use(LineSwitch);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
