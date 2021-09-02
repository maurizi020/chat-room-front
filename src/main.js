import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import App from './App.vue';
import apolloClient from './vue-apollo';
import vuetify from './plugins/vuetify';
import router from './router/router';

Vue.use(VueRouter);
Vue.config.productionTip = false;
// Install the vue plugin
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  apolloProvider,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
