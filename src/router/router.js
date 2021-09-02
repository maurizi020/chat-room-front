import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import ChatInput from '../components/ChatInput.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/chat',
    name: 'ChatInput',
    component: ChatInput,
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
