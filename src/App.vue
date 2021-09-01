<template>
  <v-app>
    <v-main>
      <!-- <ApolloExample/> -->
      <chatInput/>
    </v-main>
  </v-app>
</template>

<script>
// import ApolloExample from './components/ApolloExample.vue';
import ChatInput from './components/ChatInput.vue';

export default {
  name: 'App',

  components: {
    // ApolloExample,
    ChatInput,
  },

  data: () => ({
    //
  }),
};
</script>
