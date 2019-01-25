import Vue from 'vue';
import PortalVue from 'portal-vue';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(PortalVue);
Vue.use(VueLazyload);

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // Output flag for static rendering
    document.dispatchEvent(new Event('render-event'));
  },
}).$mount('#app');
