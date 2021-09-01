<template>
  <v-app>
    <v-main>
      <Login/>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login.vue';
import ChatInput from './components/ChatInput.vue';

export default {
  name: 'App',

  components: {
    // ApolloExample,
    // ChatInput,
    Login,
  },

  data: () => ({
    //
  }),
};
</script>
