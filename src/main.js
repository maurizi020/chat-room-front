import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App.vue'
import apolloClient from './vue-apollo'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
// Install the vue plugin
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
